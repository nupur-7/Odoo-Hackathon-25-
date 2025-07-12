
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Notifications from './Notifications';
import './QuestionsPage.css';

const DUMMY_QUESTIONS = [
  {
    id: 1,
    title: 'How to join 2 columns in a data set to make a separate column in SQL?',
    description:
      'I do not know the code for it as I am a beginner. As an example, I have first Col as A and B and second Col as C and …',
    tags: ['SQL', 'Join'],
    votes: 15,
    answers: 3,
    views: 127,
    author: 'John Doe',
    askedAt: '2 hours ago',
  },
  {
    id: 2,
    title: 'React useState not updating immediately after setState',
    description:
      "I'm trying to update state in React but the value doesn't change immediately. I've tried using useEffect but still facing issues …",
    tags: ['React', 'JavaScript', 'useState'],
    votes: 8,
    answers: 5,
    views: 234,
    author: 'Jane Smith',
    askedAt: '4 hours ago',
  },
  {
    id: 3,
    title: 'Best practices for API error handling in Node.js',
    description:
      'What are the recommended approaches for handling errors in REST APIs built with Node.js and Express? Should I use try–catch …',
    tags: ['Node.js', 'Express', 'API'],
    votes: 23,
    answers: 7,
    views: 456,
    author: 'Mike Johnson',
    askedAt: '1 day ago',
  },
  {
  id: 4,
  title: 'CSS Grid vs Flexbox: When to use which?',
  description: 'Can someone explain the differences between CSS Grid and Flexbox with examples?',
  tags: ['CSS', 'Grid', 'Flexbox'],
  votes: 31,
  answers: 12,
  views: 789,
  author: 'Sarah Wilson',
  askedAt: '2 days ago',
},
{
  id: 5,
  title: 'Python dictionary comprehension with nested conditions',
  description: 'How can I create a dictionary with multiple conditions in a clean way?',
  tags: ['Python', 'Dictionary'],
  votes: 5,
  answers: 2,
  views: 89,
  author: 'Alex Chen',
  askedAt: '3 hours ago',
}
];

const TABS = ['Newest', 'Unanswered', 'Most Voted', 'Most Answers'];

export default function QuestionsPage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Newest');

  const filtered = useMemo(() => {
    let list = DUMMY_QUESTIONS.filter((q) =>
      q.title.toLowerCase().includes(search.toLowerCase())
    );

    switch (activeTab) {
      case 'Unanswered':
        list = list.filter((q) => q.answers === 0);
        break;
      case 'Most Voted':
        list = [...list].sort((a, b) => b.votes - a.votes);
        break;
      case 'Most Answers':
        list = [...list].sort((a, b) => b.answers - a.answers);
        break;
      default:
        break;
    }
    return list;
  }, [search, activeTab]);

  return (
    <div className="page">
      {/* Header */}
      <header className="header" style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, background: '#fff', zIndex: 10 }}>
        <h1 className="logo">StackIt</h1>

        <input
          type="text"
          className="search"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="ask-btn">Ask Question</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Notifications userId={1} />
          <span className="icon" style={{ fontSize: '1.7em', verticalAlign: 'middle' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" fill="#4B2991"/>
              <path d="M4 20c0-2.761 3.582-5 8-5s8 2.239 8 5" fill="#4B2991"/>
            </svg>
          </span>
        </div>
      </header>

      {/* Tabs */}
      <div className="tabs-bar">
        <h2 className="page-title">All Questions</h2>
        <div className="tabs">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={
                activeTab === tab ? 'tab active-tab' : 'tab'
              }
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <main className="questions-list">
        {filtered.map((q) => (
          <Link to={`/question/${q.id}`} key={q.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="question-card">
              <div className="metrics">
                <div className="metric">
                  <div className="metric-value">↑ {q.votes}</div>
                  <div className="metric-label">votes</div>
                </div>
                <div className="metric answered">
                  <div className="metric-value">{q.answers}</div>
                  <div className="metric-label">answers</div>
                </div>
                <div className="metric">
                  <div className="metric-value">{q.views}</div>
                  <div className="metric-label">views</div>
                </div>
              </div>

              <div className="content">
                <h3 className="question-title">{q.title}</h3>
                <p className="question-desc">{q.description}</p>
                <div className="meta-row">
                  <div className="tags">
                    {q.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="asked-by">
                    asked {q.askedAt} by{' '}
                    <span className="author">{q.author}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {filtered.length === 0 && (
          <div className="no-results">No questions found.</div>
        )}
      </main>
    </div>
  );
}
