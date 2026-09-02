import { useLocalSearchParams } from 'expo-router';

import OtpScreen from '@/features/auth/components/OtpScreen';

export default function OtpRoute() {
  const { phone } = useLocalSearchParams<{ phone: string }>();

  return <OtpScreen phone={phone ?? ''} />;
}
