import { words } from './words';

function onlyUnique(value: any, index: number, self: any) {
  return self.indexOf(value) === index;
}

const debug = true;
const logger = {
  info: (...a: any[]) => console.log(...a),
  debug: (...a: any[]) => (debug ? console.log(...a) : undefined),
};

const existsAllChars = (word: string, chars: string): boolean => {
  const wordUnique = word.split('').filter(onlyUnique);

  const occurrences = chars.split('').filter((x) => wordUnique.indexOf(x) >= 0);
  logger.debug(
    'existsAllChars',
    word,
    chars,
    occurrences,
    chars.length == occurrences.length
  );
  return chars.length == occurrences.length;
};

const notExistAnyChar = (word: string, chars: string): boolean => {
  const wordUnique = word.split('').filter(onlyUnique);

  const occurrences = chars.split('').filter((x) => wordUnique.indexOf(x) >= 0);
  logger.debug(
    'notExistAnyChar',
    word,
    chars,
    occurrences,
    occurrences.length == 0
  );
  return occurrences.length <= 0;
};

const filterExistingInMask = (word: string, mask: string): boolean => {
  const wordChars = word.split('');
  const maskChars = mask.split('');

  let debugResult = '';
  let result = true;
  for (let i = 0; i < word.length; i++) {
    if (maskChars[i] == '_') {
      debugResult += '_';
      continue;
    } else {
      if (wordChars[i] != maskChars[i]) {
        debugResult += wordChars[i];
        result = false;
      } else {
        debugResult += '-';
      }
    }
  }
  logger.debug('filterExistingInMask', word, mask, debugResult, result);
  return result;
};

const filterNonExistingInMask = (word: string, mask: string): boolean => {
  const wordChars = word.split('');
  const maskChars = mask.split('');

  let debugResult = '';
  let result = true;
  for (let i = 0; i < word.length; i++) {
    if (maskChars[i] == '_') {
      debugResult += '_';
      continue;
    } else {
      if (wordChars[i] == maskChars[i]) {
        debugResult += wordChars[i];
        result = false;
      } else {
        debugResult += '-';
      }
    }
  }
  logger.debug('filterNonExistingInMask', word, mask, debugResult, result);
  return result;
};

const filtered = words
  .filter((x) => x.length == 5)
  .filter(
    (x) =>
      x == 'janta' ||
      x == 'pasta' ||
      x == 'tonta' ||
      x == 'testa' ||
      x == 'tosta'
  )
  .sort()
  .filter(onlyUnique)
  .filter(
    (x) =>
      existsAllChars(x, 'ta') &&
      notExistAnyChar(x, 'ij') &&
      filterExistingInMask(x, '___ta') &&
      filterNonExistingInMask(x, 'peu__') &&
      filterNonExistingInMask(x, 'p_a__')
  );

logger.info('result: ', filtered);
