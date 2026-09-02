import type { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

import ScreenSafeAreaView from "@/components/ScreenSafeAreaView";
import { RTL_CONTAINER_STYLE } from "@/localization/direction";

import { StatusBar } from "expo-status-bar";
import CreateScreenHeader from "./CreateScreenHeader";

type CreateFormLayoutProps = {
  title: string;
  children: ReactNode;
};

export default function CreateFormLayout({
  title,
  children,
}: CreateFormLayoutProps) {
  return (
    <ScreenSafeAreaView
      className="flex-1 bg-background"
      edges={["top", "bottom"]}
      style={RTL_CONTAINER_STYLE}
    >
      <StatusBar style="dark" />
      <CreateScreenHeader title={title} />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="gap-2 px-5 pb-8 pt-2"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenSafeAreaView>
  );
}
