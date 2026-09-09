export type FederationClub = {
  id: string;
  name: string;
  nameKey?: string;
  region: string;
  category: string;
  playerCount: string;
  attachmentUri?: string;
};

export type ClubLogoId =
  | 'hilal'
  | 'nassr'
  | 'ahli'
  | 'shabab'
  | 'fayha'
  | 'wehda'
  | 'faisaly'
  | 'abha'
  | 'ittihad';

export type ClubRegionFilter = 'all' | 'riyadh' | 'jeddah' | 'dammam';

/** Guest/user browse catalog (read-only mock). */
export type BrowseClub = {
  id: string;
  nameKey: string;
  logoId: ClubLogoId;
  federationId: string;
  region: string;
  category: string;
  playerCount: number;
  playerIds: string[];
};

export type FederationPunishment = {
  id: string;
  offenderType: string;
  name: string;
  penaltyType: string;
  reason: string;
  startDate: string;
  endDate: string;
  issuedBy: string;
  attachmentUri?: string;
};

export type FederationRanking = {
  id: string;
  rank: number;
  nameKey: string;
  clubKey: string;
  points: number;
};

export type FederationResult = {
  id: string;
  competitionKey: string;
  dateKey: string;
  winnerKey: string;
  score: string;
};

export type TransferStatus = 'pending' | 'approved' | 'rejected';

export type FederationTransfer = {
  id: string;
  playerKey: string;
  fromClubKey: string;
  toClubKey: string;
  status: TransferStatus;
  dateKey: string;
};

export type FederationState = {
  clubs: FederationClub[];
  punishments: FederationPunishment[];
  rankings: FederationRanking[];
  results: FederationResult[];
  transfers: FederationTransfer[];
};
