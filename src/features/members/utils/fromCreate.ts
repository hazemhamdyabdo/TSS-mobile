import type { AddAdministratorFormValues } from '@/features/create/schemas/addAdministratorSchema';
import type { AddCoachFormValues } from '@/features/create/schemas/addCoachSchema';
import type { AddPlayerFormValues } from '@/features/create/schemas/addPlayerSchema';
import type { AddRefereeFormValues } from '@/features/create/schemas/addRefereeSchema';

import type {
  AdministratorMember,
  CoachMember,
  MemberPhotoIndex,
  PlayerMember,
  RefereeMember,
} from '../types';

function optionKey(group: string, value: string) {
  return `create.options.${group}.${value}`;
}

function photoIndexFromId(id: string): MemberPhotoIndex {
  const sum = [...id].reduce((total, char) => total + char.charCodeAt(0), 0);
  return ((sum % 6) + 1) as MemberPhotoIndex;
}

function federationId(prefix: string, id: string) {
  return `SFF-${prefix}-${id.replace(/[^a-zA-Z0-9]/g, '').slice(-8).toUpperCase()}`;
}

function refereeCategoryKey(value: string) {
  return optionKey('refereeCategory', value.toLowerCase());
}

export function memberFromPlayer(id: string, values: AddPlayerFormValues): PlayerMember {
  const weaponKey = optionKey('weapon', values.weapon);
  const clubKey = optionKey('club', values.club);

  return {
    id,
    category: 'player',
    nameKey: 'members.customName',
    displayName: values.name,
    photoIndex: photoIndexFromId(id),
    federationId: federationId('P', id),
    status: 'active',
    nationalTeam: values.nationalTeam === 'calledUp',
    chips: [
      { labelKey: 'members.chips.weapon', valueKey: weaponKey },
      { labelKey: 'members.chips.rating', value: values.rating },
    ],
    overview: [
      { labelKey: 'members.fields.name', value: values.name, icon: 'userCard' },
      { labelKey: 'members.fields.club', valueKey: clubKey, icon: 'club' },
      { labelKey: 'members.fields.weaponType', valueKey: weaponKey, icon: 'fencing' },
      { labelKey: 'members.fields.gender', valueKey: optionKey('gender', values.gender), icon: 'gender' },
      { labelKey: 'members.fields.ranking', value: values.rating, icon: 'ranking', emphasize: true },
      {
        labelKey: 'members.fields.category',
        valueKey: optionKey('ageCategory', values.ageCategory),
        icon: 'category',
      },
      {
        labelKey: 'members.fields.nationalTeam',
        valueKey: optionKey('nationalTeam', values.nationalTeam),
        icon: 'usersGroup',
      },
      {
        labelKey: 'members.fields.nationality',
        valueKey: optionKey('nationality', values.nationality),
        icon: 'globe',
      },
      { labelKey: 'members.fields.contractEnd', value: values.contractEnd, icon: 'calendar' },
      { labelKey: 'members.fields.rating', value: values.rating, icon: 'star' },
    ],
    sanctions: [],
  };
}

export function memberFromCoach(id: string, values: AddCoachFormValues): CoachMember {
  const weaponKey = optionKey('weapon', values.weapon);

  return {
    id,
    category: 'coach',
    nameKey: 'members.customName',
    displayName: values.name,
    photoIndex: photoIndexFromId(id),
    federationId: federationId('C', id),
    status: 'active',
    chips: [
      { labelKey: 'members.chips.championships', value: values.championships },
      { labelKey: 'members.chips.weapon', valueKey: weaponKey },
      { labelKey: 'members.chips.level', valueKey: optionKey('coachLevel', values.level), emphasize: true },
      { labelKey: 'members.chips.matches', value: values.matches },
    ],
    overview: [
      { labelKey: 'members.fields.name', value: values.name, icon: 'userCard' },
      { labelKey: 'members.fields.club', valueKey: optionKey('club', values.club), icon: 'club' },
      { labelKey: 'members.fields.role', valueKey: optionKey('coachRole', values.role), icon: 'bag' },
      { labelKey: 'members.fields.level', valueKey: optionKey('coachLevel', values.level), icon: 'star', emphasize: true },
      { labelKey: 'members.fields.weaponType', valueKey: weaponKey, icon: 'fencing' },
      { labelKey: 'members.fields.championships', value: values.championships, icon: 'cup' },
      { labelKey: 'members.fields.matches', value: values.matches, icon: 'compare' },
    ],
    sanctions: [],
  };
}

export function memberFromReferee(id: string, values: AddRefereeFormValues): RefereeMember {
  const weaponKey = optionKey('weapon', values.weapon);
  const categoryKey = refereeCategoryKey(values.category);

  return {
    id,
    category: 'referee',
    nameKey: 'members.customName',
    displayName: values.name,
    photoIndex: photoIndexFromId(id),
    federationId: federationId('R', id),
    status: 'active',
    chips: [
      { labelKey: 'members.chips.weapon', valueKey: weaponKey },
      { labelKey: 'members.chips.category', valueKey: categoryKey },
      { labelKey: 'members.chips.entity', valueKey: optionKey('entity', values.entity) },
    ],
    overview: [
      { labelKey: 'members.fields.name', value: values.name, icon: 'userCard' },
      { labelKey: 'members.fields.category', valueKey: categoryKey, icon: 'star', emphasize: true },
      { labelKey: 'members.fields.weaponType', valueKey: weaponKey, icon: 'fencing' },
      { labelKey: 'members.fields.entity', valueKey: optionKey('entity', values.entity), icon: 'bag' },
      { labelKey: 'members.fields.region', valueKey: optionKey('region', values.region), icon: 'club' },
    ],
    sanctions: [],
  };
}

export function memberFromAdministrator(
  id: string,
  values: AddAdministratorFormValues,
): AdministratorMember {
  return {
    id,
    category: 'administrator',
    nameKey: 'members.customName',
    displayName: values.name,
    photoIndex: photoIndexFromId(id),
    federationId: federationId('D', id),
    status: values.status === 'inactive' ? 'onLeave' : 'active',
    phone: values.phone,
    email: values.email,
    chips: [
      { labelKey: 'members.chips.role', valueKey: optionKey('adminRole', values.role) },
      { labelKey: 'members.chips.club', valueKey: optionKey('club', values.club) },
    ],
    overview: [
      { labelKey: 'members.fields.name', value: values.name, icon: 'userCard' },
      { labelKey: 'members.fields.club', valueKey: optionKey('club', values.club), icon: 'club' },
      { labelKey: 'members.fields.role', valueKey: optionKey('adminRole', values.role), icon: 'bag' },
    ],
    sanctions: [],
  };
}
