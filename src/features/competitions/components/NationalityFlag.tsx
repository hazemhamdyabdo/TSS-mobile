import { SvgXml } from "react-native-svg";

import {
  FLAG_QATAR_ICON_XML,
  FLAG_SAUDI_ARABIA_ICON_XML,
} from "../constants/nationalityFlags";
import type { NationalityCode } from "../types";

const FLAG_SIZE = 24;

function flagXmlFor(code: NationalityCode) {
  switch (code) {
    case "sa":
      return FLAG_SAUDI_ARABIA_ICON_XML;
    case "qa":
      return FLAG_QATAR_ICON_XML;
    default: {
      const exhaustive: never = code;
      throw new Error(`Unhandled nationality: ${exhaustive}`);
    }
  }
}

export default function NationalityFlag({
  nationality,
  size = FLAG_SIZE,
}: {
  nationality: NationalityCode;
  size?: number;
}) {
  return <SvgXml xml={flagXmlFor(nationality)} width={size} height={size} />;
}
