import type { MemberCategory, MemberPhotoIndex } from "../types";

const PLAYER_PHOTOS: Record<MemberPhotoIndex, number> = {
  1: require("@/assets/images/members/player-1.png"),
  2: require("@/assets/images/members/player-2.jpg"),
  3: require("@/assets/images/members/player-3.png"),
  4: require("@/assets/images/members/player-4.png"),
  5: require("@/assets/images/members/player-5.png"),
  6: require("@/assets/images/members/player-6.png"),
};

const COACH_PHOTOS: Record<1 | 2 | 3 | 4, number> = {
  1: require("@/assets/images/members/coach-1.png"),
  2: require("@/assets/images/members/coach-2.png"),
  3: require("@/assets/images/members/coach-3.png"),
  4: require("@/assets/images/members/coach-4.png"),
};

const REFEREE_PHOTOS: Record<MemberPhotoIndex, number> = {
  1: require("@/assets/images/members/referee-1.png"),
  2: require("@/assets/images/members/referee-2.png"),
  3: require("@/assets/images/members/referee-3.png"),
  4: require("@/assets/images/members/referee-4.png"),
  5: require("@/assets/images/members/referee-5.png"),
  6: require("@/assets/images/members/referee-6.png"),
};

const ADMIN_PHOTOS: Record<1 | 2 | 3 | 4 | 5, number> = {
  1: require("@/assets/images/members/admin-1.jpg"),
  2: require("@/assets/images/members/admin-2.jpg"),
  3: require("@/assets/images/members/admin-3.png"),
  4: require("@/assets/images/members/admin-4.png"),
  5: require("@/assets/images/members/admin-5.png"),
};

export function memberPhotoSource(
  category: MemberCategory,
  photoIndex: MemberPhotoIndex,
) {
  switch (category) {
    case "player":
      return PLAYER_PHOTOS[photoIndex];
    case "coach":
      return COACH_PHOTOS[(photoIndex <= 4 ? photoIndex : 1) as 1 | 2 | 3 | 4];
    case "referee":
      return REFEREE_PHOTOS[photoIndex];
    case "administrator":
      return ADMIN_PHOTOS[
        (photoIndex <= 5 ? photoIndex : 1) as 1 | 2 | 3 | 4 | 5
      ];
    default: {
      const exhaustive: never = category;
      throw new Error(`Unhandled member category: ${exhaustive}`);
    }
  }
}
