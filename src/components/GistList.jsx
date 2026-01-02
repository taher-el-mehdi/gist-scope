import React from 'react';
import { formatDate } from '../utils/helpers';

/**
 * Gist list component - displays filtered and searchable list of gists
 */
export default function GistList({ 
  gists, 
  onSelectGist, 
  selectedGistId, 
  totalGists, 
  currentPage, 
  totalPages, 
  onPageChange 
}) {
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisible = 7;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ← Previous
        </button>

        {startPage > 1 && (
          <>
            <button
              className="pagination-page"
              onClick={() => onPageChange(1)}
            >
              1
            </button>
            {startPage > 2 && <span className="pagination-ellipsis">...</span>}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            className={`pagination-page ${currentPage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="pagination-ellipsis">...</span>}
            <button
              className="pagination-page"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next →
        </button>
      </div>
    );
  };

  if (gists.length === 0) {
    return (
      <div className="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <h3>No gists found</h3>
        <p>Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <>
      <div className="gist-list-header">
        <span className="gist-count">
          Showing {gists.length > 0 ? ((currentPage - 1) * 20 + 1) : 0}-{Math.min(currentPage * 20, totalGists)} of {totalGists} gists
        </span>
      </div>
      <div className="gist-list">
        {gists.map((gist) => {
          const files = Object.values(gist.files);
          const mainFile = files[0];
          const fileCount = files.length;

          return (
            <div
              key={gist.id}
              className={`gist-item ${selectedGistId === gist.id ? 'selected' : ''}`}
              onClick={() => onSelectGist(gist)}
            >
              <div className="gist-header">
                <h3 className="gist-filename">
                  {mainFile.filename}
                  {fileCount > 1 && (
                    <span className="file-count">+{fileCount - 1} more</span>
                  )}
                </h3>
                <span className="gist-date">{formatDate(gist.updated_at)}</span>
              </div>

              {gist.description && (
                <p className="gist-description">{gist.description}</p>
              )}

              <div className="gist-files">
                {files.slice(0, 3).map((file) => (
                  <span key={file.filename} className="file-tag">
                    {file.language || getExtension(file.filename)}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {renderPagination()}
    </>
  );
}

function getExtension(filename) {
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop() : 'txt';
}
