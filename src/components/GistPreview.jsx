import React, { useState, useEffect } from 'react';
import Prism from 'prismjs';
import { marked } from 'marked';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-yaml';

/**
 * Gist preview component - displays syntax-highlighted content
 */
export default function GistPreview({ gist, loading, onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [copied, setCopied] = useState(false);

  const files = Object.values(gist.files);

  useEffect(() => {
    if (files.length > 0 && !selectedFile) {
      setSelectedFile(files[0]);
    }
  }, [gist, files, selectedFile]);

  useEffect(() => {
    // Highlight code after rendering
    Prism.highlightAll();
  }, [selectedFile]);

  const handleCopy = async () => {
    if (selectedFile && selectedFile.content) {
      try {
        await navigator.clipboard.writeText(selectedFile.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const openInGitHub = () => {
    window.open(gist.html_url, '_blank');
  };

  if (!selectedFile) {
    return null;
  }

  const isMarkdown = selectedFile.filename.endsWith('.md');
  const language = getLanguage(selectedFile.filename, selectedFile.language);
  const hasContent = selectedFile.content && selectedFile.content.length > 0;

  return (
    <div className="preview-panel">
      <div className="preview-header">
        <div className="preview-title">
          <h2>{gist.description || 'Untitled Gist'}</h2>
          <span className="preview-visibility">
            {gist.public ? 'Public' : 'Secret'}
          </span>
        </div>
        <button className="close-preview" onClick={onClose} aria-label="Close preview">
          ×
        </button>
      </div>

      {files.length > 1 && (
        <div className="file-tabs">
          {files.map((file) => (
            <button
              key={file.filename}
              className={`file-tab ${selectedFile.filename === file.filename ? 'active' : ''}`}
              onClick={() => setSelectedFile(file)}
            >
              {file.filename}
            </button>
          ))}
        </div>
      )}

      <div className="preview-actions">
        <button className="action-button" onClick={handleCopy} disabled={!hasContent || loading}>
          {copied ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
              </svg>
              {loading ? 'Loading...' : 'Copy'}
            </>
          )}
        </button>
        <button className="action-button" onClick={openInGitHub}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          Open in GitHub
        </button>
      </div>

      <div className="preview-content">
        {loading ? (
          <div className="preview-loading">
            <div className="spinner"></div>
            <p>Loading content...</p>
          </div>
        ) : !hasContent ? (
          <div className="preview-no-content">
            <p>No content available for this file</p>
          </div>
        ) : isMarkdown ? (
          <div 
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: marked(selectedFile.content) }}
          />
        ) : (
          <pre className="code-content">
            <code className={`language-${language}`}>
              {selectedFile.content}
            </code>
          </pre>
        )}
      </div>
    </div>
  );
}

function getLanguage(filename, language) {
  if (language) {
    const langMap = {
      'JavaScript': 'javascript',
      'TypeScript': 'typescript',
      'Python': 'python',
      'JSON': 'json',
      'CSS': 'css',
      'SCSS': 'scss',
      'HTML': 'html',
      'Markdown': 'markdown',
      'Shell': 'bash',
      'SQL': 'sql',
      'YAML': 'yaml',
    };
    return langMap[language] || language.toLowerCase();
  }

  const ext = filename.split('.').pop().toLowerCase();
  const extMap = {
    'js': 'javascript',
    'jsx': 'jsx',
    'ts': 'typescript',
    'tsx': 'tsx',
    'py': 'python',
    'json': 'json',
    'css': 'css',
    'scss': 'scss',
    'html': 'html',
    'md': 'markdown',
    'sh': 'bash',
    'sql': 'sql',
    'yml': 'yaml',
    'yaml': 'yaml',
    'al': 'clike',
  };
  return extMap[ext] || 'markup';
}
