import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import PrimaryButton from '@/components/ui/PrimaryButton';

import { createPunishment } from '../api';
import { submitCreateForm } from '../utils/submit';
import { ISSUED_BY_OPTIONS, OFFENDER_TYPE_OPTIONS, PENALTY_TYPE_OPTIONS } from '../constants/options';
import {
  createAddPunishmentSchema,
  type AddPunishmentFormValues,
} from '../schemas/addPunishmentSchema';
import FormDateField from '@/components/form/FormDateField';
import FormRow from '@/components/form/FormRow';
import FormSelectField from '@/components/form/FormSelectField';
import FormTextField from '@/components/form/FormTextField';
import FormUploadField from '@/components/form/FormUploadField';

const EMPTY_VALUES: AddPunishmentFormValues = {
  offenderType: '',
  name: '',
  penaltyType: '',
  reason: '',
  startDate: '',
  endDate: '',
  issuedBy: '',
  attachmentUri: undefined,
  attachmentType: undefined,
  attachmentSize: undefined,
};

export default function AddPunishmentForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = useMemo(() => createAddPunishmentSchema(t), [t]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddPunishmentFormValues>({
    resolver: zodResolver(schema),
    defaultValues: EMPTY_VALUES,
  });

  const attachmentUri = watch('attachmentUri');

  const onSubmit = async (values: AddPunishmentFormValues) => {
    setIsSubmitting(true);
    try {
      await submitCreateForm(
        () => createPunishment(values),
        t,
        router,
        'create.screens.addPunishment',
        'create.success.addPunishment',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="w-full gap-2">
      <Controller
        control={control}
        name="offenderType"
        render={({ field: { onChange, value } }) => (
          <FormSelectField
            label={t('create.fields.offenderType')}
            required
            value={value}
            onChange={onChange}
            placeholder={t('create.placeholders.offenderType')}
            options={OFFENDER_TYPE_OPTIONS}
            error={errors.offenderType?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <FormTextField
            label={t('create.fields.name')}
            required
            value={value}
            onChangeText={onChange}
            placeholder={t('create.placeholders.punishmentName')}
            error={errors.name?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="penaltyType"
        render={({ field: { onChange, value } }) => (
          <FormSelectField
            label={t('create.fields.penaltyType')}
            required
            value={value}
            onChange={onChange}
            placeholder={t('create.placeholders.penaltyType')}
            options={PENALTY_TYPE_OPTIONS}
            error={errors.penaltyType?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="reason"
        render={({ field: { onChange, value } }) => (
          <FormTextField
            label={t('create.fields.reason')}
            required
            value={value}
            onChangeText={onChange}
            placeholder={t('create.placeholders.reason')}
            error={errors.reason?.message}
          />
        )}
      />
      <FormRow>
        <Controller
          control={control}
          name="endDate"
          render={({ field: { onChange, value } }) => (
            <FormDateField
              flex
              label={t('create.fields.endDate')}
              required
              value={value}
              onChange={onChange}
              placeholder={t('create.datePlaceholder')}
              error={errors.endDate?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="startDate"
          render={({ field: { onChange, value } }) => (
            <FormDateField
              flex
              label={t('create.fields.startDate')}
              required
              value={value}
              onChange={onChange}
              placeholder={t('create.datePlaceholder')}
              error={errors.startDate?.message}
            />
          )}
        />
      </FormRow>
      <Controller
        control={control}
        name="issuedBy"
        render={({ field: { onChange, value } }) => (
          <FormSelectField
            label={t('create.fields.issuedBy')}
            required
            value={value}
            onChange={onChange}
            placeholder={t('create.placeholders.issuedBy')}
            options={ISSUED_BY_OPTIONS}
            error={errors.issuedBy?.message}
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
          title={t('create.submit.addPunishment')}
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
        />
      </View>
    </View>
  );
}
