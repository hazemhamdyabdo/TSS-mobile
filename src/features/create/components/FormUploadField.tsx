import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

import {
  CLOUD_UPLOAD_GREEN_ICON_XML,
  CLOUD_UPLOAD_ICON_XML,
} from "@/components/formIconXml";
import { RTL_TEXT_STYLE } from "@/localization/direction";
import { cairo } from "@/theme/typography";

import FormField from "./FormField";

type FormUploadFieldProps = {
  label: string;
  required?: boolean;
  optionalHint?: string;
  error?: string;
  uri?: string;
  variant?: "optional" | "passport";
  onChange: (file: { uri: string; type?: string; size?: number }) => void;
};

export default function FormUploadField({
  label,
  required = false,
  optionalHint,
  error,
  uri,
  variant = "optional",
  onChange,
}: FormUploadFieldProps) {
  const { t } = useTranslation();
  const isPassport = variant === "passport";

  const pickAttachment = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    });

    if (result.canceled || !result.assets[0]) {
      return;
    }

    const asset = result.assets[0];
    onChange({
      uri: asset.uri,
      type: asset.mimeType,
      size: asset.fileSize,
    });
  };

  const dropzone = (
    <Pressable
      onPress={pickAttachment}
      className={`w-full items-center justify-center rounded-lg border-[1.2px] border-dashed p-4 ${
        isPassport
          ? "h-[95px] border-primary/30 bg-primary/10"
          : "h-[91px] border-slate-200 bg-white"
      }`}
    >
      <View className="items-center gap-1">
        <View
          className={`overflow-hidden ${isPassport ? "size-[26px]" : "size-7"}`}
        >
          <SvgXml
            xml={
              isPassport ? CLOUD_UPLOAD_GREEN_ICON_XML : CLOUD_UPLOAD_ICON_XML
            }
            width={isPassport ? 26 : 28}
            height={isPassport ? 26 : 28}
          />
        </View>
        <View className="flex-row items-start gap-1.5">
          <Text
            className="text-xs text-neutral-500"
            style={{ fontFamily: cairo.semiBold }}
          >
            {t("create.upload.hint")}
          </Text>
          <Text
            className="text-xs text-primary"
            style={{ fontFamily: cairo.semiBold }}
          >
            {t("create.upload.cta")}
          </Text>
        </View>
        <Text
          className="text-[11px] leading-4 text-neutral-300"
          style={{ fontFamily: cairo.regular }}
        >
          {uri
            ? uri.split("/").pop()
            : isPassport
              ? t("create.passport.types")
              : t("create.upload.types")}
        </Text>
      </View>
    </Pressable>
  );

  if (!isPassport) {
    return (
      <FormField
        label={label}
        required={required}
        optionalHint={optionalHint}
        error={error}
      >
        {dropzone}
      </FormField>
    );
  }

  return (
    <FormField label={label} required={required} error={error}>
      <View className="w-full gap-3 overflow-hidden rounded-lg border border-slate-100 bg-white p-4">
        <View className="w-full items-start gap-2.5">
          <Text
            className="w-full text-xs text-accent"
            style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
          >
            {t("create.passport.title")}
          </Text>
          <Text
            className="w-full text-[10px] leading-6 text-slate-400"
            style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
          >
            {t("create.passport.hint")}
          </Text>
        </View>
        {dropzone}
      </View>
    </FormField>
  );
}
