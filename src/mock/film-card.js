import {
  FILM_DESCRIPTION_MAX_LENGTH,
  FILM_COMMENTS_MAX_COUNT,
  FILM_DESCRIPTIONS
} from '../consts.js';
import {
  getRandomFloat,
  getRandomInteger
} from '../utils.js';

const generateFilmTitle = () => {
  const filmTitles = [
    'The Dance of Life',
    'Sagebrush Trail',
    'The Man with the Golden Arm',
    'Santa Claus Conquers the Martians',
    'Popeye the Sailor Meets Sindbad the Sailor',
  ];

  const randomIndex = getRandomInteger(0, filmTitles.length - 1);
  return filmTitles[randomIndex];
};

export const generateFilmPoster = () => {
  const filmPosters = [
    './images/posters/the-dance-of-life.jpg',
    './images/posters/sagebrush-trail.jpg',
    './images/posters/the-man-with-the-golden-arm.jpg',
    './images/posters/santa-claus-conquers-the-martians.jpg',
    './images/posters/popeye-meets-sinbad.png',
  ];

  const randomIndex = getRandomInteger(0, filmPosters.length - 1);
  return filmPosters[randomIndex];
};

const generateFilmDescription = (filmDescriptions) => {
  const randomIndex = getRandomInteger(0, filmDescriptions.length - 1);
  return filmDescriptions[randomIndex].length > FILM_DESCRIPTION_MAX_LENGTH ? `${filmDescriptions[randomIndex].slice(0,FILM_DESCRIPTION_MAX_LENGTH-1)}(...)` : filmDescriptions[randomIndex];
};

const generateFilmRating = () => {
  const filmRating = getRandomFloat(0, 10);
  return filmRating;
};
const generateFilmYear = () => {
  const filmYear = getRandomInteger(1950, 2020);
  return filmYear;
};

const generateFilmDuration = () => {
  const filmDuration = `${getRandomInteger(0,5)}h ${getRandomInteger(0,60)}m`;
  return filmDuration;
};

const generateFilmGenres = () => {
  const filmGenres = [
    'Musical',
    'Western',
    'Drama',
    'Comedy',
    'Cartoon',
  ];
  const randomIndex = getRandomInteger(0, filmGenres.length - 1);
  return filmGenres[randomIndex];
};

const generateFilmCommentEmoji = () => {
  const commentEmojies = [
    './images/emoji/smile.png',
    './images/emoji/sleeping.png',
    './images/emoji/puke.png',
    './images/emoji/angry.png',
  ];

  const randomIndex = getRandomInteger(0, commentEmojies.length - 1);
  return commentEmojies[randomIndex];
};

const generateFilmCommentText = () => {
  const commentTexts = [
    'Interesting setting and a good cast',
    'Booooooooooring',
    'Very very old. Meh',
    'Almost two hours? Seriously?',
  ];

  const randomIndex = getRandomInteger(0, commentTexts.length - 1);
  return commentTexts[randomIndex];
};

const generateFilmCommentAuthor = () => {
  const commentAuthors = [
    'John Doe',
    'Tim Macoveev',
    'Vasya Pupkin',
  ];

  const randomIndex = getRandomInteger(0, commentAuthors.length - 1);
  return commentAuthors[randomIndex];
};

const generateFilmCommentDate = () => {
  const commentDates = [
    '2 days ago',
    'Today',
    '2019/12/31 23:59',
  ];

  const randomIndex = getRandomInteger(0, commentDates.length - 1);
  return commentDates[randomIndex];
};

const generatefilmComment = () => ({
  commentEmoji: generateFilmCommentEmoji(),
  commentText: generateFilmCommentText(),
  commentAuthor: generateFilmCommentAuthor(),
  commentDate: generateFilmCommentDate(),
});

const generatefilmComments = (commentsCount) => {
  const filmCommentsCount = getRandomInteger(0, commentsCount);
  const filmComments = [];
  for (let i = 0; i < filmCommentsCount; i++) {
    filmComments.push(generatefilmComment());
  }
  return filmComments;
};

export const generateFilmCard = () => ({
  filmPoster: generateFilmPoster(),
  filmTitle: generateFilmTitle(),
  filmDescription: generateFilmDescription(FILM_DESCRIPTIONS),
  filmRating: generateFilmRating(),
  filmYear: generateFilmYear(),
  filmDuration: generateFilmDuration(),
  filmGenre: generateFilmGenres(),
  filmComments: generatefilmComments(FILM_COMMENTS_MAX_COUNT),
});
