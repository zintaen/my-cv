/**
 * cv.ts — thin loader around `cv.json`.
 *
 * Content lives in `cv.json` (edit that file to add/remove/change items).
 * This file's only job is to:
 *   1. Resolve string-based icon references (SVG ids + lucide names) into
 *      the concrete React components the UI renders.
 *   2. Resolve the bundled avatar image URL.
 *   3. Expose the same typed `cvData` shape the rest of the app already uses,
 *      so `src/components/*` doesn't need to change.
 *
 * ATS design notes
 * ────────────────
 * • Every skill has an `ats` field: one clean plain-text label that ATS parsers
 *   will extract (combining title + subtitle into a single non-fragmented string).
 * • Certifications carry both a visual badge URL and a plain `issuedBy` string
 *   so ATS always sees the issuer even if remote images fail.
 * • Experience bullets are plain strings — the UI wraps them in real <li> so
 *   extractors see a proper list, not decorative absolutely-positioned spans.
 */

import type { FunctionComponent, SVGProps } from 'react';
import type * as LucideIcons from 'lucide-react';

import angularIcon from './icons/angular.svg?react';
import anthropicIcon from './icons/anthropic.svg?react';
import argoIcon from './icons/argo.svg?react';
import awsIcon from './icons/aws.svg?react';
import dockerIcon from './icons/docker.svg?react';
import elasticsearchIcon from './icons/elasticsearch.svg?react';
import gcpIcon from './icons/googlecloud.svg?react';
import graphqlIcon from './icons/graphql.svg?react';
import istioIcon from './icons/istio.svg?react';
import kubernetesIcon from './icons/kubernetes.svg?react';
import langchainIcon from './icons/langchain.svg?react';
import nextjsIcon from './icons/nextdotjs.svg?react';
import nodejsIcon from './icons/nodedotjs.svg?react';
import nvidiaIcon from './icons/nvidia.svg?react';
import openaiIcon from './icons/openai.svg?react';
import pineconeIcon from './icons/pinecone.svg?react';
import postgresqlIcon from './icons/postgresql.svg?react';
import pythonIcon from './icons/python.svg?react';
import pytorchIcon from './icons/pytorch.svg?react';
import reactIcon from './icons/react.svg?react';
import reduxIcon from './icons/redux.svg?react';
import rustIcon from './icons/rust.svg?react';
import typescriptIcon from './icons/typescript.svg?react';
import webpackIcon from './icons/webpack.svg?react';

import avatarImg from './my-pic.jpg';
import rawCv from './cv.json';

// ────────────────────────────────────────────────────────────────────────────
// Public types (unchanged — consumers in src/components/* depend on these)
// ────────────────────────────────────────────────────────────────────────────

type SvgIconComponent = FunctionComponent<SVGProps<SVGSVGElement>>;

export type AppIcon =
    | { type: 'lucide'; name: keyof typeof LucideIcons }
    | { type: 'svg'; component: SvgIconComponent };

export interface Skill {
    /** Primary label shown on the card. */
    title: string;
    /** Optional small-print subtitle under the title. */
    subtitle?: string;
    /** Plain-text ATS-friendly label (merges title + subtitle into a single clean phrase). */
    ats: string;
    icon: AppIcon;
    url?: string;
}

export interface SkillGroup {
    title: string;
    skills: Skill[];
}

export interface Experience {
    role: string;
    company: string;
    date: string;
    location?: string;
    bullets: string[];
}

export interface Academic {
    institution: string;
    program: string;
    degree: string;
    iconText?: string;
    iconImage?: string;
}

export interface Certification {
    title: string;
    issuedBy: string;
    url: string;
    badgeImage: string;
}

export interface ProfileData {
    name: string;
    title: string;
    contact: {
        email: string;
        phone: string;
        linkedin: string;
        github: string;
    };
    avatarUrl: string;
}

export interface CVData {
    profile: ProfileData;
    professionalSummary: string;
    skillGroups: SkillGroup[];
    experiences: Experience[];
    academic: Academic;
    certifications: Certification[];
}

