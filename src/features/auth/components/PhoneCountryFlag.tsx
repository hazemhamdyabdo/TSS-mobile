import { Image } from 'expo-image';
import { View } from 'react-native';
import CountryFlag from 'react-native-country-flag';

const ksaFlag = require('@/assets/images/ksa-flag.png');

type PhoneCountryFlagProps = {
  iso2: string;
  size?: number;
};

export default function PhoneCountryFlag({ iso2, size = 24 }: PhoneCountryFlagProps) {
  return (
    <View className="overflow-hidden rounded-full" style={{ width: size, height: size }}>
      {iso2 === 'sa' ? (
        <Image source={ksaFlag} style={{ width: size, height: size }} contentFit="cover" />
      ) : (
        <CountryFlag isoCode={iso2} size={Math.round(size * 0.625)} />
      )}
    </View>
  );
}
