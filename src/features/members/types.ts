export type MemberCategory = 'player' | 'coach' | 'referee' | 'administrator';

export type MemberStatus = 'active' | 'suspended' | 'onLeave';

export type MemberStatusFilter = 'all' | MemberStatus;

export type MemberPhotoIndex = 1 | 2 | 3 | 4 | 5 | 6;

export type MemberOverviewIcon =
  | 'userCard'
  | 'club'
  | 'fencing'
  | 'gender'
  | 'ranking'
  | 'category'
  | 'usersGroup'
  | 'globe'
  | 'calendar'
  | 'star'
  | 'bag'
  | 'cup'
  | 'compare';

export type MemberOverviewRow = {
  labelKey: string;
  valueKey?: string;
  value?: string;
  icon: MemberOverviewIcon;
  emphasize?: boolean;
};

export type MemberSanctionKind = 'warning' | 'suspension';

export type MemberSanction = {
  id: string;
  kind: MemberSanctionKind;
  titleKey: string;
  reasonKey: string;
  relativeKey: string;
  relativeCount: number;
};

export type MemberMetaChip = {
  labelKey: string;
  valueKey?: string;
  value?: string;
  emphasize?: boolean;
};

type MemberBase = {
  id: string;
  nameKey: string;
  photoIndex: MemberPhotoIndex;
  federationId: string;
  overview: MemberOverviewRow[];
  sanctions: MemberSanction[];
};

export type PlayerMember = MemberBase & {
  category: 'player';
  status: Extract<MemberStatus, 'active' | 'suspended'>;
  nationalTeam: boolean;
  chips: MemberMetaChip[];
};

export type CoachMember = MemberBase & {
  category: 'coach';
  status: Extract<MemberStatus, 'active' | 'suspended'>;
  chips: MemberMetaChip[];
};

export type RefereeMember = MemberBase & {
  category: 'referee';
  status: Extract<MemberStatus, 'active' | 'suspended'>;
  chips: MemberMetaChip[];
};

export type AdministratorMember = MemberBase & {
  category: 'administrator';
  status: Extract<MemberStatus, 'active' | 'onLeave'>;
  chips: MemberMetaChip[];
  phone: string;
  email: string;
};

export type Member = PlayerMember | CoachMember | RefereeMember | AdministratorMember;

export type MembersState = {
  items: Member[];
  totalCount: number;
  suspendedCount: number;
};

export type AddMemberActionId = 'addPlayer' | 'addCoach' | 'addReferee' | 'addAdministrator';
