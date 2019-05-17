export interface FretboardState {
  frets?: string;
  firstScaleLength?: string;
  secondScaleLength?: string;
  multiscale?: boolean;
  perpendicularAt?: string;
  metric?: boolean;
  pageWidth?: string;
  pageHeight?: string;
  pageMargin?: string;
}

const presets = {
  DEFAULT: <FretboardState>{
    frets: `${24}`,
    firstScaleLength: `${25+1/2}`,
    secondScaleLength: `${24}`,
    multiscale: false,
    perpendicularAt: `${1/2}`,
    metric: false,
    pageWidth: `${8+1/2}`,
    pageHeight: `${11}`,
    pageMargin: `${1/2}`,
  },
};

export default presets;
