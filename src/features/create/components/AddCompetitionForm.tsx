import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, View } from 'react-native';

import PrimaryButton from '@/components/ui/PrimaryButton';

import { createCompetition } from '../api';
import {
  AGE_CATEGORY_OPTIONS,
  COMPETITION_CATEGORY_OPTIONS,
  COMPETITION_GENDER_OPTIONS,
  COMPETITION_STATUS_OPTIONS,
  WEAPON_OPTIONS,
} from '../constants/options';
import {
  createAddCompetitionSchema,
  type AddCompetitionFormValues,
} from '../schemas/addCompetitionSchema';
import FormDateField from './FormDateField';
import FormRow from './FormRow';
import FormSelectField from './FormSelectField';
import FormTextField from './FormTextField';
import FormUploadField from './FormUploadField';

const EMPTY_VALUES: AddCompetitionFormValues = {
  eventName: '',
  hostLocation: '',
  registrationDeadline: '',
  startDate: '',
  endDate: '',
  weapon: '',
  gender: '',
  ageCategory: '',
  category: '',
  capacity: '',
  status: '',
  attachmentUri: undefined,
  attachmentType: undefined,
  attachmentSize: undefined,
};

export default function AddCompetitionForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = useMemo(() => createAddCompetitionSchema(t), [t]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddCompetitionFormValues>({
    resolver: zodResolver(schema),
    defaultValues: EMPTY_VALUES,
  });

  const attachmentUri = watch('attachmentUri');

  const onSubmit = async (values: AddCompetitionFormValues) => {
    setIsSubmitting(true);
    try {
      await createCompetition(values);
      Alert.alert(t('create.screens.addCompetition'), t('create.success.addCompetition'), [
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
        name="eventName"
        render={({ field: { onChange, value } }) => (
          <FormTextField
            label={t('create.fields.eventName')}
            required
            value={value}
            onChangeText={onChange}
            placeholder={t('create.placeholders.eventName')}
            error={errors.eventName?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="hostLocation"
        render={({ field: { onChange, value } }) => (
          <FormTextField
            label={t('create.fields.hostLocation')}
            required
            value={value}
            onChangeText={onChange}
            placeholder={t('create.placeholders.hostLocation')}
            error={errors.hostLocation?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="registrationDeadline"
        render={({ field: { onChange, value } }) => (
          <FormDateField
            label={t('create.fields.registrationDeadline')}
            required
            value={value}
            onChange={onChange}
            placeholder={t('create.datePlaceholder')}
            error={errors.registrationDeadline?.message}
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
      <FormRow>
        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, value } }) => (
            <FormSelectField
              flex
              label={t('create.fields.gender')}
              required
              value={value}
              onChange={onChange}
              placeholder={t('create.placeholders.competitionGender')}
              options={COMPETITION_GENDER_OPTIONS}
              error={errors.gender?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="weapon"
          render={({ field: { onChange, value } }) => (
            <FormSelectField
              flex
              label={t('create.fields.weapon')}
              required
              value={value}
              onChange={onChange}
              placeholder={t('create.placeholders.weaponEpee')}
              options={WEAPON_OPTIONS}
              error={errors.weapon?.message}
            />
          )}
        />
      </FormRow>
      <FormRow>
        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, value } }) => (
            <FormSelectField
              flex
              label={t('create.fields.category')}
              required
              value={value}
              onChange={onChange}
              placeholder={t('create.placeholders.competitionCategory')}
              options={COMPETITION_CATEGORY_OPTIONS}
              error={errors.category?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="ageCategory"
          render={({ field: { onChange, value } }) => (
            <FormSelectField
              flex
              label={t('create.fields.ageCategory')}
              required
              value={value}
              onChange={onChange}
              placeholder={t('create.placeholders.ageCategory')}
              options={AGE_CATEGORY_OPTIONS}
              error={errors.ageCategory?.message}
            />
          )}
        />
      </FormRow>
      <FormRow>
        <Controller
          control={control}
          name="status"
          render={({ field: { onChange, value } }) => (
            <FormSelectField
              flex
              label={t('create.fields.status')}
              required
              value={value}
              onChange={onChange}
              placeholder={t('create.placeholders.competitionStatus')}
              options={COMPETITION_STATUS_OPTIONS}
              error={errors.status?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="capacity"
          render={({ field: { onChange, value } }) => (
            <FormTextField
              flex
              label={t('create.fields.capacity')}
              required
              value={value}
              onChangeText={onChange}
              placeholder={t('create.placeholders.capacity')}
              keyboardType="numeric"
              error={errors.capacity?.message}
            />
          )}
        />
      </FormRow>
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
          title={t('create.submit.addCompetition')}
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
        />
      </View>
    </View>
  );
}
