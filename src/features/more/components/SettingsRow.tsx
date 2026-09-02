import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { Pressable, Switch, Text, View } from 'react-native';

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { colors } from '@/theme/colors';
import { cairo } from '@/theme/typography';

import type { SettingsRowId } from '../types';
import SettingsRowIcon from './SettingsRowIcon';

type SettingsRowTone = 'default' | 'danger';

type SettingsRowVariant = 'link' | 'switch' | 'action';

type SettingsRowPosition = 'single' | 'first' | 'middle' | 'last';

type SettingsRowProps = {
  rowId: SettingsRowId;
  label: string;
  variant?: SettingsRowVariant;
  tone?: SettingsRowTone;
  position?: SettingsRowPosition;
  switchValue?: boolean;
  onPress?: () => void;
  onSwitchChange?: (value: boolean) => void;
};

function positionClassName(position: SettingsRowPosition) {
  switch (position) {
    case 'single':
      return 'rounded-lg border';
    case 'first':
      return 'rounded-t-lg border';
    case 'middle':
      return 'border-x border-b';
    case 'last':
      return 'rounded-b-lg border-x border-b';
    default: {
      const exhaustive: never = position;
      throw new Error(`Unhandled settings row position: ${exhaustive}`);
    }
  }
}

export default function SettingsRow({
  rowId,
  label,
  variant = 'link',
  tone = 'default',
  position = 'single',
  switchValue = false,
  onPress,
  onSwitchChange,
}: SettingsRowProps) {
  const isDanger = tone === 'danger';
  const labelClass = isDanger
    ? 'text-xs capitalize text-rejected'
    : 'text-sm capitalize text-slate-400';
  const labelFont = isDanger ? cairo.semiBold : cairo.medium;

  const content = (
    <View
      className={`w-full flex-row items-center overflow-hidden border-slate-100 bg-white px-6 py-5 ${
        variant === 'action' ? 'justify-start' : 'justify-between'
      } ${positionClassName(position)}`}
      style={RTL_CONTAINER_STYLE}
    >
      <View className="flex-row items-center gap-2" style={RTL_CONTAINER_STYLE}>
        <View className="size-6 items-center justify-center overflow-hidden">
          <SettingsRowIcon rowId={rowId} />
        </View>
        <Text className={labelClass} style={{ fontFamily: labelFont, ...RTL_TEXT_STYLE }}>
          {label}
        </Text>
      </View>
      {variant === 'link' ? (
        <MaterialDesignIcons name="chevron-left" size={18} color={colors.slate400} />
      ) : null}
      {variant === 'switch' ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: 'rgba(1,138,67,0.1)', true: colors.primary }}
          thumbColor={colors.white}
          ios_backgroundColor="rgba(1,138,67,0.1)"
        />
      ) : null}
    </View>
  );

  if (variant === 'switch') {
    return content;
  }

  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      {content}
    </Pressable>
  );
}
