import React, { useState } from "react";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = (error, errorInfo) => {
    console.error("Error caught by error boundary:", error, errorInfo);
    setHasError(true);
  };

  return (
    <ErrorBoundary onError={handleError} onReset={() => setHasError(false)}>
      {hasError ? (
        <div>Error occurred. Please check the console for details.</div>
      ) : (
        children
      )}
    </ErrorBoundary>
  );
};

export default ErrorBoundary;
