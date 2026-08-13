#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cv = JSON.parse(fs.readFileSync(path.join(root, 'src/data/cv.json'), 'utf8'));
const lucideIcons = new Set([
    'BarChart3', 'Cloud', 'Code2', 'Database', 'FileText', 'GitBranch',
    'Globe', 'Layers', 'LayoutDashboard', 'Rocket', 'Server', 'Settings',
    'Smartphone', 'TestTube', 'Users', 'Workflow',
]);
const svgIds = new Set(['typescript']);
const errors = [];

const required = (value, label) => {
    if (typeof value !== 'string' || !value.trim()) errors.push(`${label} must be a non-empty string.`);
};
const httpsUrl = (value, label) => {
    try {
        if (new URL(value).protocol !== 'https:') throw new Error();
    } catch {
        errors.push(`${label} must be an HTTPS URL.`);
    }
};

required(cv.profile?.name, 'profile.name');
required(cv.profile?.title, 'profile.title');
for (const [key, value] of Object.entries(cv.profile?.contact ?? {})) required(value, `profile.contact.${key}`);
required(cv.professionalSummary, 'professionalSummary');

for (const [groupIndex, group] of (cv.skillGroups ?? []).entries()) {
    required(group.title, `skillGroups[${groupIndex}].title`);
    if (!Array.isArray(group.skills) || !group.skills.length) errors.push(`skillGroups[${groupIndex}] must have skills.`);
    for (const [skillIndex, skill] of (group.skills ?? []).entries()) {
        const label = `skillGroups[${groupIndex}].skills[${skillIndex}]`;
        required(skill.title, `${label}.title`);
        required(skill.ats, `${label}.ats`);
        if (skill.url) httpsUrl(skill.url, `${label}.url`);
        if (skill.icon?.type === 'lucide' && !lucideIcons.has(skill.icon.name)) errors.push(`${label} has unknown Lucide icon "${skill.icon?.name}".`);
        if (skill.icon?.type === 'svg' && !svgIds.has(skill.icon.id)) errors.push(`${label} has unknown SVG icon "${skill.icon?.id}".`);
        if (!['lucide', 'svg'].includes(skill.icon?.type)) errors.push(`${label} needs a supported icon.`);
    }
}

for (const [index, experience] of (cv.experiences ?? []).entries()) {
    const label = `experiences[${index}]`;
    for (const key of ['company', 'role', 'date']) required(experience[key], `${label}.${key}`);
    if (!Array.isArray(experience.bullets) || !experience.bullets.length) errors.push(`${label}.bullets must not be empty.`);
}
for (const [index, certification] of (cv.certifications ?? []).entries()) {
    const label = `certifications[${index}]`;
    required(certification.title, `${label}.title`);
    required(certification.issuedBy, `${label}.issuedBy`);
    httpsUrl(certification.url, `${label}.url`);
    httpsUrl(certification.badgeImage, `${label}.badgeImage`);
}

if (errors.length) {
    console.error(`CV data validation failed:\n- ${errors.join('\n- ')}`);
    process.exit(1);
}
console.log(`CV data validation passed (${cv.skillGroups.length} skill groups, ${cv.experiences.length} roles, ${cv.certifications.length} certifications).`);
