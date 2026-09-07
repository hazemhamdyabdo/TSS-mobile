import { Image } from "expo-image";
import { Text, View } from "react-native";

import { cairo } from "@/theme/typography";

import type { NationalityCode } from "../types";

const saFlag = require("@/assets/images/ksa-rotate-flag.png");
const qaFlag = require("@/assets/images/qatr-flag.png");

const FLAG_WIDTH = 41;
const FLAG_HEIGHT = 65;

export function flagFor(code: NationalityCode) {
  switch (code) {
    case "sa":
      return saFlag;
    case "qa":
      return qaFlag;
    default: {
      const exhaustive: never = code;
      throw new Error(`Unhandled nationality: ${exhaustive}`);
    }
  }
}

export function CornerFlag({
  nationality,
  edge,
}: {
  nationality: NationalityCode;
  edge: "left" | "right";
}) {
  const isLeft = edge === "left";
  const designedForLeft = nationality === "qa";
  const shouldFlip = designedForLeft !== isLeft;

  return (
    <Image
      pointerEvents="none"
      source={flagFor(nationality)}
      contentFit="contain"
      style={{
        position: "absolute",
        top: isLeft ? -7 : -4,
        left: isLeft ? -13 : undefined,
        right: isLeft ? undefined : -8,
        width: FLAG_WIDTH,
        height: FLAG_HEIGHT,
        transform: shouldFlip ? [{ scaleX: -1 }] : undefined,
      }}
    />
  );
}

export function ScoreBox({
  score,
  winner,
}: {
  score: number;
  winner: boolean;
}) {
  return (
    <View
      className={`h-8 w-8 items-center justify-center rounded-md ${
        winner ? "bg-primary/10" : "bg-slate-100"
      }`}
    >
      <Text
        className={`text-sm ${winner ? "text-primary" : "text-slate-500"}`}
        style={{ fontFamily: cairo.medium }}
      >
        {score}
      </Text>
    </View>
  );
}
