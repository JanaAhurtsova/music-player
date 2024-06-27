interface CSSProps {
  visibility: 'visible' | 'hidden';
  opacity: number;
}

export const hideElement = (isPlay: boolean) => {
  const cssStyles: CSSProps = {
    visibility: isPlay ? 'visible' : 'hidden',
    opacity: isPlay ? 1 : 0,
  };
  return cssStyles;
};
