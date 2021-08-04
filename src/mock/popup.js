import {
  getRandomInteger
} from '../utils.js';

const generatePopupDirector = () => {
  const popupDirectors = [
    'Federico Fellini',
    'David Lynch',
    'Jim Jarmusch',
    'Stanley Kubrick',
    'Steven Spielberg',
  ];
  const randomIndex = getRandomInteger(0, popupDirectors.length - 1);
  return popupDirectors[randomIndex];
};

const generatePopupWriters = () => {
  const popupWriters = [
    'Paul Savage',
    'Veena Sud',
    'Matt Sazama',
    'Richard Side',
    'Michael Sucsy',
  ];
  const randomItem = getRandomInteger(0, popupWriters.length - 1);
  return popupWriters.slice(0, randomItem + 1);
};

const generatePopupActors = () => {
  const popupActors = [
    'Pamela Anderson',
    'Mandy Moore',
    'Paula Abdul',
    'Christina Aguilera',
    'Beverly Adams',
  ];
  const randomItem = getRandomInteger(0, popupActors.length - 1);
  return popupActors.slice(0, randomItem + 1);
};

const generatePopupCountry = () => {
  const popupCountries = [
    'USA',
    'CANADA',
    'GERMANY',
    'FRANCE',
    'ITALY',
  ];
  const randomIndex = getRandomInteger(0, popupCountries.length - 1);
  return popupCountries[randomIndex];
};

const generatePopupGenres = () => {
  const popupGenres = [
    'Musical',
    'Western',
    'Drama',
    'Comedy',
    'Cartoon',
  ];
  const randomItem = getRandomInteger(0, popupGenres.length - 1);
  return popupGenres.slice(0, randomItem + 1);
};

const generatePopupAge = () => {
  const popupAges = [
    '6+',
    '12+',
    '16+',
    '18+',
  ];
  const randomIndex = getRandomInteger(0, popupAges.length - 1);
  return popupAges[randomIndex];
};

export const generatePopupCard = () => ({
  popupDirector: generatePopupDirector(),
  popupWriters: generatePopupWriters(),
  popupActors: generatePopupActors(),
  popupReleaseDate: '30 March 1945',
  popupCountry: generatePopupCountry(),
  popupGenres: generatePopupGenres(),
  popupAge: generatePopupAge(),
});
