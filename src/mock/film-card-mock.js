import {
  COMMENT_AUTHORS,
  COMMENT_EMOJIES,
  COMMENT_TEXTS,
  FILM_ACTORS,
  FILM_AGES,
  FILM_COMMENTS_MAX_COUNT,
  FILM_COUNTRIES,
  FILM_DESCRIPTIONS,
  FILM_DIRECTORS,
  FILM_GENRES,
  FILM_POSTERS,
  FILM_TITLES,
  FILM_WRITERS
} from '../consts.js';
import { generateArrayOfRandomLength, generateRandomIndexFromArray, getRandomFloat, getRandomInteger } from '../utils/common.js';
import {nanoid} from 'nanoid';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const generateFilmRating = () => getRandomFloat(0, 10);

const generateFilmDuration = () => getRandomInteger(120,240);

const generateRandomDate = (start, end) => dayjs(new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))).toJSON();// взял из stackoverflow подогнал по dayjs

const generatefilmComment = () => ({
  commentId: nanoid(),
  commentEmoji: `./images/emoji/${generateRandomIndexFromArray(COMMENT_EMOJIES)}.png`,
  commentText: generateRandomIndexFromArray(COMMENT_TEXTS),
  commentAuthor: generateRandomIndexFromArray(COMMENT_AUTHORS),
  commentDate: dayjs().add(getRandomInteger(-90, 0), 'day').format(),
});

export const generatefilmComments = () => {
  const filmCommentsCount = getRandomInteger(0, FILM_COMMENTS_MAX_COUNT);
  const filmComments = [];
  for (let i = 0; i < filmCommentsCount; i++) {
    filmComments.push(generatefilmComment());
  }
  return filmComments;
};

const generateUsersDetails = () => {
  const addedToWatchListMarker = Boolean(getRandomInteger(0, 1));
  return addedToWatchListMarker ? {
    addedToWatchlist: true,
    isArchive: false,
    watchingDate: generateRandomDate(new Date(2019, 0, 1), new Date()),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  } : {
    addedToWatchlist: false,
    isArchive: true,
    watchingDate: generateRandomDate(new Date(2019, 0, 1), new Date()),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

export const generateFilmCard = () => ({
  filmId: nanoid(),
  filmPoster: `${generateRandomIndexFromArray(FILM_POSTERS)}`,
  filmTitle: generateRandomIndexFromArray(FILM_TITLES),
  filmDescription: generateRandomIndexFromArray(FILM_DESCRIPTIONS),
  filmRating: generateFilmRating(),
  filmDuration: generateFilmDuration(),
  filmDirector: generateRandomIndexFromArray(FILM_DIRECTORS),
  filmWriters: generateRandomIndexFromArray(FILM_WRITERS),
  filmActors: generateArrayOfRandomLength(FILM_ACTORS),
  filmReleaseDate: generateRandomDate(new Date(1980, 0, 1), new Date()),
  filmCountry: generateRandomIndexFromArray(FILM_COUNTRIES),
  filmGenres: generateArrayOfRandomLength(FILM_GENRES),
  filmAge: generateRandomIndexFromArray(FILM_AGES),
  filmComments: generatefilmComments(FILM_COMMENTS_MAX_COUNT),
  usersDetails: generateUsersDetails(),
});
