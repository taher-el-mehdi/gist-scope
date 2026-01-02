/**
 * GitHub API utility module
 * Handles all interactions with GitHub REST API v3
 */

const GITHUB_API_BASE = 'https://api.github.com';

export class GitHubAPI {
  constructor(token) {
    this.token = token;
  }

  /**
   * Fetch all gists for the authenticated user
   * @returns {Promise<Array>} Array of gist objects
   */
  async fetchGists() {
    try {
      const gists = [];
      let page = 1;
      let hasMore = true;

      // Fetch all pages (GitHub paginates at 30 per page)
      while (hasMore) {
        const response = await fetch(
          `${GITHUB_API_BASE}/gists?per_page=100&page=${page}`,
          {
            headers: {
              'Authorization': `token ${this.token}`,
              'Accept': 'application/vnd.github.v3+json'
            }
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Invalid GitHub token. Please check your token and try again.');
          }
          if (response.status === 403) {
            const rateLimitReset = response.headers.get('X-RateLimit-Reset');
            const resetDate = rateLimitReset 
              ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString()
              : 'unknown';
            throw new Error(`GitHub API rate limit exceeded. Resets at ${resetDate}.`);
          }
          throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }

        const pageData = await response.json();
        gists.push(...pageData);

        // Check if there are more pages
        hasMore = pageData.length === 100;
        page++;
      }

      return gists;
    } catch (error) {
      console.error('Error fetching gists:', error);
      throw error;
    }
  }

  /**
   * Fetch detailed content for a specific gist
   * @param {string} gistId - The gist ID
   * @returns {Promise<Object>} Detailed gist object
   */
  async fetchGistDetail(gistId) {
    try {
      const response = await fetch(`${GITHUB_API_BASE}/gists/${gistId}`, {
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch gist details: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching gist detail:', error);
      throw error;
    }
  }

  /**
   * Verify the token is valid
   * @returns {Promise<Object>} User object if token is valid
   */
  async verifyToken() {
    try {
      const response = await fetch(`${GITHUB_API_BASE}/user`, {
        headers: {
          'Authorization': `token ${this.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!response.ok) {
        throw new Error('Invalid token');
      }

      return await response.json();
    } catch (error) {
      console.error('Error verifying token:', error);
      throw error;
    }
  }
}
