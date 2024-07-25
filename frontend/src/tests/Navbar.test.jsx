import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../components/Navbar';
import MockAuthProvider from './MockAuthProvider';
import { BrowserRouter } from 'react-router-dom';

describe('Navbar Component', () => {
  it('renders without crashing', () => {
    render(
      <MockAuthProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </MockAuthProvider>
    );
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <MockAuthProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </MockAuthProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('contains the login and signup buttons when logged out', () => {
    render(
      <MockAuthProvider user={null}> {/* No user indicates logged out state */}
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </MockAuthProvider>
    );

    // Check for Log In and Sign Up buttons
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();

    // Ensure Profile and Log Out buttons are NOT visible
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    expect(screen.queryByText('Log Out')).not.toBeInTheDocument();
  });

  it('contains the profile and log out buttons when logged in', () => {
    render(
      <MockAuthProvider user={{ username: 'testUser' }}> {/* Mock logged in state */}
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </MockAuthProvider>
    );

    // Check for Profile and Log Out buttons
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Log Out')).toBeInTheDocument();

    // Ensure Log In and Sign Up buttons are NOT visible
    expect(screen.queryByText('Log In')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign Up')).not.toBeInTheDocument();
  });

  it('starts game and displays dropdown items', () => {
    render(
      <MockAuthProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </MockAuthProvider>
    );

    const gameBtn = screen.getByText('Game');
    fireEvent.click(gameBtn);

    // Ensure dropdown items are visible after clicking 'Game'
    expect(screen.getByText('JLPT 5')).toBeInTheDocument();
    expect(screen.getByText('JLPT 4')).toBeInTheDocument();
    expect(screen.getByText('JLPT 3')).toBeInTheDocument();
    expect(screen.getByText('JLPT 2')).toBeInTheDocument();
    expect(screen.getByText('JLPT 1')).toBeInTheDocument();
  });

  it('calls logout when the logout button is clicked', () => {
    const mockLogout = vi.fn();
    render(
      <MockAuthProvider user={{ username: 'testUser' }} logout={mockLogout}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </MockAuthProvider>
    );

    const logoutButton = screen.getByText('Log Out');
    fireEvent.click(logoutButton);

    // Check if logout function is called
    expect(mockLogout).toHaveBeenCalled();
  });
});