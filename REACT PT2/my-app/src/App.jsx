import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Reusable Component: Shows a quote
function Quote({ text, author }) {
  return (
    <blockquote style={{ fontStyle: 'italic', color: '#555' }}>
      "{text}" — <strong>{author}</strong>
    </blockquote>
  );
}

// Reusable Component: Simple button
function StudyButton({ onClick, completed }) {
  return (
    <button 
      onClick={onClick}
      disabled={completed}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        background: completed ? '#4CAF50' : '#2196F3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      {completed ? '✅ Studied!' : 'I Finished a Session!'}
    </button>
  );
}

export default function App() {
  const [sessionsDone, setSessionsDone] = useState(0);
  const totalSessionsGoal = 5;
  const daysUntilECAT = 45; // Change this number!

  const quotes = [
    { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Don't stop when you're tired. Stop when you're done.", author: "David Goggins" }
  ];

  const currentQuote = quotes[sessionsDone % quotes.length];

  // Progress bar width
  const progressPercent = (sessionsDone / totalSessionsGoal) * 100;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>🚀 ECAT Countdown</h1>
      
      {/* Days Left */}
      <p><strong>Days until ECAT:</strong> {daysUntilECAT}</p>

      {/* Progress Bar */}
      <div>
        <p><strong>Daily Goal Progress:</strong> {sessionsDone} / {totalSessionsGoal} sessions</p>
        <div style={{ width: '100%', backgroundColor: '#eee', borderRadius: '4px' }}>
          <div 
            style={{ 
              width: `${progressPercent}%`, 
              height: '20px', 
              background: '#4CAF50', 
              borderRadius: '4px',
              transition: 'width 0.3s ease'
            }}
          ></div>
        </div>
      </div>

      {/* Quote */}
      <Quote text={currentQuote.text} author={currentQuote.author} />

      {/* Button */}
      <StudyButton 
        completed={sessionsDone >= totalSessionsGoal}
        onClick={() => setSessionsDone(sessionsDone + 1)}
      />

      {/* Reset Button (optional) */}
      <button 
        onClick={() => setSessionsDone(0)}
        style={{ marginTop: '10px', color: '#666', fontSize: '12px' }}
      >
        Reset Today
      </button>
    </div>
  );
}