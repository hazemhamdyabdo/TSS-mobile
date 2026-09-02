import { zodResolver } from '@hookform/resolvers/zod';
import { type Href, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import AuthDivider from './AuthDivider';
import PhoneNumberField from './PhoneNumberField';
import { requestOtp } from '../api';
import { createLoginSchema, toNationalSaPhone, type LoginFormValues } from '../schemas/loginSchema';
import FieldError from '@/components/ui/FieldError';
import FormLabel from '@/components/ui/FormLabel';
import OutlineButton from '@/components/ui/OutlineButton';
import PrimaryButton from '@/components/ui/PrimaryButton';

export default function LoginForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = useMemo(() => createLoginSchema(t), [t]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { phone: '' },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      const phone = toNationalSaPhone(values.phone);
      await requestOtp(phone);
      router.push(`/(auth)/otp?phone=${encodeURIComponent(phone)}` as unknown as Href);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="w-full gap-8">
      <View className="w-full gap-8">
        <View className="w-full items-start gap-1.5">
          <FormLabel>{t('auth.phoneLabel')}</FormLabel>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <PhoneNumberField
                value={value}
                onChangeText={onChange}
                placeholder={t('auth.phonePlaceholder')}
                countryCode={t('auth.countryCode')}
                hasError={Boolean(errors.phone)}
              />
            )}
          />
          {errors.phone?.message ? <FieldError message={errors.phone.message} /> : null}
        </View>

        <PrimaryButton
          title={t('auth.verify')}
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
        />
      </View>

      <View className="w-full gap-8">
        <AuthDivider label={t('auth.noAccount')} />
        <OutlineButton
          title={t('auth.contactFederation')}
          onPress={() => router.push('/(auth)/contact')}
        />
      </View>
    </View>
  );
}
