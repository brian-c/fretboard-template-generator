export interface FretboardState {
  frets?: string | number;
  firstScaleLength?: string | number;
  secondScaleLength?: string | number;
  multiscale?: boolean;
  perpendicularAt?: string | number;
  metric?: boolean;
  pageWidth?: string | number;
  pageHeight?: string | number;
  pageMargin?: string | number;
}

const presets = {
  DEFAULT: <FretboardState>{
    frets: 24,
    firstScaleLength: 25+1/2,
    secondScaleLength: 24,
    multiscale: false,
    perpendicularAt: 1/2,
    metric: false,
    pageWidth: 8+1/2,
    pageHeight: 11,
    pageMargin: 1/2,
  },
};

export default presets;
