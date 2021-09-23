import {FILM_DURATION_TYPE, FILTER_TYPE, PROFILE_RANK, STATS_FILTER_TYPE} from '../consts.js';
import {filter} from './filter.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import isToday from 'dayjs/plugin/isToday';
dayjs.extend(duration);
dayjs.extend(isBetween);
dayjs.extend(isToday);

export const getRating = (films) => {
  const rating = filter[FILTER_TYPE.HISTORY](films).length;
  if ((rating>=PROFILE_RANK.novice.from)&&(rating<=PROFILE_RANK.novice.to)) {
    return PROFILE_RANK.novice.rank;
  }
  if ((rating>=PROFILE_RANK.fan.from)&&(rating<=PROFILE_RANK.fan.to)) {
    return PROFILE_RANK.fan.rank;
  }
  if ((rating>=PROFILE_RANK.movieBuff.from)&&(rating<PROFILE_RANK.movieBuff.to)) {
    return PROFILE_RANK.movieBuff.rank;
  }
  return '';
};

export const getWatchedFilmsInRange = (films, dateFrom, dateTo, target) =>
  films.reduce((filmsInRange, film) => {
    if (target===STATS_FILTER_TYPE.ALL) {
      filmsInRange.push(film);
      return filmsInRange;
    }
    if (target===STATS_FILTER_TYPE.TODAY && dayjs(film.usersDetails.watchingDate).isToday()) {
      filmsInRange.push(film);
      return filmsInRange;
    }
    if (dayjs(film.usersDetails.watchingDate).isBetween(dateFrom, dateTo, null, [])) {
      filmsInRange.push(film);
    }
    return filmsInRange;
  }, []);


export const getOverallFilmsDuration = (films, type) => {
  const totalDuration = films.reduce((totalTime, film) => totalTime + film.filmDuration, 0);
  if (type===FILM_DURATION_TYPE.HOURS) {
    const hours = dayjs.duration(totalDuration, 'm').asHours();
    return Math.floor(hours);
  }
  return dayjs.duration(totalDuration, 'm').minutes();
};

export const getAllGenres = (films) => films.reduce((genre, film) => [...genre, ...film.filmGenres], []);

export const getCountOfGenres = (allGenres) => allGenres.reduce( (total, ganre) => {
  total[ganre] = (total[ganre] || 0) + 1 ;
  return total;
} , {});

export const getTopGenre = (genres) => Object.keys(genres).reduce((max, current) => (genres[max] > genres[current]) ? max : current);

export const getSortGenreKeys = (genres) => Object.keys(genres).sort((a,b) => genres[b]-genres[a]);

export const getSortGenreValues = (genres) => Object.values(genres).sort((a,b) => b-a);

export const getDateFrom = (type) => {
  const countAgo = 1;
  return dayjs().subtract(countAgo, type).toDate();
};

