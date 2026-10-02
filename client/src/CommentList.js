export const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    console.log(comment.status);
    if(comment.status === "pending")
      return <li key={comment.id}>This comment is pending</li>;
    else if(comment.status === "approved")
      return <li key={comment.id}>{comment.title}</li>;
    else
      return <li key={comment.id}>This comment is rejected</li>;
  });

  return <ul>{renderedComments}</ul>;
};
