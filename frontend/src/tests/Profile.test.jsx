import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from '../components/Profile';
import MockAuthProvider from './MockAuthProvider';

// Mock data for testing
const mockUser = {
  username: 'testuser',
  totalWins: 2,
  perfectWins: 1,
  achievements: ['w1', 'p1'],
};

const mockAchievements = [
  { code: 'w1', name: 'First Win!', description: 'Win a game' },
  { code: 'w3', name: 'More Wins!', description: 'Win a total of three games' },
  { code: 'p1', name: 'First Perfect Win!', description: 'Win a perfect game' },
];


// Mock KannectionsApi methods
vi.mock('../helpers/api', () => ({
  default: {
    getUser: vi.fn(() => Promise.resolve(mockUser)),
    getAllAchievements: vi.fn(() => Promise.resolve(mockAchievements)),
  },
}));

describe('Profile Component', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear mocks before each test
  });

  test('renders loading state initially', () => {
    render(
      <MockAuthProvider user={mockUser}>
        <Profile />
      </MockAuthProvider>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test('displays user data and achievements correctly', async () => {
    render(
      <MockAuthProvider user={mockUser}>
        <Profile />
      </MockAuthProvider>
    );

    // Wait for the data to be loaded and displayed
    await waitFor(() => {
      // Check if user data is displayed correctly
      expect(screen.getByText(mockUser.username)).toBeInTheDocument();
      expect(screen.getByText(`Total Wins: ${mockUser.totalWins}`)).toBeInTheDocument();
      expect(screen.getByText(`Perfect Wins: ${mockUser.perfectWins}`)).toBeInTheDocument();

      // Check if achievements are displayed
      mockAchievements.forEach((achievement) => {
        expect(screen.getByText(achievement.name)).toBeInTheDocument();
        expect(screen.getByText(achievement.description)).toBeInTheDocument();

        // Check if achieved achievements are styled correctly
        const nameCell = screen.getByText(achievement.name);
        const descriptionCell = screen.getByText(achievement.description);

        if (mockUser.achievements.includes(achievement.code)) {
          expect(nameCell).toHaveClass('achieved');
          expect(descriptionCell).toHaveClass('achieved');
        } else {
          expect(nameCell).not.toHaveClass('achieved');
          expect(descriptionCell).not.toHaveClass('achieved');
        }
      });
    });
  });
});
