import { TextInput, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { RTL_CONTAINER_STYLE, TEXT_INPUT_START_ALIGN } from '@/localization/direction';
import { colors } from '@/theme/colors';
import { cairo } from '@/theme/typography';

import { SEARCH_ICON_XML } from '../constants/iconXml';

type MemberSearchFieldProps = {
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
};

export default function MemberSearchField({ value, placeholder, onChangeText }: MemberSearchFieldProps) {
  return (
    <View
      className="h-[42px] min-w-0 flex-1 flex-row items-center gap-2 rounded-[10px] border border-slate-100 bg-white px-3"
      style={RTL_CONTAINER_STYLE}>
      <SvgXml xml={SEARCH_ICON_XML} width={20} height={20} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.secText}
        textAlign={TEXT_INPUT_START_ALIGN}
        className="min-w-0 flex-1 text-sm text-label"
        style={{ fontFamily: cairo.regular }}
      />
    </View>
  );
}
