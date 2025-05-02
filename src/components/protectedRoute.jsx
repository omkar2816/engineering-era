import React from "react";

const ProtectedRoute = ({ isLoggedIn, setAuthModalOpen, children }) => {
  if (!isLoggedIn) {
    // Open the login modal if the user is not logged in
    setAuthModalOpen(true);
    return null; // Do not render the protected content
  }

  // Render the protected content if the user is logged in
  return children;
};

export default ProtectedRoute;