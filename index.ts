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

  const count = chars.split('').filter((x) => wordUnique.indexOf(x) > 0).length;
  logger.debug('existsAllChars', word, chars, count, chars.length == count);
  return chars.length == count;
};

const notExistAnyChar = (word: string, chars: string): boolean => {
  const wordUnique = word.split('').filter(onlyUnique);

  const count = chars.split('').filter((x) => wordUnique.indexOf(x) > 0).length;
  logger.debug('notExistAnyChar', word, chars, count, count == 0);
  return count == 0;
};

const filterMask = (word: string, mask: string): boolean => {
  const wordChars = word.split('');
  const maskChars = mask.split('');

  for (let i = 0; i < word.length; i++) {
    if (maskChars[i] == '_') {
      continue;
    } else {
      if (wordChars[i] != maskChars[i]) {
        return false;
      }
    }
  }
  return true;
};

const filtered = words
  .filter(onlyUnique)
  .sort()
  .filter((x) => x.length == 5)
  .filter((x) => x == 'janta' || x == 'pasta')
  .filter(
    (x) =>
      existsAllChars(x, 'ta') &&
      notExistAnyChar(x, 'uiej') &&
      filterMask(x, '___ta')
  );

logger.info('result', filtered);
