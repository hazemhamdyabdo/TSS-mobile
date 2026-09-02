export type CompetitionStatus = 'ongoing' | 'upcoming' | 'ended';

export type CompetitionFilter = 'all' | CompetitionStatus;

export type CompetitionDetailTab = 'info' | 'participants' | 'results';

export type ParticipantStatus = 'active' | 'suspended';

export type NationalityCode = 'sa' | 'qa';

export type CompetitorPhotoId = 1 | 2 | 3 | 4 | 5;

export type Competition = {
  id: string;
  titleKey: string;
  nameKey: string;
  categoryKey: string;
  eventTypeKey: string;
  locationKey: string;
  dateKey: string;
  dateRangeKey: string;
  timeKey: string;
  dateNumber: string;
  dateMonthKey: string;
  aboutKey: string;
  playerCount: number;
  status: CompetitionStatus;
};

export type Participant = {
  id: string;
  competitionId: string;
  nameKey: string;
  photoId: CompetitorPhotoId;
  status: ParticipantStatus;
  nationalTeam: boolean;
  rating: number;
  weaponKey: string;
  level: string;
};

export type MatchSide = {
  nameKey: string;
  nationality: NationalityCode;
  photoId: CompetitorPhotoId;
  score: number;
};

export type MatchResult = {
  id: string;
  competitionId: string;
  startSide: MatchSide;
  endSide: MatchSide;
  roundKey: string;
  dateKey: string;
  timeKey: string;
};

export type CompetitionsState = {
  items: Competition[];
  participants: Participant[];
  results: MatchResult[];
  monthlyParticipantCount: number;
};
