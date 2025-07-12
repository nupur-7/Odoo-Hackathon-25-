import React, { useState, useMemo } from 'react';
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
      <header className="header">
        <h1 className="logo">StackIt</h1>

        <input
          type="text"
          className="search"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="ask-btn">Ask Question</button>
        <span className="icon">🔔</span>
        <span className="icon">👤</span>
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
          <div key={q.id} className="question-card">
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
        ))}

        {filtered.length === 0 && (
          <div className="no-results">No questions found.</div>
        )}
      </main>
    </div>
  );
}
