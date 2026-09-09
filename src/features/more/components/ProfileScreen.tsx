import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import FormField from "@/components/form/FormField";
import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import PrimaryButton from "@/components/ui/PrimaryButton";
import PhoneNumberField from "@/features/auth/components/PhoneNumberField";
import { useAuthState } from "@/features/auth/hooks/useAuthState";
import { isGuestSession, getAuthRole } from "@/features/auth/utils/sessionRole";
import CreateScreenHeader from "@/features/create/components/CreateScreenHeader";
import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from "@/localization/direction";
import { colors } from "@/theme/colors";
import { cairo } from "@/theme/typography";

import { getMockErrorMessage } from "@/utils/formErrors";
import { updateProfile } from "../api";
import { DUMMY_GUEST_PROFILE } from "../constants/dummy";
import { useMoreState } from "../hooks/useMoreState";
import {
  createProfileSchema,
  type ProfileSchemaValues,
} from "../schemas/profileSchema";
import { toPhoneFieldValue } from "../utils/phone";
import { resolveProfileAvatarSource } from "../utils/profileAvatar";
import ProfileTextField from "./ProfileTextField";

type ReadOnlyFieldProps = {
  label: string;
  value: string;
};

function ReadOnlyField({ label, value }: ReadOnlyFieldProps) {
  return (
    <FormField label={label} flex>
      <View className="h-12 w-full items-end justify-center rounded-[10px] border border-slate-100 bg-white px-4">
        <Text
          className="w-full text-sm leading-[18px] text-slate-400"
          style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
          numberOfLines={1}
        >
          {value}
        </Text>
      </View>
    </FormField>
  );
}

export default function ProfileScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { session } = useAuthState();
  const { profile: storeProfile } = useMoreState();
  const isGuest = isGuestSession(session);
  const profile = isGuest ? DUMMY_GUEST_PROFILE : storeProfile;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarUri, setAvatarUri] = useState(profile.avatarUri);
  const schema = useMemo(() => createProfileSchema(t), [t]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileSchemaValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: profile.name,
      email: profile.email,
      phone: toPhoneFieldValue(profile.phone),
    },
  });

  const avatarSource = resolveProfileAvatarSource(
    { ...profile, avatarUri },
    getAuthRole(session),
  );

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    });

    if (result.canceled || !result.assets[0]) {
      return;
    }

    setAvatarUri(result.assets[0].uri);
  };

  const onSubmit = async (values: ProfileSchemaValues) => {
    setIsSubmitting(true);
    try {
      await updateProfile({
        ...profile,
        name: values.name,
        email: values.email,
        phone: values.phone,
        avatarUri,
      });
      Alert.alert(t("more.profile.title"), t("more.profile.saved"), [
        { text: t("common.ok"), onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert(
        t("more.profile.title"),
        getMockErrorMessage(error, "more.profile.saveFailed", t),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={["top", "bottom"]}
      style={RTL_CONTAINER_STYLE}
    >
      <StatusBar style="auto" />
      <CreateScreenHeader title={t("more.profile.title")} />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="gap-6 px-5 pb-8 pt-4"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full items-center gap-2">
            <View className="size-[100px] items-center justify-center">
              <View className="size-[100px] overflow-hidden rounded-full border-2 border-white">
                <Image
                  source={avatarSource}
                  style={{ width: 100, height: 100 }}
                  contentFit="cover"
                />
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t("more.profile.changePhoto")}
                onPress={() => {
                  void pickAvatar();
                }}
                className="absolute bottom-1 right-1 size-8 items-center justify-center overflow-hidden rounded-full bg-primary"
              >
                <MaterialDesignIcons
                  name="camera-outline"
                  size={16}
                  color={colors.white}
                />
              </Pressable>
            </View>
            <View className="items-center gap-3">
              <Text
                className="text-lg text-accent"
                style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
              >
                {profile.name}
              </Text>
              <View className="rounded-3xl bg-primary/10 px-2 py-2">
                <Text
                  className="text-xs capitalize leading-[1.6] text-primary"
                  style={{ fontFamily: cairo.medium, ...RTL_TEXT_STYLE }}
                >
                  {t(profile.roleKey)}
                </Text>
              </View>
            </View>
          </View>

          <View className="w-full gap-3">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <ProfileTextField
                  label={t("more.profile.fields.name")}
                  value={value}
                  onChangeText={onChange}
                  placeholder={t("more.profile.fields.name")}
                  error={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <FormField
                  label={t("more.profile.fields.phone")}
                  error={errors.phone?.message}
                >
                  <PhoneNumberField
                    value={value}
                    onChangeText={onChange}
                    placeholder={t("auth.phonePlaceholder")}
                    hasError={Boolean(errors.phone)}
                    variant="profile"
                  />
                </FormField>
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <ProfileTextField
                  label={t("more.profile.fields.email")}
                  value={value}
                  onChangeText={onChange}
                  placeholder={t("more.profile.fields.email")}
                  keyboardType="email-address"
                  error={errors.email?.message}
                />
              )}
            />
            {profile.playerDetails ? (
              <>
                <View className="w-full flex-row gap-2" style={RTL_CONTAINER_STYLE}>
                  <ReadOnlyField
                    label={t("more.profile.fields.club")}
                    value={profile.playerDetails.club}
                  />
                  <ReadOnlyField
                    label={t("more.profile.fields.birthDate")}
                    value={profile.playerDetails.birthDate}
                  />
                </View>
                <View className="w-full flex-row gap-2" style={RTL_CONTAINER_STYLE}>
                  <ReadOnlyField
                    label={t("more.profile.fields.weapon")}
                    value={profile.playerDetails.weapon}
                  />
                  <ReadOnlyField
                    label={t("more.profile.fields.gender")}
                    value={profile.playerDetails.gender}
                  />
                </View>
                <View className="w-full flex-row gap-2" style={RTL_CONTAINER_STYLE}>
                  <ReadOnlyField
                    label={t("more.profile.fields.ageCategory")}
                    value={profile.playerDetails.ageCategory}
                  />
                  <ReadOnlyField
                    label={t("more.profile.fields.rating")}
                    value={profile.playerDetails.rating}
                  />
                </View>
                <View className="w-full flex-row gap-2" style={RTL_CONTAINER_STYLE}>
                  <ReadOnlyField
                    label={t("more.profile.fields.nationality")}
                    value={profile.playerDetails.nationality}
                  />
                  <ReadOnlyField
                    label={t("more.profile.fields.nationalTeam")}
                    value={profile.playerDetails.nationalTeam}
                  />
                </View>
                <View className="w-full flex-row gap-2" style={RTL_CONTAINER_STYLE}>
                  <ReadOnlyField
                    label={t("more.profile.fields.contractStart")}
                    value={profile.playerDetails.contractStart}
                  />
                  <ReadOnlyField
                    label={t("more.profile.fields.contractEnd")}
                    value={profile.playerDetails.contractEnd}
                  />
                </View>
              </>
            ) : null}
          </View>

          <PrimaryButton
            title={t("more.profile.save")}
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenSafeAreaView>
  );
}
