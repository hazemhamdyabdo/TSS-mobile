import type { SelectOption } from '../types';

export const CLUB_OPTIONS: SelectOption[] = [
  { value: 'ittihad', labelKey: 'create.options.club.ittihad' },
  { value: 'riyadh', labelKey: 'create.options.club.riyadh' },
  { value: 'hilal', labelKey: 'create.options.club.hilal' },
];

export const WEAPON_OPTIONS: SelectOption[] = [
  { value: 'foil', labelKey: 'create.options.weapon.foil' },
  { value: 'epee', labelKey: 'create.options.weapon.epee' },
  { value: 'sabre', labelKey: 'create.options.weapon.sabre' },
];

export const GENDER_OPTIONS: SelectOption[] = [
  { value: 'male', labelKey: 'create.options.gender.male' },
  { value: 'female', labelKey: 'create.options.gender.female' },
];

export const COMPETITION_GENDER_OPTIONS: SelectOption[] = [
  { value: 'menOnly', labelKey: 'create.options.competitionGender.menOnly' },
  { value: 'womenOnly', labelKey: 'create.options.competitionGender.womenOnly' },
  { value: 'mixed', labelKey: 'create.options.competitionGender.mixed' },
];

export const AGE_CATEGORY_OPTIONS: SelectOption[] = [
  { value: 'u15', labelKey: 'create.options.ageCategory.u15' },
  { value: 'u17', labelKey: 'create.options.ageCategory.u17' },
  { value: 'u21', labelKey: 'create.options.ageCategory.u21' },
  { value: 'senior', labelKey: 'create.options.ageCategory.senior' },
];

export const NATIONALITY_OPTIONS: SelectOption[] = [
  { value: 'saudi', labelKey: 'create.options.nationality.saudi' },
  { value: 'other', labelKey: 'create.options.nationality.other' },
];

export const NATIONAL_TEAM_OPTIONS: SelectOption[] = [
  { value: 'calledUp', labelKey: 'create.options.nationalTeam.calledUp' },
  { value: 'notCalledUp', labelKey: 'create.options.nationalTeam.notCalledUp' },
];

export const COACH_ROLE_OPTIONS: SelectOption[] = [
  { value: 'headCoach', labelKey: 'create.options.coachRole.headCoach' },
  { value: 'assistant', labelKey: 'create.options.coachRole.assistant' },
];

export const COACH_LEVEL_OPTIONS: SelectOption[] = [
  { value: 'l1', labelKey: 'create.options.coachLevel.l1' },
  { value: 'l2', labelKey: 'create.options.coachLevel.l2' },
  { value: 'l3', labelKey: 'create.options.coachLevel.l3' },
];

export const REFEREE_CATEGORY_OPTIONS: SelectOption[] = [
  { value: 'A', labelKey: 'create.options.refereeCategory.a' },
  { value: 'B', labelKey: 'create.options.refereeCategory.b' },
  { value: 'C', labelKey: 'create.options.refereeCategory.c' },
];

export const REGION_OPTIONS: SelectOption[] = [
  { value: 'riyadh', labelKey: 'create.options.region.riyadh' },
  { value: 'jeddah', labelKey: 'create.options.region.jeddah' },
  { value: 'dammam', labelKey: 'create.options.region.dammam' },
];

export const ENTITY_OPTIONS: SelectOption[] = [
  { value: 'civilian', labelKey: 'create.options.entity.civilian' },
  { value: 'military', labelKey: 'create.options.entity.military' },
];

export const CLUB_CATEGORY_OPTIONS: SelectOption[] = [
  { value: 'standard', labelKey: 'create.options.clubCategory.standard' },
  { value: 'premier', labelKey: 'create.options.clubCategory.premier' },
];

export const COMPETITION_CATEGORY_OPTIONS: SelectOption[] = [
  { value: 'regional', labelKey: 'create.options.competitionCategory.regional' },
  { value: 'national', labelKey: 'create.options.competitionCategory.national' },
  { value: 'international', labelKey: 'create.options.competitionCategory.international' },
];

export const COMPETITION_STATUS_OPTIONS: SelectOption[] = [
  { value: 'draft', labelKey: 'create.options.competitionStatus.draft' },
  { value: 'published', labelKey: 'create.options.competitionStatus.published' },
  { value: 'completed', labelKey: 'create.options.competitionStatus.completed' },
];

export const ADMIN_ROLE_OPTIONS: SelectOption[] = [
  { value: 'physio', labelKey: 'create.options.adminRole.physio' },
  { value: 'manager', labelKey: 'create.options.adminRole.manager' },
  { value: 'secretary', labelKey: 'create.options.adminRole.secretary' },
];

export const ADMIN_STATUS_OPTIONS: SelectOption[] = [
  { value: 'active', labelKey: 'create.options.adminStatus.active' },
  { value: 'inactive', labelKey: 'create.options.adminStatus.inactive' },
];

export const OFFENDER_TYPE_OPTIONS: SelectOption[] = [
  { value: 'player', labelKey: 'create.options.offenderType.player' },
  { value: 'coach', labelKey: 'create.options.offenderType.coach' },
  { value: 'referee', labelKey: 'create.options.offenderType.referee' },
];

export const PENALTY_TYPE_OPTIONS: SelectOption[] = [
  { value: 'warning', labelKey: 'create.options.penaltyType.warning' },
  { value: 'suspension', labelKey: 'create.options.penaltyType.suspension' },
  { value: 'ban', labelKey: 'create.options.penaltyType.ban' },
];

export const ISSUED_BY_OPTIONS: SelectOption[] = [
  { value: 'federation', labelKey: 'create.options.issuedBy.federation' },
];
