import React, { useEffect, useState } from "react";

const AnswerVoteCount = ({ answerId }) => {
  const [votes, setVotes] = useState({ up: 0, down: 0 });

  useEffect(() => {
    fetch(`http://localhost:5000/api/votes/${answerId}`)
      .then((res) => res.json())
      .then((data) => setVotes({ up: data.upvotes, down: data.downvotes }))
      .catch((err) => console.error("Vote fetch failed", err));
  }, [answerId]);

  return (
    <div style={{ fontSize: "14px", marginTop: "4px" }}>
      👍 {votes.up} | 👎 {votes.down}
    </div>
  );
};

export default AnswerVoteCount;
