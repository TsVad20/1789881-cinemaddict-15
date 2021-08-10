export const renderPosition = {
  afterBegin: 'afterbegin',
  beforeEnd: 'beforeend',
  afterEnd: 'afterend',
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case renderPosition.afterBegin:
      container.prepend(element);
      break;
    case renderPosition.beforeEnd:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
// Функция генерации случайного числа из диапазона с одним знаком после запятой
export const getRandomFloat = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  return (lower + Math.random() * (upper - lower)).toFixed(1);
};
// Функция генерации случайного индекса из массива
export const generateRandomIndexFromArray = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};
// Функция генерации массива случайной длины
export const generateArrayOfRandomLength = (array) => {
  const randomItem = getRandomInteger(0, array.length - 1);
  return array.slice(0, randomItem + 1);
};
