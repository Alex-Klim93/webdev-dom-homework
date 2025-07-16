export let comments = [];

export const updateTasks = (newTasks) => {
  comments = newTasks.map((comment) => {
    // Сохраняем предыдущее состояние isLiked, если комментарий уже был в списке
    const existingComment = comments.find((c) => c.id === comment.id);
    return {
      ...comment,
      isLikeLoading: false,
      isLiked: existingComment
        ? existingComment.isLiked
        : comment.isLiked || false,
    };
  });
};
