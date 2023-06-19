import React, { useState, useEffect } from "react";

function Error(props) {
  const [hasError, setHasError] = useState(false);

  const refresh = () => (window.location.href = "/");

  useEffect(() => {
    const handleErrors = () => {
      setHasError(true);
    };

    window.addEventListener("error", handleErrors);

    return () => {
      window.removeEventListener("error", handleErrors);
    };
  }, []);

  if (hasError) {
    return (
      <div className="error-page">
        <div className="error-content">
          <h1 className="error-title">Ooops</h1>
          <p className="error-subtitle">Something went wrong</p>
          <button className="error-btn" onClick={refresh}>
            Back Home
          </button>
        </div>
      </div>
    );
  }

  return props.children;
}

export default Error;