// ────────────────────────────────────────────────────────────────────────────
// Icon registry — maps JSON string ids to the bundled React SVG components.
// To add a new SVG icon: drop the file in `src/data/icons/`, import it above,
// and add an entry here. Then reference it from cv.json as { type: "svg", id }.
// ────────────────────────────────────────────────────────────────────────────

const SVG_REGISTRY: Record<string, SvgIconComponent> = {
    angular: angularIcon,
    anthropic: anthropicIcon,
    argo: argoIcon,
    aws: awsIcon,
    docker: dockerIcon,
    elasticsearch: elasticsearchIcon,
    googlecloud: gcpIcon,
    graphql: graphqlIcon,
    istio: istioIcon,
    kubernetes: kubernetesIcon,
    langchain: langchainIcon,
    nextdotjs: nextjsIcon,
    nodedotjs: nodejsIcon,
    nvidia: nvidiaIcon,
    openai: openaiIcon,
    pinecone: pineconeIcon,
    postgresql: postgresqlIcon,
    python: pythonIcon,
    pytorch: pytorchIcon,
    react: reactIcon,
    redux: reduxIcon,
    rust: rustIcon,
    typescript: typescriptIcon,
    webpack: webpackIcon,
};

// ────────────────────────────────────────────────────────────────────────────
// Raw (JSON) shapes — what the bundler-imported cv.json actually contains.
// These are intentionally loose; the resolve* functions below hydrate them
// into the strict public types above.
// ────────────────────────────────────────────────────────────────────────────

interface RawLucideIcon {
    type: 'lucide';
    name: string;
}

interface RawSvgIcon {
    type: 'svg';
    id: string;
}

type RawIcon = RawLucideIcon | RawSvgIcon;

interface RawSkill {
    title: string;
    subtitle?: string;
    ats: string;
    icon: RawIcon;
    url?: string;
}

interface RawSkillGroup {
    title: string;
    skills: RawSkill[];
}

interface RawProfile {
    name: string;
    title: string;
    contact: ProfileData['contact'];
    avatar: string;
}

interface RawCV {
    profile: RawProfile;
    professionalSummary: string;
    skillGroups: RawSkillGroup[];
    experiences: Experience[];
    academic: Academic;
    certifications: Certification[];
}

// ────────────────────────────────────────────────────────────────────────────
// Resolvers — hydrate raw JSON into the typed runtime structure.
// ────────────────────────────────────────────────────────────────────────────

function resolveIcon(raw: RawIcon): AppIcon {
    if (raw.type === 'svg') {
        const component = SVG_REGISTRY[raw.id];
        if (!component) {
            throw new Error(
                `[cv.ts] Unknown SVG icon id "${raw.id}". ` +
                    `Add it to SVG_REGISTRY in src/data/cv.ts or fix the id in cv.json.`,
            );
        }
        return { type: 'svg', component };
    }
    return { type: 'lucide', name: raw.name as keyof typeof LucideIcons };
}

function resolveSkill(raw: RawSkill): Skill {
    return {
        title: raw.title,
        subtitle: raw.subtitle,
        ats: raw.ats,
        icon: resolveIcon(raw.icon),
        url: raw.url,
    };
}

function resolveSkillGroup(raw: RawSkillGroup): SkillGroup {
    return {
        title: raw.title,
        skills: raw.skills.map(resolveSkill),
    };
}

function resolveProfile(raw: RawProfile): ProfileData {
    return {
        name: raw.name,
        title: raw.title,
        contact: raw.contact,
        // `raw.avatar` is just a filename hint in JSON; the real URL comes from
        // the bundler importing the image module above.
        avatarUrl: avatarImg,
    };
}

// ────────────────────────────────────────────────────────────────────────────
// Public export
// ────────────────────────────────────────────────────────────────────────────

const raw = rawCv as unknown as RawCV;

export const cvData: CVData = {
    profile: resolveProfile(raw.profile),
    professionalSummary: raw.professionalSummary,
    skillGroups: raw.skillGroups.map(resolveSkillGroup),
    experiences: raw.experiences,
    academic: raw.academic,
    certifications: raw.certifications,
};
