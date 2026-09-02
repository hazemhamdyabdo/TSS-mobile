import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, View } from 'react-native';

import PrimaryButton from '@/components/ui/PrimaryButton';

import { createClub } from '../api';
import { CLUB_CATEGORY_OPTIONS, REGION_OPTIONS } from '../constants/options';
import { createAddClubSchema, type AddClubFormValues } from '../schemas/addClubSchema';
import FormSelectField from '@/components/form/FormSelectField';
import FormTextField from '@/components/form/FormTextField';
import FormUploadField from '@/components/form/FormUploadField';

const EMPTY_VALUES: AddClubFormValues = {
  clubName: '',
  region: '',
  category: '',
  playerCount: '',
  attachmentUri: undefined,
  attachmentType: undefined,
  attachmentSize: undefined,
};

export default function AddClubForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = useMemo(() => createAddClubSchema(t), [t]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddClubFormValues>({
    resolver: zodResolver(schema),
    defaultValues: EMPTY_VALUES,
  });

  const attachmentUri = watch('attachmentUri');

  const onSubmit = async (values: AddClubFormValues) => {
    setIsSubmitting(true);
    try {
      await createClub(values);
      Alert.alert(t('create.screens.addClub'), t('create.success.addClub'), [
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
        name="clubName"
        render={({ field: { onChange, value } }) => (
          <FormTextField
            label={t('create.fields.clubName')}
            required
            value={value}
            onChangeText={onChange}
            placeholder={t('create.placeholders.clubName')}
            error={errors.clubName?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="region"
        render={({ field: { onChange, value } }) => (
          <FormSelectField
            label={t('create.fields.region')}
            required
            value={value}
            onChange={onChange}
            placeholder={t('create.placeholders.regionJeddah')}
            options={REGION_OPTIONS}
            error={errors.region?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <FormSelectField
            label={t('create.fields.category')}
            required
            value={value}
            onChange={onChange}
            placeholder={t('create.placeholders.clubCategory')}
            options={CLUB_CATEGORY_OPTIONS}
            error={errors.category?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="playerCount"
        render={({ field: { onChange, value } }) => (
          <FormTextField
            label={t('create.fields.playerCount')}
            required
            value={value}
            onChangeText={onChange}
            placeholder={t('create.placeholders.playerCount')}
            keyboardType="numeric"
            error={errors.playerCount?.message}
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
          title={t('create.submit.addClub')}
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
        />
      </View>
    </View>
  );
}
