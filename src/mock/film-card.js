import {
  COMMENT_AUTHORS,
  COMMENT_DATES,
  COMMENT_EMOJIES,
  COMMENT_TEXTS,
  FILM_ACTORS,
  FILM_AGES,
  FILM_CARD_COUNT,
  FILM_COMMENTS_MAX_COUNT,
  FILM_COUNTRIES,
  FILM_DESCRIPTIONS,
  FILM_DIRECTORS,
  FILM_GENRES,
  FILM_POSTERS,
  FILM_TITLES,
  FILM_WRITERS,
  MONTHES
} from '../consts.js';
import { generateArrayOfRandomLength, generateRandomIndexFromArray, getRandomFloat, getRandomInteger } from '../view/common.js';


const generateFilmRating = () => getRandomFloat(0, 10);

const generateFilmReleaseDate = () => {
  const filmReleaseDate = {
    filmYear: getRandomInteger(1950, 2020),
    filmMonth: generateRandomIndexFromArray(MONTHES),
    filmDay: getRandomInteger(1, 365 / 12),
  };
  return filmReleaseDate;
};
const generateFilmDuration = () => `${getRandomInteger(0,5)}h ${getRandomInteger(0,60)}m`;

const generatefilmComment = () => ({
  commentEmoji: `./images/emoji/${generateRandomIndexFromArray(COMMENT_EMOJIES)}`,
  commentText: generateRandomIndexFromArray(COMMENT_TEXTS),
  commentAuthor: generateRandomIndexFromArray(COMMENT_AUTHORS),
  commentDate: generateRandomIndexFromArray(COMMENT_DATES),
});

const generatefilmComments = (commentsCount) => {
  const filmCommentsCount = getRandomInteger(0, commentsCount);
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
    isFavorite: Boolean(getRandomInteger(0, 1)),
  } : {
    addedToWatchlist: false,
    isArchive: true,
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

export const generateFilmCard = () => ({
  filmId: getRandomInteger(1000, `10${FILM_CARD_COUNT}`),
  filmPoster: `${generateRandomIndexFromArray(FILM_POSTERS)}`,
  filmTitle: generateRandomIndexFromArray(FILM_TITLES),
  filmDescription: generateRandomIndexFromArray(FILM_DESCRIPTIONS),
  filmRating: generateFilmRating(),
  filmDuration: generateFilmDuration(),
  filmDirector: generateRandomIndexFromArray(FILM_DIRECTORS),
  filmWriters: generateRandomIndexFromArray(FILM_WRITERS),
  filmActors: generateArrayOfRandomLength(FILM_ACTORS),
  filmReleaseDate: generateFilmReleaseDate(),
  filmCountry: generateRandomIndexFromArray(FILM_COUNTRIES),
  filmGenres: generateArrayOfRandomLength(FILM_GENRES),
  filmAge: generateRandomIndexFromArray(FILM_AGES),
  filmComments: generatefilmComments(FILM_COMMENTS_MAX_COUNT),
  usersDetails: generateUsersDetails(),
});
