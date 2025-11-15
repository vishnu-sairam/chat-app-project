// frontend/src/components/AnswerFeedback.js
import React, { useState } from 'react';

const AnswerFeedback = ({ answerId }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
      setDisliked(false);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      setLiked(false);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <button
        onClick={handleLike}
        className={`p-1 rounded transition-colors ${
          liked
            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
        }`}
        aria-label="Like"
      >
        👍
      </button>
      <button
        onClick={handleDislike}
        className={`p-1 rounded transition-colors ${
          disliked
            ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
        }`}
        aria-label="Dislike"
      >
        👎
      </button>
    </div>
  );
};

export default AnswerFeedback;

