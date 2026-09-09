import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { useEvent } from 'expo';
import { Image } from 'expo-image';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import { RTL_CONTAINER_STYLE, RTL_TEXT_STYLE } from '@/localization/direction';
import { colors } from '@/theme/colors';
import { cairo } from '@/theme/typography';

import { LIVE_DEMO_VIDEO, LIVE_VIDEO_POSTER } from '../constants/dummy';

type LiveVideoPlayerProps = {
  viewerCount: number;
};

export default function LiveVideoPlayer({ viewerCount }: LiveVideoPlayerProps) {
  const { t } = useTranslation();
  const videoRef = useRef<VideoView>(null);
  const player = useVideoPlayer(LIVE_DEMO_VIDEO, (instance) => {
    instance.loop = true;
  });
  const { isPlaying } = useEvent(player, 'playingChange', {
    isPlaying: player.playing,
  });

  const togglePlayback = () => {
    if (player.playing) {
      player.pause();
      return;
    }
    player.play();
  };

  return (
    <View className="h-[200px] w-full overflow-hidden rounded-lg bg-accent">
      <VideoView
        ref={videoRef}
        player={player}
        style={{ width: '100%', height: 200 }}
        contentFit="cover"
        nativeControls={false}
        fullscreenOptions={{ enable: true }}
      />

      {!isPlaying ? (
        <Image
          pointerEvents="none"
          source={LIVE_VIDEO_POSTER}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
          contentFit="cover"
        />
      ) : null}

      <View
        pointerEvents="box-none"
        className="absolute inset-0 items-center justify-center"
      >
        {!isPlaying ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('live.video.play')}
            onPress={togglePlayback}
            className="size-12 items-center justify-center rounded-full border-2 border-primary bg-white/20"
          >
            <MaterialDesignIcons
              name="play"
              size={28}
              color={colors.primary}
            />
          </Pressable>
        ) : (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('live.video.pause')}
            onPress={togglePlayback}
            className="absolute inset-0"
          />
        )}

        <View
          pointerEvents="box-none"
          className="absolute bottom-3 left-3 right-3 flex-row items-center justify-end gap-2"
          style={RTL_CONTAINER_STYLE}
        >
          <View
            className="h-[25px] flex-row items-center gap-1 rounded-[34px] bg-white/80 px-2"
            style={RTL_CONTAINER_STYLE}
          >
            <Text
              className="text-xs text-primary"
              style={{ fontFamily: cairo.regular, ...RTL_TEXT_STYLE }}
            >
              {t('live.video.viewers', { count: viewerCount })}
            </Text>
            <MaterialDesignIcons
              name="eye-outline"
              size={16}
              color={colors.primary}
            />
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('live.video.fullscreen')}
            onPress={() => {
              void videoRef.current?.enterFullscreen();
            }}
            className="h-[25px] w-8 items-center justify-center rounded-[34px] bg-white/80"
          >
            <MaterialDesignIcons
              name="fullscreen"
              size={14}
              color={colors.accent}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
