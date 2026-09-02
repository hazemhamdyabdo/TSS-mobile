import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, type Href } from "expo-router";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import FieldError from "@/components/form/FieldError";
import FormLabel from "@/components/form/FormLabel";
import OutlineButton from "@/components/ui/OutlineButton";
import PrimaryButton from "@/components/ui/PrimaryButton";

import { getMockErrorMessage } from "@/utils/formErrors";

import { requestOtp } from "../api";
import { MOCK_QA_PHONE } from "../constants/dummy";
import {
  createLoginSchema,
  toNationalSaPhone,
  type LoginFormValues,
} from "../schemas/loginSchema";
import AuthDivider from "./AuthDivider";
import PhoneNumberField from "./PhoneNumberField";

export default function LoginForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = useMemo(() => createLoginSchema(t), [t]);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { phone: MOCK_QA_PHONE },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      const phone = toNationalSaPhone(values.phone);
      await requestOtp(phone);
      router.push(
        `/(auth)/otp?phone=${encodeURIComponent(phone)}` as unknown as Href,
      );
    } catch (error) {
      setError("phone", {
        message: getMockErrorMessage(error, "auth.errors.phoneUnknown", t),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="w-full gap-8">
      <View className="w-full gap-8">
        <View className="w-full items-start gap-1.5">
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

        <PrimaryButton
          title={t("auth.verify")}
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
        />
      </View>

      <View className="w-full gap-8">
        <AuthDivider label={t("auth.noAccount")} />
        <OutlineButton
          title={t("auth.contactFederation")}
          onPress={() => router.push("/(auth)/contact")}
        />
      </View>
    </View>
  );
}
