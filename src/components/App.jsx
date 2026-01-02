import React, { useState, useEffect, useCallback } from 'react';
import AuthForm from './AuthForm';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import GistList from './GistList';
import GistPreview from './GistPreview';
import { GitHubAPI } from '../api/github';
import { 
  categorizeGists, 
  filterGistsByCategory, 
  searchGists,
  storeToken,
  getStoredToken,
  clearToken 
} from '../utils/helpers';
import '../styles/App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [api, setApi] = useState(null);
  
  const [gists, setGists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGist, setSelectedGist] = useState(null);
  const [selectedGistDetail, setSelectedGistDetail] = useState(null);
  const [loadingGistDetail, setLoadingGistDetail] = useState(false);
  
  const [error, setError] = useState('');
  const [loadingGists, setLoadingGists] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [gistsPerPage] = useState(20);

  // Check for stored token on mount
  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      handleAuthenticate(token, true);
    } else {
      setLoading(false);
    }
  }, []);

  const handleAuthenticate = async (token, silent = false) => {
    try {
      const githubApi = new GitHubAPI(token);
      const userData = await githubApi.verifyToken();
      
      setApi(githubApi);
      setUser(userData);
      storeToken(token);
      setAuthenticated(true);
      setError('');
      
      // Fetch gists
      await fetchGists(githubApi);
    } catch (err) {
      if (!silent) {
        throw err;
      }
      clearToken();
      setLoading(false);
    }
  };

  const fetchGists = async (githubApi) => {
    setLoadingGists(true);
    try {
      const fetchedGists = await githubApi.fetchGists();
      setGists(fetchedGists);
      
      // Categorize gists
      const cats = categorizeGists(fetchedGists);
      setCategories(cats);
      
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingGists(false);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearToken();
    setAuthenticated(false);
    setUser(null);
    setApi(null);
    setGists([]);
    setCategories([]);
    setSelectedCategory(null);
    setSearchTerm('');
    setSelectedGist(null);
    setSelectedGistDetail(null);
  };

  const handleSelectGist = async (gist) => {
    setSelectedGist(gist);
    setSelectedGistDetail(null);
    setLoadingGistDetail(true);
    
    try {
      // Fetch full gist details including file contents
      const gistDetail = await api.fetchGistDetail(gist.id);
      setSelectedGistDetail(gistDetail);
    } catch (err) {
      console.error('Error loading gist details:', err);
      setError('Failed to load gist content');
    } finally {
      setLoadingGistDetail(false);
    }
  };

  const handleClosePreview = () => {
    setSelectedGist(null);
    setSelectedGistDetail(null);
  };

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page on search
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page on category change
  };

  // Filter and search gists
  const filteredGists = searchGists(
    filterGistsByCategory(gists, selectedCategory),
    searchTerm
  );

  // Pagination
  const totalPages = Math.ceil(filteredGists.length / gistsPerPage);
  const startIndex = (currentPage - 1) * gistsPerPage;
  const endIndex = startIndex + gistsPerPage;
  const paginatedGists = filteredGists.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!authenticated) {
    return <AuthForm onAuthenticate={handleAuthenticate} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <svg className="logo" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <h1>Gist Scope</h1>
        </div>
        
        <div className="header-right">
          <span className="user-info">{user?.login}</span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={() => setError('')}>×</button>
        </div>
      )}

      <div className="app-content">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
          gistsCount={gists.length}
        />

        <main className="main-panel">
          <div className="main-header">
            <SearchBar onSearch={handleSearch} />
          </div>

          {loadingGists ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading gists...</p>
            </div>
          ) : (
            <GistList
              gists={paginatedGists}
              onSelectGist={handleSelectGist}
              selectedGistId={selectedGist?.id}
              totalGists={filteredGists.length}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </main>

        {selectedGist && (
          <GistPreview
            gist={selectedGistDetail || selectedGist}
            loading={loadingGistDetail}
            onClose={handleClosePreview}
          />
        )}
      </div>
    </div>
  );
}

export default App;
