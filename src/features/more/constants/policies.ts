import type { PolicySection } from '../types';

export const DUMMY_POLICY_SECTIONS: PolicySection[] = [
  {
    id: 'privacy',
    titleKey: 'more.policies.sections.privacy.title',
    summaryKey: 'more.policies.sections.privacy.summary',
    bulletKeys: [
      'more.policies.sections.privacy.bullets.personalData',
      'more.policies.sections.privacy.bullets.dataUse',
      'more.policies.sections.privacy.bullets.dataSharing',
      'more.policies.sections.privacy.bullets.protection',
      'more.policies.sections.privacy.bullets.userRights',
    ],
  },
  {
    id: 'platformUse',
    titleKey: 'more.policies.sections.platformUse.title',
    summaryKey: 'more.policies.sections.platformUse.summary',
    bulletKeys: [
      'more.policies.sections.platformUse.bullets.acceptableUse',
      'more.policies.sections.platformUse.bullets.accountSuspension',
      'more.policies.sections.platformUse.bullets.accountCreation',
      'more.policies.sections.platformUse.bullets.userResponsibility',
      'more.policies.sections.platformUse.bullets.content',
    ],
  },
  {
    id: 'conduct',
    titleKey: 'more.policies.sections.conduct.title',
    summaryKey: 'more.policies.sections.conduct.summary',
    bulletKeys: [
      'more.policies.sections.conduct.bullets.tournamentConduct',
      'more.policies.sections.conduct.bullets.violations',
      'more.policies.sections.conduct.bullets.sportsmanship',
      'more.policies.sections.conduct.bullets.respect',
      'more.policies.sections.conduct.bullets.referees',
    ],
  },
  {
    id: 'playerProtection',
    titleKey: 'more.policies.sections.playerProtection.title',
    summaryKey: 'more.policies.sections.playerProtection.summary',
    bulletKeys: [
      'more.policies.sections.playerProtection.bullets.abusePrevention',
      'more.policies.sections.playerProtection.bullets.clubResponsibilities',
      'more.policies.sections.playerProtection.bullets.minors',
      'more.policies.sections.playerProtection.bullets.professionalConduct',
      'more.policies.sections.playerProtection.bullets.reporting',
    ],
  },
  {
    id: 'integrity',
    titleKey: 'more.policies.sections.integrity.title',
    summaryKey: 'more.policies.sections.integrity.summary',
    bulletKeys: [
      'more.policies.sections.integrity.bullets.unsportsmanlike',
      'more.policies.sections.integrity.bullets.reporting',
      'more.policies.sections.integrity.bullets.integrity',
      'more.policies.sections.integrity.bullets.conflictOfInterest',
      'more.policies.sections.integrity.bullets.manipulation',
    ],
  },
];
