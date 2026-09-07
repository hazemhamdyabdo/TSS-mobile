const RANK_PLAYER_IMAGES = [
  require('@/assets/images/rank-player-1.jpg'),
  require('@/assets/images/rank-player-2.jpg'),
  require('@/assets/images/rank-player-3.jpg'),
  require('@/assets/images/rank-player-4.jpg'),
  require('@/assets/images/rank-player-5.jpg'),
] as const;

/** Stable avatar pick from entry id so the same player keeps the same photo. */
export function rankPlayerImageFor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0;
  }
  return RANK_PLAYER_IMAGES[Math.abs(hash) % RANK_PLAYER_IMAGES.length];
}
