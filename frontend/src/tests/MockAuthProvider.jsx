import React from 'react';
import { AuthContext } from '../context/AuthContext';
import { vi } from 'vitest';

const MockAuthProvider = ({ children, user = null, logout = vi.fn() }) => {
  const defaultValue = {
    user,
    logout,
  };

  return (
    <AuthContext.Provider value={defaultValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default MockAuthProvider;
