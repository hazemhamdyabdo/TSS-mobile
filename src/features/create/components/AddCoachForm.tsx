import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import PrimaryButton from '@/components/ui/PrimaryButton';

import { createCoach } from '../api';
import { submitCreateForm } from '../utils/submit';
import {
  CLUB_OPTIONS,
  COACH_LEVEL_OPTIONS,
  COACH_ROLE_OPTIONS,
  WEAPON_OPTIONS,
} from '../constants/options';
import { createAddCoachSchema, type AddCoachFormValues } from '../schemas/addCoachSchema';
import FormRow from '@/components/form/FormRow';
import FormSelectField from '@/components/form/FormSelectField';
import FormTextField from '@/components/form/FormTextField';
import FormUploadField from '@/components/form/FormUploadField';

const EMPTY_VALUES: AddCoachFormValues = {
  name: '',
  club: '',
  role: '',
  level: '',
  weapon: '',
  championships: '',
  matches: '',
  attachmentUri: undefined,
  attachmentType: undefined,
  attachmentSize: undefined,
};

export default function AddCoachForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = useMemo(() => createAddCoachSchema(t), [t]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddCoachFormValues>({
    resolver: zodResolver(schema),
    defaultValues: EMPTY_VALUES,
  });

  const attachmentUri = watch('attachmentUri');

  const onSubmit = async (values: AddCoachFormValues) => {
    setIsSubmitting(true);
    try {
      await submitCreateForm(
        () => createCoach(values),
        t,
        router,
        'create.screens.addCoach',
        'create.success.addCoach',
      );
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
            placeholder={t('create.placeholders.coachName')}
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
            placeholder={t('create.placeholders.clubCategory')}
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
            placeholder={t('create.placeholders.coachRole')}
            options={COACH_ROLE_OPTIONS}
            error={errors.role?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="level"
        render={({ field: { onChange, value } }) => (
          <FormSelectField
            label={t('create.fields.level')}
            required
            value={value}
            onChange={onChange}
            placeholder={t('create.placeholders.coachLevel')}
            options={COACH_LEVEL_OPTIONS}
            error={errors.level?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="weapon"
        render={({ field: { onChange, value } }) => (
          <FormSelectField
            label={t('create.fields.weapon')}
            required
            value={value}
            onChange={onChange}
            placeholder={t('create.placeholders.weaponFoil')}
            options={WEAPON_OPTIONS}
            error={errors.weapon?.message}
          />
        )}
      />
      <FormRow>
        <Controller
          control={control}
          name="matches"
          render={({ field: { onChange, value } }) => (
            <FormTextField
              flex
              label={t('create.fields.matches')}
              required
              value={value}
              onChangeText={onChange}
              placeholder={t('create.placeholders.matches')}
              keyboardType="numeric"
              error={errors.matches?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="championships"
          render={({ field: { onChange, value } }) => (
            <FormTextField
              flex
              label={t('create.fields.championships')}
              required
              value={value}
              onChangeText={onChange}
              placeholder={t('create.placeholders.championships')}
              keyboardType="numeric"
              error={errors.championships?.message}
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
          title={t('create.submit.addCoach')}
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
        />
      </View>
    </View>
  );
}
