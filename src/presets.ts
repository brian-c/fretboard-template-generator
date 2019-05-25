export interface InputState {
  frets: string;
  firstScaleLength: string;
  secondScaleLength: string;
  multiscale: boolean;
  perpendicularAt: string;
  metric: boolean;
  pageWidth: string;
  pageHeight: string;
  pageMargin: string;
}

export const defaultState: InputState = {
  frets: `${24}`,
  firstScaleLength: `${25+1/2}`,
  secondScaleLength: `${24}`,
  multiscale: false,
  perpendicularAt: `${1/2}`,
  metric: false,
  pageWidth: `${8+1/2}`,
  pageHeight: `${11}`,
  pageMargin: `${1/2}`,
};

export const inputPresets: Map<string, number> = new Map([
  ['Guitar (Fender standard scale)', 25+1/2],
  ['Guitar (Fender short scale)', 24],
  ['Guitar (Gibson scale)', 24+3/4],
  ['Bass guitar', 34],
  ['Bass guitar (short scale)', 30],
  ['Ukulele (soprano)', 13],
  ['Ukulele (concert)', 15],
  ['Ukulele (tenor)', 17],
  ['Ukulele (baritone)', 19],
  ['Mandolin (Gibson)', 13+7/8],
  ['Mandolin (bowlback)', 13],
  ['Violin', 12+7/8],
  ['Viola', 14+1/4],
  ['Cello', 27+3/8],
  ['Double bass (common 3/4)', 41+1/2]
]);
