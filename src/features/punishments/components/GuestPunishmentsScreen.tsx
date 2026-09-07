import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import ScreenSafeAreaView from '@/components/ScreenSafeAreaView';
import CreateScreenHeader from '@/features/create/components/CreateScreenHeader';
import { RTL_CONTAINER_STYLE } from '@/localization/direction';

import { DUMMY_GUEST_PUNISHMENTS } from '../constants/dummy';
import GuestPunishmentCard from './GuestPunishmentCard';
import GuestPunishmentsEmptyState from './GuestPunishmentsEmptyState';

export default function GuestPunishmentsScreen() {
  const { t } = useTranslation();
  const punishments = DUMMY_GUEST_PUNISHMENTS;

  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={['top', 'bottom']}
      style={RTL_CONTAINER_STYLE}
    >
      <StatusBar style="auto" />
      <CreateScreenHeader title={t('punishments.title')} />

      {punishments.length === 0 ? (
        <GuestPunishmentsEmptyState />
      ) : (
        <ScrollView
          className="flex-1"
          contentContainerClassName="gap-2 px-5 pb-8 pt-2"
          showsVerticalScrollIndicator={false}
        >
          {punishments.map((punishment) => (
            <GuestPunishmentCard key={punishment.id} punishment={punishment} />
          ))}
        </ScrollView>
      )}
    </ScreenSafeAreaView>
  );
}
