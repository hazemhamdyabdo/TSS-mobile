import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SvgXml } from "react-native-svg";

import FieldError from "@/components/form/FieldError";
import FormLabel from "@/components/form/FormLabel";
import { CLOUD_UPLOAD_ICON_XML } from "@/components/form/formIconXml";
import OutlineButton from "@/components/ui/OutlineButton";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { TEXT_INPUT_START_ALIGN } from "@/localization/direction";
import { colors } from "@/theme/colors";
import { cairo } from "@/theme/typography";
import { submitContactMessage } from "../api";
import {
  createContactSchema,
  type ContactFormValues,
} from "../schemas/contactSchema";
import { toNationalSaPhone } from "../schemas/loginSchema";
import AuthDivider from "./AuthDivider";
import PhoneNumberField from "./PhoneNumberField";

export default function ContactForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = useMemo(() => createContactSchema(t), [t]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: "",
      subject: "",
      attachmentUri: undefined,
    },
  });

  const attachmentUri = watch("attachmentUri");

  const pickAttachment = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    });

    if (result.canceled || !result.assets[0]) {
      return;
    }

    const asset = result.assets[0];
    setValue("attachmentUri", asset.uri, { shouldValidate: true });
    setValue("attachmentType", asset.mimeType, { shouldValidate: true });
    setValue("attachmentSize", asset.fileSize, { shouldValidate: true });
  };

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await submitContactMessage({
        phone: toNationalSaPhone(values.phone),
        subject: values.subject,
        attachmentUri: values.attachmentUri,
      });
      Alert.alert(t("auth.contactTitle"), t("auth.contactSuccess"), [
        {
          text: t("auth.signIn"),
          onPress: () => router.replace("/(auth)/login"),
        },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="w-full gap-8">
      <View className="w-full gap-4">
        <View className="w-full items-end gap-2">
          <FormLabel>{t("auth.phoneLabel")}</FormLabel>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <PhoneNumberField
                value={value}
                onChangeText={onChange}
                placeholder={t("auth.phonePlaceholder")}
                hasError={Boolean(errors.phone)}
              />
            )}
          />
          {errors.phone?.message ? (
            <FieldError message={errors.phone.message} />
          ) : null}
        </View>

        <View className="w-full items-start gap-2">
          <FormLabel>{t("auth.subjectLabel")}</FormLabel>
          <Controller
            control={control}
            name="subject"
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder={t("auth.subjectPlaceholder")}
                placeholderTextColor={colors.secText}
                multiline
                textAlign={TEXT_INPUT_START_ALIGN}
                className="h-[125px] w-full rounded-[10px] border border-slate-100 bg-white px-4 py-3 text-sm leading-[18px] text-label"
                style={{ fontFamily: cairo.regular, textAlignVertical: "top" }}
              />
            )}
          />
          {errors.subject?.message ? (
            <FieldError message={errors.subject.message} />
          ) : null}
        </View>

        <View className="w-full items-start gap-2">
          <FormLabel>{t("auth.attachmentLabel")}</FormLabel>
          <Pressable
            onPress={pickAttachment}
            className="w-full items-center justify-center rounded-2xl border-[1.2px] border-dashed border-slate-300 bg-background p-4"
          >
            <View className="items-center gap-1">
              <View className="size-9 overflow-hidden">
                <SvgXml xml={CLOUD_UPLOAD_ICON_XML} width={36} height={36} />
              </View>
              <View
                className="flex-row items-start gap-1.5"
                style={{ direction: "ltr" }}
              >
                <Text
                  className="text-xs text-primary"
                  style={{ fontFamily: cairo.semiBold }}
                >
                  {t("auth.uploadCta")}
                </Text>
                <Text
                  className="text-xs text-neutral-500"
                  style={{ fontFamily: cairo.semiBold }}
                >
                  {t("auth.uploadHint")}
                </Text>
              </View>
              <Text
                className="text-[11px] leading-4 text-neutral-300"
                style={{ fontFamily: cairo.regular }}
              >
                {attachmentUri
                  ? attachmentUri.split("/").pop()
                  : t("auth.uploadTypes")}
              </Text>
            </View>
          </Pressable>
          {errors.attachmentUri?.message ? (
            <FieldError message={errors.attachmentUri.message} />
          ) : null}
        </View>
      </View>

      <PrimaryButton
        title={t("auth.send")}
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
      />

      <View className="w-full gap-8">
        <AuthDivider label={t("auth.hasAccount")} />
        <OutlineButton
          title={t("auth.signIn")}
          onPress={() => router.replace("/(auth)/login")}
        />
      </View>
    </View>
  );
}
