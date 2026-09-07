export type GuestPunishmentKind = 'warning' | 'suspension';

export type GuestPunishment = {
  id: string;
  kind: GuestPunishmentKind;
  titleKey: string;
  reasonKey: string;
  relativeKey: string;
  relativeCount: number;
};
