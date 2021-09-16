export const FILM_DESCRIPTION_MAX_LENGTH = 140;
export const MAIN_FILM_LIST_CARD_COUNT = 5;
export const EXTRA_FILM_LIST_CARD_COUNT = 2;
export const FILM_CARD_COUNT = 20;
export const FILM_COMMENTS_MAX_COUNT = 5;
export const FILM_DESCRIPTIONS = [
  'The bounty hunter captured a dangerous criminal, sentenced to death in absentia. Now he accompanies her to a half-abandoned town to bring her to justice.',
  'His character is the antagonist of the hero Brad Pitt, an American military man who led a gang of cold-blooded killers in Europe to fight fascism. "Inglourious Basterds" - a parody of films about the war, a black comedy about the Second World War and the SS troops.',
  'Vincent Vega and Jules Winfield are bandits from the Marcellus Wallace gang. They rob people, carry out the bloody tasks of their boss, and in between "job duties" they chat and tell each other stories from life.',
  'The heroine of Uma Thurman, nicknamed Black Mamba, is a hired killer who decides to quit with a criminal past and start a normal family, get married, have a child. But the day that was supposed to be the happiest in her life suddenly turns into a terrible nightmare: former “colleagues”, led by Bill, the boss of their gang, come to the wedding.',
  'The action takes place on the eve of the American Civil War, in 1859. Former dentist and now bounty hunter King Schultz frees slave Django.',
];
export const FILM_POSTERS = [
  'the-dance-of-life.jpg',
  'sagebrush-trail.jpg',
  'the-man-with-the-golden-arm.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'popeye-meets-sinbad.png',
];
export const FILM_TITLES = [
  'The Dance of Life',
  'Sagebrush Trail',
  'The Man with the Golden Arm',
  'Santa Claus Conquers the Martians',
  'Popeye the Sailor Meets Sindbad the Sailor',
];
export const FILM_GENRES = [
  'Musical',
  'Western',
  'Drama',
  'Comedy',
  'Cartoon',
];
export const COMMENT_EMOJIES = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];
export const COMMENT_TEXTS = [
  'Interesting setting and a good cast',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
];
export const COMMENT_AUTHORS = [
  'John Doe',
  'Tim Macoveev',
  'Vasya Pupkin',
];
export const FILM_DIRECTORS = [
  'Federico Fellini',
  'David Lynch',
  'Jim Jarmusch',
  'Stanley Kubrick',
  'Steven Spielberg',
];
export const FILM_WRITERS = [
  'Paul Savage',
  'Veena Sud',
  'Matt Sazama',
  'Richard Side',
  'Michael Sucsy',
];
export const FILM_ACTORS = [
  'Pamela Anderson',
  'Mandy Moore',
  'Paula Abdul',
  'Christina Aguilera',
  'Beverly Adams',
];
export const FILM_COUNTRIES = [
  'USA',
  'CANADA',
  'GERMANY',
  'FRANCE',
  'ITALY',
];
export const FILM_AGES = [
  '6+',
  '12+',
  '16+',
  '18+',
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
