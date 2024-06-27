import { FC, memo, useMemo, useRef } from 'react';
import { hideElement } from '../../utils/hide-element';
import './style.css';

interface Props {
  onChangeProgress: (value: number) => void;
  duration: number;
  currentProgress: number;
  isPlay: boolean;
}

export const ProgressBar: FC<Props> = memo((props) => {
  const progressbar = useRef<HTMLDivElement>(null);
  const progressBarWidth = isNaN(props.currentProgress / props.duration)
    ? 0
    : props.currentProgress / props.duration;

  const onChangeProgress = (e: React.MouseEvent) => {
    const progressWidth = progressbar.current?.clientWidth;
    const clickedOffsetX = e.nativeEvent.offsetX;
    if (progressWidth) props.onChangeProgress(clickedOffsetX / progressWidth);
  };

  const cssProgressBar = useMemo(() => hideElement(props.isPlay), [props.isPlay]);

  return (
    <div
      ref={progressbar}
      className="progress-bar"
      style={cssProgressBar}
      onClick={onChangeProgress}
    >
      <div className="progress-bar_filled" style={{ width: progressBarWidth * 100 + '%' }}></div>
    </div>
  );
});
