import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Alert, View } from 'react-native';

import PrimaryButton from '@/components/ui/PrimaryButton';

import { createReferee } from '../api';
import {
  ENTITY_OPTIONS,
  REFEREE_CATEGORY_OPTIONS,
  REGION_OPTIONS,
  WEAPON_OPTIONS,
} from '../constants/options';
import { createAddRefereeSchema, type AddRefereeFormValues } from '../schemas/addRefereeSchema';
import FormSelectField from './FormSelectField';
import FormTextField from './FormTextField';
import FormUploadField from './FormUploadField';

const EMPTY_VALUES: AddRefereeFormValues = {
  name: '',
  category: '',
  weapon: '',
  region: '',
  entity: '',
  attachmentUri: undefined,
  attachmentType: undefined,
  attachmentSize: undefined,
};

export default function AddRefereeForm() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = useMemo(() => createAddRefereeSchema(t), [t]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddRefereeFormValues>({
    resolver: zodResolver(schema),
    defaultValues: EMPTY_VALUES,
  });

  const attachmentUri = watch('attachmentUri');

  const onSubmit = async (values: AddRefereeFormValues) => {
    setIsSubmitting(true);
    try {
      await createReferee(values);
      Alert.alert(t('create.screens.addReferee'), t('create.success.addReferee'), [
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
            placeholder={t('create.placeholders.refereeName')}
            error={errors.name?.message}
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
            placeholder={t('create.placeholders.refereeCategory')}
            options={REFEREE_CATEGORY_OPTIONS}
            error={errors.category?.message}
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
      <Controller
        control={control}
        name="region"
        render={({ field: { onChange, value } }) => (
          <FormSelectField
            label={t('create.fields.region')}
            required
            value={value}
            onChange={onChange}
            placeholder={t('create.placeholders.regionRiyadh')}
            options={REGION_OPTIONS}
            error={errors.region?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="entity"
        render={({ field: { onChange, value } }) => (
          <FormSelectField
            label={t('create.fields.entity')}
            required
            value={value}
            onChange={onChange}
            placeholder={t('create.placeholders.entity')}
            options={ENTITY_OPTIONS}
            error={errors.entity?.message}
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
          title={t('create.submit.addReferee')}
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
        />
      </View>
    </View>
  );
}
