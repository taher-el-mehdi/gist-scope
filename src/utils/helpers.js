/**
 * Utility helper functions
 */

/**
 * Get file extension from filename
 */
export function getExtension(filename) {
  if (!filename) return 'txt';
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop().toLowerCase() : 'txt';
}

/**
 * Categorize gists by file extension
 * Returns array of {extension, count} sorted by count descending
 */
export function categorizeGists(gists) {
  const extensionMap = new Map();

  gists.forEach((gist) => {
    const files = Object.values(gist.files);
    const extensions = new Set();

    files.forEach((file) => {
      const ext = getExtension(file.filename);
      extensions.add(ext);
    });

    extensions.forEach((ext) => {
      extensionMap.set(ext, (extensionMap.get(ext) || 0) + 1);
    });
  });

  return Array.from(extensionMap.entries())
    .map(([extension, count]) => ({ extension, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Filter gists by category (extension)
 */
export function filterGistsByCategory(gists, category) {
  if (!category) return gists;

  return gists.filter((gist) => {
    const files = Object.values(gist.files);
    return files.some((file) => getExtension(file.filename) === category);
  });
}

/**
 * Search gists by description or filename
 */
export function searchGists(gists, searchTerm) {
  if (!searchTerm) return gists;

  const term = searchTerm.toLowerCase();

  return gists.filter((gist) => {
    // Search in description
    if (gist.description && gist.description.toLowerCase().includes(term)) {
      return true;
    }

    // Search in filenames
    const files = Object.values(gist.files);
    return files.some((file) => 
      file.filename.toLowerCase().includes(term)
    );
  });
}

/**
 * Format date to relative time or formatted string
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  // Less than a minute
  if (diffInSeconds < 60) {
    return 'just now';
  }

  // Less than an hour
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }

  // Less than a day
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }

  // Less than a week
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }

  // Less than a month
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  }

  // Format as date
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

/**
 * Store GitHub token in localStorage
 */
export function storeToken(token) {
  localStorage.setItem('github_token', token);
}

/**
 * Retrieve GitHub token from localStorage
 */
export function getStoredToken() {
  return localStorage.getItem('github_token');
}

/**
 * Remove GitHub token from localStorage
 */
export function clearToken() {
  localStorage.removeItem('github_token');
}
