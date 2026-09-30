export const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.title}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
