import { FC, memo } from 'react';
import Prev from '@assets/svg/previous-svgrepo-com.svg?react';
import Play from '@assets/svg/play-stream-svgrepo-com.svg?react';
import Pause from '@assets/svg/pause-circle-svgrepo-com.svg?react';
import Next from '@assets/svg/next-svgrepo-com.svg?react';
import './style.css';

interface Props {
  isPlay: boolean;
  onPrev: () => void;
  onNext: () => void;
  onPlay: () => void;
}

export const Controls: FC<Props> = memo((props) => (
  <div className="controls">
    <button className="controls__button" onClick={props.onPrev}>
      <Prev />
    </button>
    <button className="controls__button" onClick={props.onPlay}>
      {props.isPlay ? <Play /> : <Pause />}
    </button>
    <button className="controls__button" onClick={props.onNext}>
      <Next />
    </button>
  </div>
));
