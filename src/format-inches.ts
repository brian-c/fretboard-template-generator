const MAX_DENOMINATOR = 32;
const DECIMAL_PLACES = 5;

const fractions = {
  [(1/8).toFixed(DECIMAL_PLACES).split('.')[1]]: '⅛',
  [(1/4).toFixed(DECIMAL_PLACES).split('.')[1]]: '¼',
  [(3/8).toFixed(DECIMAL_PLACES).split('.')[1]]: '⅜',
  [(1/2).toFixed(DECIMAL_PLACES).split('.')[1]]: '½',
  [(5/8).toFixed(DECIMAL_PLACES).split('.')[1]]: '⅝',
  [(3/4).toFixed(DECIMAL_PLACES).split('.')[1]]: '¾',
  [(7/8).toFixed(DECIMAL_PLACES).split('.')[1]]: '⅞'
};

function getGcd(numerator: number, denominator: number): number {
  return denominator !== 0 ? getGcd(denominator, numerator % denominator) : numerator;
}

function reduce(numerator: number, denominator: number): string {
  const gcd = getGcd(numerator, denominator);
  return [numerator / gcd, denominator / gcd].join('/');
}

for (let i = 1; i < MAX_DENOMINATOR; i += 1) {
  const key = (i / MAX_DENOMINATOR).toFixed(DECIMAL_PLACES).split('.')[1];

  if (fractions[key] === undefined) {
    fractions[key] = reduce(i, MAX_DENOMINATOR);
  }
}

export default function(number: number): string {
  const [whole, fraction] = number.toFixed(DECIMAL_PLACES).split('.');

  if (fraction in fractions) {
    return `${whole}${fractions[fraction].length === 1 ? '' : '+'}${fractions[fraction]}`;
  } else {
    return number.toString();
  }
}
