import { Image } from 'expo-image';
import { View } from 'react-native';
import CountryFlag from 'react-native-country-flag';

const ksaFlag = require('@/assets/images/ksa-flag.png');

type PhoneCountryFlagProps = {
  iso2: string;
};

export default function PhoneCountryFlag({ iso2 }: PhoneCountryFlagProps) {
  return (
    <View className="size-6 overflow-hidden rounded-full">
      {iso2 === 'sa' ? (
        <Image source={ksaFlag} style={{ width: 24, height: 24 }} contentFit="cover" />
      ) : (
        <CountryFlag isoCode={iso2} size={15} />
      )}
    </View>
  );
}
