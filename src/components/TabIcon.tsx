import { SvgXml } from 'react-native-svg';

import {
  COMPETITIONS_TAB_ICON_XML,
  HOME_TAB_ICON_XML,
  MEMBERS_TAB_ICON_XML,
  MORE_TAB_ICON_XML,
} from './tabIconXml';

export type TabName = 'index' | 'competitions' | 'members' | 'more';

type TabIconProps = {
  name: TabName;
  color: string;
};

const TAB_ICON_SIZE: Record<TabName, number> = {
  index: 24,
  competitions: 24,
  members: 21,
  more: 24,
};

function iconXml(name: TabName) {
  switch (name) {
    case 'index':
      return HOME_TAB_ICON_XML;
    case 'competitions':
      return COMPETITIONS_TAB_ICON_XML;
    case 'members':
      return MEMBERS_TAB_ICON_XML;
    case 'more':
      return MORE_TAB_ICON_XML;
    default: {
      const exhaustive: never = name;
      throw new Error(`Unhandled tab icon: ${exhaustive}`);
    }
  }
}

export default function TabIcon({ name, color }: TabIconProps) {
  const size = TAB_ICON_SIZE[name];
  const xml = iconXml(name).replaceAll('#CBD5E1', color);

  return <SvgXml xml={xml} width={size} height={size} />;
}
