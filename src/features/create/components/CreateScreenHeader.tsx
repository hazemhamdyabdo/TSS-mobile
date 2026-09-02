import { Text, View } from "react-native";

import {
  RTL_CONTAINER_STYLE,
  RTL_TEXT_STYLE,
} from "@/localization/direction";
import { cairo } from "@/theme/typography";

import CreateBackButton from "./CreateBackButton";

type CreateScreenHeaderProps = {
  title: string;
  onBack?: () => void;
};

export default function CreateScreenHeader({ title, onBack }: CreateScreenHeaderProps) {
  return (
    <View
      className="w-full flex-row items-center gap-4 px-5 py-3"
      style={RTL_CONTAINER_STYLE}
    >
      <CreateBackButton onPress={onBack} />
      <Text
        className="min-w-0 flex-1 capitalize leading-[1.6] text-accent"
        style={{ fontFamily: cairo.semiBold, ...RTL_TEXT_STYLE }}
      >
        {title}
      </Text>
    </View>
  );
}
