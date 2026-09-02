import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, TextInput, View } from 'react-native';

import AuthDivider from './AuthDivider';
import { requestOtp, verifyOtp } from '../api';
import { OTP_LENGTH, OTP_RESEND_SECONDS } from '../constants/auth';
import { createOtpSchema, type OtpFormValues } from '../schemas/otpSchema';
import FieldError from '@/components/ui/FieldError';
import OutlineButton from '@/components/ui/OutlineButton';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { cairo } from '@/theme/typography';
import { onlyDigits } from '@/utils/digits';
import { MockApiError } from '@/utils/mockApi';

type OtpFormProps = {
  phone: string;
};

function formatTimer(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function OtpForm({ phone }: OtpFormProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);
  const [secondsLeft, setSecondsLeft] = useState(OTP_RESEND_SECONDS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = useMemo(() => createOtpSchema(t), [t]);

  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { otp: '' },
  });

  const otp = watch('otp');
  const digits = onlyDigits(otp).slice(0, OTP_LENGTH);
  const isComplete = digits.length === OTP_LENGTH;

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const timer = setTimeout(() => setSecondsLeft((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const onSubmit = async (values: OtpFormValues) => {
    setIsSubmitting(true);
    try {
      await verifyOtp(phone, onlyDigits(values.otp));
      router.replace('/(tabs)');
    } catch (error) {
      const message =
        error instanceof MockApiError ? t('auth.errors.otpInvalid') : t('auth.errors.otpInvalid');
      setError('otp', { message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (secondsLeft > 0) {
      return;
    }

    await requestOtp(phone);
    setSecondsLeft(OTP_RESEND_SECONDS);
  };

  return (
    <View className="w-full gap-8">
      <View className="w-full items-start gap-6">
        <Pressable onPress={() => inputRef.current?.focus()} className="w-full">
          <Controller
            control={control}
            name="otp"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  ref={inputRef}
                  value={value}
                  onChangeText={(next) => onChange(onlyDigits(next).slice(0, OTP_LENGTH))}
                  keyboardType="number-pad"
                  maxLength={OTP_LENGTH}
                  caretHidden
                  autoFocus
                  autoComplete="sms-otp"
                  textContentType="oneTimeCode"
                  className="absolute h-px w-px opacity-0"
                />
                <View className="w-full flex-row justify-between">
                  {Array.from({ length: OTP_LENGTH }).map((_, index) => {
                    const digit = digits[index] ?? '';
                    const hasError = Boolean(errors.otp);

                    return (
                      <View
                        key={index}
                        className={`size-16 items-center justify-center rounded-[10px] border bg-white ${hasError ? 'border-rejected' : 'border-slate-100'}`}>
                        <Text
                          className="text-xl text-sec-text"
                          style={{ fontFamily: cairo.regular }}>
                          {digit}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </>
            )}
          />
        </Pressable>
        {errors.otp?.message ? <FieldError message={errors.otp.message} /> : null}

        <View className="flex-row items-center gap-1" style={{ direction: 'ltr' }}>
          {secondsLeft > 0 ? (
            <Text className="text-sm text-sec-text" style={{ fontFamily: cairo.regular }}>
              {t('auth.retryIn', { time: formatTimer(secondsLeft) })}
            </Text>
          ) : (
            <Pressable onPress={handleResend}>
              <Text className="text-sm text-primary" style={{ fontFamily: cairo.regular }}>
                {t('auth.resend')}
              </Text>
            </Pressable>
          )}
          <Text className="text-sm text-accent" style={{ fontFamily: cairo.regular }}>
            {t('auth.otpMissing')}
          </Text>
        </View>
      </View>

      <PrimaryButton
        title={t('auth.login')}
        onPress={handleSubmit(onSubmit)}
        disabled={!isComplete}
        loading={isSubmitting}
      />

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
