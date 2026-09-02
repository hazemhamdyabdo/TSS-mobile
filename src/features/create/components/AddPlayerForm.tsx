import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import FormDateField from '@/components/form/FormDateField';
import FormRow from '@/components/form/FormRow';
import FormSelectField from '@/components/form/FormSelectField';
import FormTextField from '@/components/form/FormTextField';
import FormUploadField from '@/components/form/FormUploadField';
import PrimaryButton from '@/components/ui/PrimaryButton';

import { createPlayer } from '../api';
import { submitCreateForm } from '../utils/submit';
import {
  AGE_CATEGORY_OPTIONS,
  CLUB_OPTIONS,
  GENDER_OPTIONS,
  NATIONALITY_OPTIONS,
  NATIONAL_TEAM_OPTIONS,
  WEAPON_OPTIONS,
} from '../constants/options';
import { createAddPlayerSchema, type AddPlayerFormValues } from '../schemas/addPlayerSchema';

const EMPTY_VALUES: AddPlayerFormValues = {
  name: '',
  club: '',
  birthDate: '',
  weapon: '',
  gender: '',
  ageCategory: '',
  rating: '',
  nationality: '',
  nationalTeam: '',
  contractStart: '',
  contractEnd: '',
  attachmentUri: undefined,
  attachmentType: undefined,
  attachmentSize: undefined,
};

export default function AddPlayerForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = useMemo(() => createAddPlayerSchema(t), [t]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddPlayerFormValues>({
    resolver: zodResolver(schema),
    defaultValues: EMPTY_VALUES,
  });

  const attachmentUri = watch('attachmentUri');

  const onSubmit = async (values: AddPlayerFormValues) => {
    setIsSubmitting(true);
    try {
      await submitCreateForm(
        () => createPlayer(values),
        t,
        router,
        'create.screens.addPlayer',
        'create.success.addPlayer',
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
            placeholder={t('create.placeholders.playerName')}
            error={errors.name?.message}
          />
        )}
      />

      <FormRow>
        <Controller
          control={control}
          name="birthDate"
          render={({ field: { onChange, value } }) => (
            <FormDateField
              flex
              label={t('create.fields.birthDate')}
              required
              value={value}
              onChange={onChange}
              placeholder={t('create.datePlaceholder')}
              error={errors.birthDate?.message}
              maximumDate={new Date()}
            />
          )}
        />
        <Controller
          control={control}
          name="club"
          render={({ field: { onChange, value } }) => (
            <FormSelectField
              flex
              label={t('create.fields.club')}
              required
              value={value}
              onChange={onChange}
              placeholder={t('create.placeholders.club')}
              options={CLUB_OPTIONS}
              error={errors.club?.message}
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
              placeholder={t('create.placeholders.gender')}
              options={GENDER_OPTIONS}
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
          name="rating"
          render={({ field: { onChange, value } }) => (
            <FormTextField
              flex
              label={t('create.fields.rating')}
              required
              value={value}
              onChangeText={onChange}
              placeholder={t('create.placeholders.rating')}
              keyboardType="numeric"
              error={errors.rating?.message}
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
          name="nationalTeam"
          render={({ field: { onChange, value } }) => (
            <FormSelectField
              flex
              label={t('create.fields.nationalTeam')}
              required
              value={value}
              onChange={onChange}
              placeholder={t('create.placeholders.nationalTeam')}
              options={NATIONAL_TEAM_OPTIONS}
              error={errors.nationalTeam?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="nationality"
          render={({ field: { onChange, value } }) => (
            <FormSelectField
              flex
              label={t('create.fields.nationality')}
              required
              value={value}
              onChange={onChange}
              placeholder={t('create.placeholders.nationality')}
              options={NATIONALITY_OPTIONS}
              error={errors.nationality?.message}
            />
          )}
        />
      </FormRow>

      <FormRow>
        <Controller
          control={control}
          name="contractEnd"
          render={({ field: { onChange, value } }) => (
            <FormDateField
              flex
              label={t('create.fields.contractEnd')}
              required
              value={value}
              onChange={onChange}
              placeholder={t('create.datePlaceholder')}
              error={errors.contractEnd?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="contractStart"
          render={({ field: { onChange, value } }) => (
            <FormDateField
              flex
              label={t('create.fields.contractStart')}
              required
              value={value}
              onChange={onChange}
              placeholder={t('create.datePlaceholder')}
              error={errors.contractStart?.message}
            />
          )}
        />
      </FormRow>

      <FormUploadField
        variant="accent"
        label={t('create.fields.passportPhoto')}
        required
        uri={attachmentUri}
        error={errors.attachmentUri?.message}
        typesHint={t('create.passport.types')}
        panelTitle={t('create.passport.title')}
        panelHint={t('create.passport.hint')}
        onChange={(file) => {
          setValue('attachmentUri', file.uri, { shouldValidate: true });
          setValue('attachmentType', file.type, { shouldValidate: true });
          setValue('attachmentSize', file.size, { shouldValidate: true });
        }}
      />

      <View className="mt-6">
        <PrimaryButton
          title={t('create.submit.addPlayer')}
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
        />
      </View>
    </View>
  );
}
