import type { TFunction } from 'i18next';

import type { Member } from '../types';

export function getMemberName(member: Pick<Member, 'nameKey' | 'displayName'>, t: TFunction) {
  return member.displayName ?? t(member.nameKey);
}
