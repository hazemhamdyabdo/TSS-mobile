import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, View } from 'react-native';

import PrimaryButton from '@/components/ui/PrimaryButton';

import { createAdministrator } from '../api';
import { ADMIN_ROLE_OPTIONS, ADMIN_STATUS_OPTIONS, CLUB_OPTIONS } from '../constants/options';
import {
  createAddAdministratorSchema,
  type AddAdministratorFormValues,
} from '../schemas/addAdministratorSchema';
import FormSelectField from './FormSelectField';
import FormTextField from './FormTextField';
import FormUploadField from './FormUploadField';

const EMPTY_VALUES: AddAdministratorFormValues = {
  name: '',
  club: '',
  role: '',
  phone: '',
  email: '',
  status: '',
  attachmentUri: undefined,
  attachmentType: undefined,
  attachmentSize: undefined,
};

export default function AddAdministratorForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = useMemo(() => createAddAdministratorSchema(t), [t]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddAdministratorFormValues>({
    resolver: zodResolver(schema),
    defaultValues: EMPTY_VALUES,
  });

  const attachmentUri = watch('attachmentUri');

  const onSubmit = async (values: AddAdministratorFormValues) => {
    setIsSubmitting(true);
    try {
      await createAdministrator(values);
      Alert.alert(t('create.screens.addAdministrator'), t('create.success.addAdministrator'), [
        { text: t('common.ok'), onPress: () => router.back() },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="w-full gap-2">
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <FormTextField
            label={t('create.fields.name')}
            required
            value={value}
            onChangeText={onChange}
            placeholder={t('create.placeholders.adminName')}
            error={errors.name?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="club"
        render={({ field: { onChange, value } }) => (
          <FormSelectField
            label={t('create.fields.club')}
            required
            value={value}
            onChange={onChange}
            placeholder={t('create.placeholders.clubRiyadh')}
            options={CLUB_OPTIONS}
            error={errors.club?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="role"
        render={({ field: { onChange, value } }) => (
          <FormSelectField
            label={t('create.fields.role')}
            required
            value={value}
            onChange={onChange}
            placeholder={t('create.placeholders.adminRole')}
            options={ADMIN_ROLE_OPTIONS}
            error={errors.role?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <FormTextField
            label={t('create.fields.phone')}
            required
            value={value}
            onChangeText={onChange}
            placeholder={t('create.placeholders.phone')}
            keyboardType="phone-pad"
            error={errors.phone?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <FormTextField
            label={t('create.fields.email')}
            required
            value={value}
            onChangeText={onChange}
            placeholder={t('create.placeholders.email')}
            keyboardType="email-address"
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="status"
        render={({ field: { onChange, value } }) => (
          <FormSelectField
            label={t('create.fields.status')}
            required
            value={value}
            onChange={onChange}
            placeholder={t('create.placeholders.adminStatus')}
            options={ADMIN_STATUS_OPTIONS}
            error={errors.status?.message}
          />
        )}
      />
      <FormUploadField
        label={t('create.fields.attachment')}
        optionalHint={t('create.optional')}
        uri={attachmentUri}
        error={errors.attachmentUri?.message}
        onChange={(file) => {
          setValue('attachmentUri', file.uri, { shouldValidate: true });
          setValue('attachmentType', file.type, { shouldValidate: true });
          setValue('attachmentSize', file.size, { shouldValidate: true });
        }}
      />
      <View className="mt-6">
        <PrimaryButton
          title={t('create.submit.addAdministrator')}
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
        />
      </View>
    </View>
  );
}
