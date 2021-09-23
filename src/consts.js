export const FILM_DESCRIPTION_MAX_LENGTH = 140;
export const EXTRA_FILM_LIST_CARD_COUNT = 2;

export const COMMENT_EMOJIES = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

export const SHOW_MORE_BUTTON_STEP = 5;

export const SORT_TYPE = {
  default: 'default',
  byDate: 'by-date',
  byRating: 'by-rating',
};

export const USER_ACTION = {
  updateFilm: 'updateFilm',
  addComment: 'addComment',
  deleteComment: 'deleteComment',
};

export const UPDATE_TYPE = {
  patch: 'patch',
  minor: 'minor',
  major: 'major',
  init:  'init',
};

export const FILTER_TYPE = {
  ALL: 'All movies',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites',
  STATS: 'Stats',
};

export const NO_FILM_TEXT_TYPE = {
  [FILTER_TYPE.ALL]: 'There are no movies in our database',
  [FILTER_TYPE.WATCHLIST]: 'There are no movies to watch now',
  [FILTER_TYPE.HISTORY]: 'There are no watched movies now',
  [FILTER_TYPE.FAVORITES]: 'There are no favorite movies now',
};

export const PROFILE_RANK = {
  novice: {
    rank: 'novice',
    from: 1,
    to: 10,
  },
  fan: {
    rank: 'fan',
    from: 11,
    to: 20,
  },
  movieBuff: {
    rank: 'movieBuff',
    from: 21,
    to: Infinity,
  },
};

export const STATS_FILTER_TYPE = {
  ALL: 'all-time',
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

export const FILM_DURATION_TYPE = {
  HOURS: 'hours',
  MINUTES: 'minutes',
};

export const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
  INIT: 'INIT',
};

export const DATA_TYPE = {
  MOVIES: 'movies',
  COMMENTS: 'comments',
};

export const AUTHORIZATION = 'Basic hS3sd4dfSwcl1sa3j';
export const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';
