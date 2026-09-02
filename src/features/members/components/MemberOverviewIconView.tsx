import { SvgXml } from 'react-native-svg';

import { CLUBS_ICON_XML, RANKINGS_ICON_XML } from '@/features/more/constants/iconXml';

import {
  BAG_ICON_XML,
  CALENDAR_ICON_XML,
  CATEGORY_ICON_XML,
  COMPARE_ICON_XML,
  CUP_ICON_XML,
  FENCING_ICON_XML,
  GENDER_ICON_XML,
  GLOBE_ICON_XML,
  STAR_ICON_XML,
  USER_CARD_ICON_XML,
  USERS_GROUP_ICON_XML,
} from '../constants/iconXml';
import type { MemberOverviewIcon } from '../types';

type MemberOverviewIconViewProps = {
  icon: MemberOverviewIcon;
};

export default function MemberOverviewIconView({ icon }: MemberOverviewIconViewProps) {
  switch (icon) {
    case 'userCard':
      return <SvgXml xml={USER_CARD_ICON_XML} width={14} height={14} />;
    case 'club':
      return <SvgXml xml={CLUBS_ICON_XML} width={14} height={14} />;
    case 'fencing':
      return <SvgXml xml={FENCING_ICON_XML} width={16} height={16} />;
    case 'gender':
      return <SvgXml xml={GENDER_ICON_XML} width={12} height={12} />;
    case 'ranking':
      return <SvgXml xml={RANKINGS_ICON_XML} width={14} height={14} />;
    case 'category':
      return <SvgXml xml={CATEGORY_ICON_XML} width={14} height={14} />;
    case 'usersGroup':
      return <SvgXml xml={USERS_GROUP_ICON_XML} width={14} height={14} />;
    case 'globe':
      return <SvgXml xml={GLOBE_ICON_XML} width={14} height={14} />;
    case 'calendar':
      return <SvgXml xml={CALENDAR_ICON_XML} width={12} height={12} />;
    case 'star':
      return <SvgXml xml={STAR_ICON_XML} width={14} height={14} />;
    case 'bag':
      return <SvgXml xml={BAG_ICON_XML} width={14} height={14} />;
    case 'cup':
      return <SvgXml xml={CUP_ICON_XML} width={14} height={14} />;
    case 'compare':
      return <SvgXml xml={COMPARE_ICON_XML} width={14} height={14} />;
    default: {
      const exhaustive: never = icon;
      throw new Error(`Unhandled overview icon: ${exhaustive}`);
    }
  }
}
