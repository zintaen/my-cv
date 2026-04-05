import { describe, expect, it } from 'vitest';

import { cvData } from './cv';

describe('CV Data Invariants', () => {
    it('should have a valid profile', () => {
        expect(cvData.profile.name).toBeTruthy();
        expect(cvData.profile.title).toBeTruthy();
        expect(cvData.profile.contact.email).toContain('@');
    });

    it('should have a non-empty professional summary', () => {
        expect(cvData.professionalSummary.length).toBeGreaterThan(50);
    });

    it('should have properly structured experiences', () => {
        expect(cvData.experiences.length).toBeGreaterThan(0);
        cvData.experiences.forEach((exp) => {
            expect(exp.role).toBeTruthy();
            expect(exp.company).toBeTruthy();
            expect(exp.date).toBeTruthy();
            expect(exp.bullets.length).toBeGreaterThan(0);
        });
    });

    it('should have unique skill group titles', () => {
        const titles = cvData.skillGroups.map(g => g.title);
        const uniqueTitles = new Set(titles);
        expect(titles.length).toBe(uniqueTitles.size);
    });

    it('should have unique skill titles within each group', () => {
        cvData.skillGroups.forEach((group) => {
            const skillTitles = group.skills.map(s => s.title);
            const uniqueSkillTitles = new Set(skillTitles);
            expect(skillTitles.length).toBe(uniqueSkillTitles.size);
        });
    });
});
