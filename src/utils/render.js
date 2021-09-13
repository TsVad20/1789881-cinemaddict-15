import AbstractView from '../view/abstract.js';

export const renderPosition = {
  afterBegin: 'afterbegin',
  beforeEnd: 'beforeend',
  afterEnd: 'afterend',
};

export const render = (container, child, place) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (child instanceof AbstractView) {
    child = child.getElement();
  }
  switch (place) {
    case renderPosition.afterBegin:
      container.prepend(child);
      break;
    case renderPosition.beforeEnd:
      container.append(child);
      break;
    case renderPosition.afterEnd:
      container.after(child);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const remove = (component) => {
  if (component === null) {
    return;
  }
  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof AbstractView) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};

export const showPopup = (parent, child) => {
  if (child instanceof AbstractView) {
    child = child.getElement();
  }
  document.body.classList.add('hide-overflow');
  parent.appendChild(child);
};
export const hidePopup = (parent, child) => {
  if (child instanceof AbstractView) {
    child = child.getElement();
  }
  document.body.classList.remove('hide-overflow');
  parent.removeChild(child);
};
