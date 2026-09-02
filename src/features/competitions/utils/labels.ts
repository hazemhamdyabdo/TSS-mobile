import type { TFunction } from 'i18next';

import type { Competition } from '../types';

export function getCompetitionTitle(competition: Competition, t: TFunction) {
  return competition.title ?? t(competition.titleKey);
}

export function getCompetitionName(competition: Competition, t: TFunction) {
  return competition.name ?? t(competition.nameKey);
}

export function getCompetitionLocation(competition: Competition, t: TFunction) {
  return competition.location ?? t(competition.locationKey);
}

export function getCompetitionEventType(competition: Competition, t: TFunction) {
  return competition.eventType ?? t(competition.eventTypeKey);
}

export function getCompetitionCategory(competition: Competition, t: TFunction) {
  return competition.category ?? t(competition.categoryKey);
}

export function getCompetitionDate(competition: Competition, t: TFunction) {
  return competition.dateLabel ?? t(competition.dateKey);
}

export function getCompetitionDateRange(competition: Competition, t: TFunction) {
  return competition.dateRangeLabel ?? t(competition.dateRangeKey);
}

export function getCompetitionMonth(competition: Competition, t: TFunction) {
  return competition.dateMonthLabel ?? t(competition.dateMonthKey);
}

export function getCompetitionAbout(competition: Competition, t: TFunction) {
  return competition.about ?? t(competition.aboutKey);
}
