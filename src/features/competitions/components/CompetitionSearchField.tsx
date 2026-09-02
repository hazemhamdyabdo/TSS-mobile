import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { TextInput, View } from 'react-native';

import { RTL_CONTAINER_STYLE, TEXT_INPUT_START_ALIGN } from '@/localization/direction';
import { colors } from '@/theme/colors';
import { cairo } from '@/theme/typography';

type CompetitionSearchFieldProps = {
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
};

export default function CompetitionSearchField({
  value,
  placeholder,
  onChangeText,
}: CompetitionSearchFieldProps) {
  return (
    <View
      className="h-[42px] min-w-0 flex-1 flex-row items-center gap-2 rounded-[10px] border border-slate-100 bg-white px-3"
      style={RTL_CONTAINER_STYLE}>
      <MaterialDesignIcons name="magnify" size={20} color={colors.secText} />
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
