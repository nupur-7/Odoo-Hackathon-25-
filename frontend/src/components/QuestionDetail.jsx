
import React, { useState } from 'react';
import Notifications from './Notifications';
import { useParams } from 'react-router-dom';
import './QuestionDetail.css';




export default function QuestionDetail() {
  const { id } = useParams();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [answerText, setAnswerText] = useState('');
  const [voteCount, setVoteCount] = useState(null);
  const [answerVotes, setAnswerVotes] = useState([]);

  // Dummy questions and answers (should be shared in a real app)
  const QUESTIONS = [
    {
      id: 1,
      title: 'How to join 2 columns in a data set to make a separate column in SQL?',
      description:
        'I do not know the code for it as I am a beginner. For example, I have first column as first name, second column as last name, and I want to join them into full name.',
      tags: ['SQL', 'Join'],
      author: 'John Doe',
      votes: 15,
      answers: [
        { id: 1, text: 'Use the JOIN operator. Try SELECT with INNER JOIN between tables.', author: 'Alice', votes: 2 },
        { id: 2, text: 'You can also use the CONCAT() function in SQL for combining columns.', author: 'Bob', votes: 1 },
      ],
    },
    {
      id: 2,
      title: 'React useState not updating immediately after setState',
      description:
        "I'm trying to update state in React but the value doesn't change immediately. I've tried using useEffect but still facing issues …",
      tags: ['React', 'JavaScript', 'useState'],
      author: 'Jane Smith',
      votes: 8,
      answers: [
        { id: 1, text: 'Try using useEffect to track state changes.', author: 'Charlie', votes: 3 },
        { id: 2, text: 'State updates are asynchronous, so batching may delay updates.', author: 'Dana', votes: 1 },
      ],
    },
    {
      id: 3,
      title: 'Best practices for API error handling in Node.js',
      description:
        'What are the recommended approaches for handling errors in REST APIs built with Node.js and Express? Should I use try–catch …',
      tags: ['Node.js', 'Express', 'API'],
      author: 'Mike Johnson',
      votes: 23,
      answers: [
        { id: 1, text: 'Use middleware for centralized error handling.', author: 'Eve', votes: 2 },
        { id: 2, text: 'Try-catch blocks are useful for async/await code.', author: 'Frank', votes: 1 },
      ],
    },
    {
      id: 4,
      title: 'CSS Grid vs Flexbox: When to use which?',
      description: 'Can someone explain the differences between CSS Grid and Flexbox with examples?',
      tags: ['CSS', 'Grid', 'Flexbox'],
      author: 'Sarah Wilson',
      votes: 31,
      answers: [
        { id: 1, text: 'Grid is best for 2D layouts, Flexbox for 1D layouts.', author: 'Grace', votes: 4 },
        { id: 2, text: 'Use Grid for complex layouts, Flexbox for simple alignment.', author: 'Henry', votes: 2 },
      ],
    },
    {
      id: 5,
      title: 'Python dictionary comprehension with nested conditions',
      description: 'How can I create a dictionary with multiple conditions in a clean way?',
      tags: ['Python', 'Dictionary'],
      author: 'Alex Chen',
      votes: 5,
      answers: [
        { id: 1, text: 'Use if-else inside the comprehension for conditions.', author: 'Ivy', votes: 1 },
        { id: 2, text: 'Consider using filter() for complex logic.', author: 'Jack', votes: 0 },
      ],
    },
  ];

  const question = QUESTIONS.find(q => q.id === Number(id));
  React.useEffect(() => {
    if (question) {
      setVoteCount(question.votes);
      setAnswerVotes(question.answers.map(a => a.votes || 0));
    }
  }, [question]);
  if (!question) return <div className="detail-container">Question not found.</div>;

  const handleUpvote = () => {
    setVoteCount((prev) => prev + 1);
    setShowLoginPrompt(true);
    setTimeout(() => setShowLoginPrompt(false), 2000);
  };
  const handleDownvote = () => {
    setVoteCount((prev) => prev - 1);
    setShowLoginPrompt(true);
    setTimeout(() => setShowLoginPrompt(false), 2000);
  };

  const handleAnswerUpvote = (idx) => {
    setAnswerVotes((prev) => prev.map((v, i) => i === idx ? v + 1 : v));
    setShowLoginPrompt(true);
    setTimeout(() => setShowLoginPrompt(false), 2000);
  };
  const handleAnswerDownvote = (idx) => {
    setAnswerVotes((prev) => prev.map((v, i) => i === idx ? v - 1 : v));
    setShowLoginPrompt(true);
    setTimeout(() => setShowLoginPrompt(false), 2000);
  };

  return (
    <div className="detail-container">
      {/* Header/Navbar */}
      <header className="header" style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, background: '#fff', zIndex: 10 }}>
        <h1 className="logo">StackIt</h1>
        <input
          type="text"
          className="search"
          placeholder="Search questions..."
          style={{ marginLeft: '20px', marginRight: '20px' }}
        />
        <button className="ask-btn">Ask Question</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Notifications userId={1} />
          </div>
          <span className="icon" style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#4B2991', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5em' }}>👤</span>
        </div>
      </header>

      <nav className="breadcrumb">Home &gt; {question.title.slice(0, 25)}...</nav>

      <h2 className="question-title">{question.title}</h2>

      <div className="question-description">{question.description}</div>

      <div className="tags-row">
        {question.tags.map(tag => (
          <span className="tag" key={tag}>{tag}</span>
        ))}
      </div>

      <div className="meta">asked by <span className="author">{question.author}</span></div>

      <hr />

      <h3>Answers</h3>

      {question.answers.map((ans, idx) => (
        <div key={ans.id} className="answer-box">
          <div className="answer-votes" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <button className="vote-btn" onClick={() => handleAnswerUpvote(idx)} title="Upvote">⬆️</button>
            <span className="vote-count" style={{ fontWeight: 'bold' }}>{answerVotes[idx]}</span>
            <button className="vote-btn" onClick={() => handleAnswerDownvote(idx)} title="Downvote">⬇️</button>
            <span style={{ color: '#888' }}>votes</span>
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
