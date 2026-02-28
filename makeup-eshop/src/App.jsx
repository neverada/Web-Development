import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/header';
import './index.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  const simulateLogin = () => {
    setUser({ name: 'Sarah', email: 'sarah@example.com' });
  };

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header user={user} onLogout={handleLogout} />
        
        <main className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-primary text-center mb-4">
            Header Component Test
          </h1>
          
          <div className="flex justify-center gap-4 mb-8">
            {!user ? (
              <button 
                onClick={simulateLogin}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-accent transition-colors duration-300 font-medium"
              >
                Simulate Login (Test)
              </button>
            ) : (
              <p className="text-typography">
                ✅ Logged in as <strong className="text-primary">{user.name}</strong>
              </p>
            )}
          </div>

          <div className="text-center text-typography">
            <h2 className="text-xl font-semibold mb-4">✅ Step 2 Checklist:</h2>
            <ul className="space-y-2">
              <li>☐ Header is sticky at top</li>
              <li>☐ Logo shows "GlamourBeauty"</li>
              <li>☐ Navigation links visible on desktop</li>
              <li>☐ Login/Sign Up buttons show when logged out</li>
              <li>☐ User greeting + Logout shows when logged in</li>
              <li>☐ Hamburger menu appears on mobile (resize browser)</li>
              <li>☐ Mobile menu opens/closes on click</li>
            </ul>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;