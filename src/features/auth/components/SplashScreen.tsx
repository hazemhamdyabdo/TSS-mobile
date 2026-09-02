import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";

const splashLogo = require("@/assets/images/auth/splash-logo.png");

export default function SplashScreen() {
  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={["top", "bottom"]}
    >
      <StatusBar style="dark" />
      <View className="flex-1 items-center justify-center">
        <View className="size-[269px] overflow-hidden rounded-full">
          <Image
            source={splashLogo}
            style={{ width: 269, height: 269 }}
            contentFit="contain"
          />
        </View>
      </View>
    </ScreenSafeAreaView>
  );
}
