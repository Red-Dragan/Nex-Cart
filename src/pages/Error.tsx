import React from "react";
import { useRouteError, isRouteErrorResponse, Link } from "react-router";
import styles from "../styles/Error.module.css";

const ErrorPage: React.FC = () => {
  const error = useRouteError();

  // Check if error is a Response object with status code
  if (isRouteErrorResponse(error)) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <div className={styles.iconWrapper}>
            {error.status === 404 ? (
              <div className={styles.errorIconText}>
                <span className={styles.emojiIcon}>⚠️</span>
                <span className={styles.errorCode}>404</span>
              </div>
            ) : (
              <div className={styles.errorIconText}>
                <span className={styles.emojiIcon}>⚠️</span>
              </div>
            )}
          </div>

          <h1 className={styles.errorTitle}>
            {error.status === 404
              ? "Page Not Found"
              : "Oops! Something Went Wrong"}
          </h1>

          <p className={styles.errorStatus}>Error {error.status}</p>

          <p className={styles.errorMessage}>
            {error.statusText || error.data || "An unexpected error occurred"}
          </p>

          <div className={styles.actions}>
            <Link to="/" className={styles.homeButton}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Home
            </Link>
            <button
              onClick={() => window.location.reload()}
              className={styles.retryButton}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M1 4V10H7M23 20V14H17M20.49 9C19.84 7.3 18.66 5.84 17.1 4.84C15.54 3.84 13.68 3.36 11.78 3.46C9.88 3.56 8.06 4.24 6.6 5.4C5.14 6.56 4.1 8.14 3.63 9.92M3.51 15C4.16 16.7 5.34 18.16 6.9 19.16C8.46 20.16 10.32 20.64 12.22 20.54C14.12 20.44 15.94 19.76 17.4 18.6C18.86 17.44 19.9 15.86 20.37 14.08"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle regular JavaScript errors
  if (error instanceof Error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <div className={styles.iconWrapper}>
            <svg className={styles.errorIcon} viewBox="0 0 200 200" fill="none">
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="#FF3F6C"
                strokeWidth="4"
                fill="#FFF5F7"
              />
              <path
                d="M70 80L100 110L130 80"
                stroke="#FF3F6C"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M70 120L100 150L130 120"
                stroke="#FF3F6C"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className={styles.errorTitle}>Application Error</h1>

          <p className={styles.errorMessage}>{error.message}</p>

          {import.meta.env.MODE === "development" && (
            <details className={styles.errorDetails}>
              <summary>Error Details (Development Only)</summary>
              <pre className={styles.errorStack}>{error.stack}</pre>
            </details>
          )}

          <div className={styles.actions}>
            <Link to="/" className={styles.homeButton}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Home
            </Link>
            <button
              onClick={() => window.location.reload()}
              className={styles.retryButton}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M1 4V10H7M23 20V14H17M20.49 9C19.84 7.3 18.66 5.84 17.1 4.84C15.54 3.84 13.68 3.36 11.78 3.46C9.88 3.56 8.06 4.24 6.6 5.4C5.14 6.56 4.1 8.14 3.63 9.92M3.51 15C4.16 16.7 5.34 18.16 6.9 19.16C8.46 20.16 10.32 20.64 12.22 20.54C14.12 20.44 15.94 19.76 17.4 18.6C18.86 17.44 19.9 15.86 20.37 14.08"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fallback for unknown error types
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <div className={styles.iconWrapper}>
          <svg className={styles.errorIcon} viewBox="0 0 200 200" fill="none">
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke="#FF3F6C"
              strokeWidth="4"
              fill="#FFF5F7"
            />
            <text
              x="100"
              y="120"
              fontSize="80"
              textAnchor="middle"
              fill="#FF3F6C"
              fontWeight="bold"
            >
              ?
            </text>
          </svg>
        </div>

        <h1 className={styles.errorTitle}>Unknown Error</h1>

        <p className={styles.errorMessage}>
          Something unexpected happened. Please try again.
        </p>

        <div className={styles.actions}>
          <Link to="/" className={styles.homeButton}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
