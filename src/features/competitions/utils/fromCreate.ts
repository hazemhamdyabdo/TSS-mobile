import type { AddCompetitionFormValues } from '@/features/create/schemas/addCompetitionSchema';
import { toDisplayDate } from '@/utils/dates';

import type { Competition, CompetitionDraft, CompetitionStatus } from '../types';

function optionKey(group: string, value: string) {
  return `create.options.${group}.${value}`;
}

function mapStatus(status: string): CompetitionStatus {
  switch (status) {
    case 'completed':
      return 'ended';
    case 'published':
      return 'ongoing';
    case 'draft':
      return 'upcoming';
    default:
      return 'upcoming';
  }
}

function dateParts(iso: string) {
  const [year, month, day] = iso.split('-');
  return {
    day: day ?? '',
    month: month ?? '',
    year: year ?? '',
  };
}

export function draftFromCompetitionValues(values: AddCompetitionFormValues): CompetitionDraft {
  return {
    eventName: values.eventName,
    hostLocation: values.hostLocation,
    registrationDeadline: values.registrationDeadline,
    startDate: values.startDate,
    endDate: values.endDate,
    weapon: values.weapon,
    gender: values.gender,
    ageCategory: values.ageCategory,
    category: values.category,
    capacity: values.capacity,
    status: values.status,
    attachmentUri: values.attachmentUri,
  };
}

export function competitionFromValues(id: string, values: AddCompetitionFormValues): Competition {
  const start = dateParts(values.startDate);
  const dateLabel = values.startDate ? toDisplayDate(values.startDate) : values.startDate;
  const dateRangeLabel =
    values.startDate && values.endDate
      ? `${toDisplayDate(values.startDate)} – ${toDisplayDate(values.endDate)}`
      : dateLabel;

  return {
    id,
    titleKey: 'competitions.custom.title',
    nameKey: 'competitions.custom.name',
    categoryKey: optionKey('competitionCategory', values.category),
    eventTypeKey: optionKey('weapon', values.weapon),
    locationKey: 'competitions.custom.location',
    dateKey: 'competitions.custom.date',
    dateRangeKey: 'competitions.custom.dateRange',
    timeKey: 'competitions.shared.morningTime',
    dateNumber: start.day || '--',
    dateMonthKey: 'competitions.custom.month',
    aboutKey: 'competitions.custom.about',
    playerCount: Number(values.capacity) || 0,
    status: mapStatus(values.status),
    title: values.eventName,
    name: values.eventName,
    location: values.hostLocation,
    dateLabel,
    dateRangeLabel,
    dateMonthLabel: start.month,
    about: values.eventName,
    eventType: undefined,
    category: undefined,
    draft: draftFromCompetitionValues(values),
  };
}

export function competitionToFormValues(competition: Competition): AddCompetitionFormValues {
  if (competition.draft) {
    return {
      ...competition.draft,
      attachmentType: undefined,
      attachmentSize: undefined,
    };
  }

  const fallbackStatus =
    competition.status === 'ended'
      ? 'completed'
      : competition.status === 'ongoing'
        ? 'published'
        : 'draft';

  return {
    eventName: competition.title ?? competition.name ?? '',
    hostLocation: competition.location ?? '',
    registrationDeadline: '2026-08-01',
    startDate: '2026-08-18',
    endDate: '2026-08-20',
    weapon: 'foil',
    gender: 'mixed',
    ageCategory: 'senior',
    category: 'national',
    capacity: String(competition.playerCount),
    status: fallbackStatus,
    attachmentUri: undefined,
    attachmentType: undefined,
    attachmentSize: undefined,
  };
}
