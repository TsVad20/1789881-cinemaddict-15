export const createPopupCommentTemplate = (filmComment) => {
  const {
    commentEmoji,
    commentText,
    commentAuthor,
    commentDate,
  } = filmComment;
  return `<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="${commentEmoji}" width="55" height="55" alt="${commentEmoji}">
          </span>
          <div>
            <p class="film-details__comment-text">${commentText}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${commentAuthor}</span>
              <span class="film-details__comment-day">${commentDate}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>`;
};
