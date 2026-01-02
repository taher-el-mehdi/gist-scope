import React, { useState } from 'react';

/**
 * Authentication form component
 * Handles GitHub token input and local storage
 */
export default function AuthForm({ onAuthenticate }) {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token.trim()) {
      setError('Please enter a GitHub token');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onAuthenticate(token.trim());
    } catch (err) {
      setError(err.message || 'Authentication failed');
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <h1>GitHub Gist Previewer</h1>
        </div>
        
        <p className="auth-description">
          Enter your GitHub Personal Access Token to view and manage your gists.
          Your token is stored locally and never sent to any server.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            className="token-input"
            disabled={loading}
          />
          
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Authenticating...' : 'Continue'}
          </button>

          {error && <div className="error-message">{error}</div>}
        </form>

        <div className="auth-help">
          <p>Need a token?</p>
          <a 
            href="https://github.com/settings/tokens/new?scopes=gist&description=Gist%20Previewer" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Create a GitHub Personal Access Token →
          </a>
          <p className="help-note">Required scope: <code>gist</code></p>
        </div>
      </div>
    </div>
  );
}
