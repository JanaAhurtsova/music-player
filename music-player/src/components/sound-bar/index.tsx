import { ChangeEvent, FC, memo, useState } from 'react';
import Mute from '../../assets/svg/volume-cross-svgrepo-com.svg?react';
import Volume from '../../assets/svg/volume-loud-svgrepo-com.svg?react';
import './style.css';

interface Props {
  onMute: () => void;
  onLoud: () => void;
  onChangeVolume: (value: string) => void;
}

export const VolumeBar: FC<Props> = memo((props) => {
  const [volume, setVolume] = useState('50');

  const onChangeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    props.onChangeVolume(e.target.value);
    setVolume(e.target.value);
  };

  return (
    <div className="volume-bar">
      <button onClick={props.onMute}>
        <Mute />
      </button>
      <input
        className="volume-bar__input"
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={onChangeVolume}
      />
      <button onClick={props.onLoud}>
        <Volume />
      </button>
    </div>
  );
});
