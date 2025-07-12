import React, { useState } from 'react';
import './QuestionDetail.css';

export default function QuestionDetail() {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [answerText, setAnswerText] = useState('');

  const answers = [
    {
      id: 1,
      text: 'Use the JOIN operator. Try SELECT with INNER JOIN between tables.',
      author: 'Alice',
    },
    {
      id: 2,
      text: 'You can also use the CONCAT() function in SQL for combining columns.',
      author: 'Bob',
    },
  ];

  const handleVoteClick = () => {
    setShowLoginPrompt(true);
    setTimeout(() => setShowLoginPrompt(false), 3000); // auto-hide
  };

  return (
    <div className="detail-container">
      <nav className="breadcrumb">Home &gt; How to join 2 columns...</nav>

      <h2 className="question-title">
        How to join 2 columns in a data set to make a separate column in SQL?
      </h2>

      <div className="question-description">
        I do not know the code for it as I am a beginner. For example, I have first column as first name, second column as last name, and I want to join them into full name.
      </div>

      <div className="tags-row">
        <span className="tag">SQL</span>
        <span className="tag">Join</span>
      </div>

      <div className="meta">asked by <span className="author">John Doe</span></div>

      <hr />

      <h3>Answers</h3>

      {answers.map((ans) => (
        <div key={ans.id} className="answer-box">
          <div className="vote-box" onClick={handleVoteClick}>
            ↑
          </div>
          <div className="answer-content">
            <p>{ans.text}</p>
            <small>— {ans.author}</small>
          </div>
        </div>
      ))}

      {showLoginPrompt && (
        <div className="login-popup">⚠️ Please log in to vote</div>
      )}

      <hr />

      <h3>Submit Your Answer</h3>
      <textarea
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
        placeholder="Write your answer here..."
      ></textarea>
      <button className="submit-btn">Submit</button>
    </div>
  );
}
