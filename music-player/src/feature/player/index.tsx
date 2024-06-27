import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import data from '@assets/data.json';
import { Controls } from '@components/controls';
import { ProgressBar } from '@components/progress-bar';
import { VolumeBar } from '@components/sound-bar';
import { hideElement } from '@utils/hide-element';
import './style.css';
import { formatDurationDisplay } from '@utils/formatted-duration';

interface Song {
  id: number;
  title: string;
  album: string;
  song: string;
}

export const Player: FC = () => {
  const [currentSong, setCurrentSong] = useState<Song>(data[0]);
  const [isPlay, setIsPlay] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);

  const audio = useRef<HTMLAudioElement>(null);
  const cssProperties = useMemo(() => hideElement(isPlay), [isPlay]);

  useEffect(() => {
    if (currentSong && audio.current && isPlay) audio.current.play();
  }, [currentSong, isPlay]);

  const callbacks = {
    onPlay: useCallback(() => {
      setIsPlay((prev) => !prev);
      if (audio.current) {
        if (isPlay) {
          audio.current.pause();
        } else {
          audio.current.play();
        }
      }
    }, [isPlay]),
    onPrev: useCallback(() => {
      if (currentSong && currentSong.id === data[0].id) {
        setCurrentSong(data[data.length - 1]);
      } else {
        const prevSong = data.find((item) => currentSong && item.id === currentSong.id - 1);
        if (prevSong) {
          setCurrentSong(prevSong);
        }
      }
    }, [currentSong]),
    onNext: useCallback(() => {
      if (currentSong && currentSong.id === data[data.length - 1].id) {
        setCurrentSong(data[0]);
      } else {
        const nextSong = data.find((item) => currentSong && item.id === currentSong.id + 1);
        if (nextSong) {
          setCurrentSong(nextSong);
        }
      }
    }, [currentSong]),
    onMute: () => {
      if (audio.current) {
        audio.current.muted = true;
      }
    },
    onChangeVolume: (value: string) => {
      if (audio.current) {
        audio.current.volume = Number(value) / 100;
      }
    },
    onLoud: () => {
      if (audio.current) {
        audio.current.muted = false;
      }
    },
    onChangeProgress: (progress: number) => {
      if (audio.current) {
        audio.current.currentTime = progress * audio.current.duration;
        audio.current.play();
      }
    },
    onTimeUpdate: (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
      setCurrentProgress(e.currentTarget.currentTime);
    },
  };

  return (
    <div className="player">
      <Controls
        isPlay={isPlay}
        onPlay={callbacks.onPlay}
        onPrev={callbacks.onPrev}
        onNext={callbacks.onNext}
      />
      <div className="player__content">
        <VolumeBar
          onLoud={callbacks.onLoud}
          onMute={callbacks.onMute}
          onChangeVolume={callbacks.onChangeVolume}
        />
        <h3>
          {currentSong?.title} {audio.current && `- ${formatDurationDisplay(audio.current.duration)}`}
        </h3>
        <ProgressBar
          isPlay={isPlay}
          onChangeProgress={callbacks.onChangeProgress}
          duration={duration}
          currentProgress={currentProgress}
        />
        {currentSong && (
          <audio
            preload="metadata"
            ref={audio}
            src={currentSong?.song}
            onEnded={callbacks.onNext}
            onTimeUpdate={callbacks.onTimeUpdate}
            onDurationChange={(e) => setDuration(e.currentTarget.duration)}
          />
        )}
      </div>
      <div className="player__album" style={cssProperties}>
        <img className="player__cover" src={currentSong?.album} alt={currentSong?.title} />
      </div>
    </div>
  );
};
//прогресс-бар и изображение скрываются, если песня на паузе
