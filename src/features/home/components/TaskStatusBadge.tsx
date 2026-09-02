import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { cairo } from '@/theme/typography';

import type { TaskStatus } from '../types';

type TaskStatusBadgeProps = {
  status: TaskStatus;
};

export default function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const { t } = useTranslation();

  switch (status) {
    case 'new':
      return (
        <View className="h-[13px] items-center justify-center rounded-3xl bg-primary/10 px-1.5">
          <Text className="text-[8px] text-primary" style={{ fontFamily: cairo.medium }}>
            {t('home.taskStatus.new')}
          </Text>
        </View>
      );
    case 'pendingReview':
      return (
        <View className="h-[13px] items-center justify-center rounded-3xl bg-pending-50 px-1.5">
          <Text className="text-[8px] text-pending" style={{ fontFamily: cairo.medium }}>
            {t('home.taskStatus.pendingReview')}
          </Text>
        </View>
      );
    case 'completed':
      return (
        <View className="h-[13px] items-center justify-center rounded-3xl bg-info/10 px-1.5">
          <Text className="text-[8px] text-info" style={{ fontFamily: cairo.medium }}>
            {t('home.taskStatus.completed')}
          </Text>
        </View>
      );
    default: {
      const exhaustive: never = status;
      throw new Error(`Unhandled task status: ${exhaustive}`);
    }
  }
}
