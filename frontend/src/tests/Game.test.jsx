import { render, screen, waitFor } from '@testing-library/react';
import Game from '../components/Game';
import '@testing-library/jest-dom';
import { AuthProvider } from '../context/AuthContext';

// Mock data
const mockCategories = [
  {
    category: "Kanji with 5 strokes",
    kanji: ['四', '本', '右', '外'],
  },
  {
    category: "Number Kanji",
    kanji: ['七', '五', '三', '千'],
  },
  {
    category: "Kanji with ョ in its On'yomi",
    kanji: ['食', '女', '生', '上'],
  },
  {
    category: "Kanji used in verb ending in る",
    kanji: ['中', '見', '出', '入'],
  }
];

// Mock the fetchKanji module
vi.mock('../helpers/fetchKanji', () => {
  return {
    default: vi.fn(() => Promise.resolve(mockCategories))
  };
});

describe('Game Component', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear any previous mocks
  });

  test('renders loading state initially', () => {
    // Arrange
    const { container } = render(
      <AuthProvider>
        <Game jlpt={5} />
      </AuthProvider>
    );
    
    // Assert
    expect(container.querySelector('.loading')).toBeInTheDocument();
  });

  test('fetches categories and renders them on load', async () => {
    // Act
    render(
      <AuthProvider>
        <Game jlpt={5} />
      </AuthProvider>
    );

    // Wait for the categories to be fetched and rendered
    await waitFor(() => {
      mockCategories.forEach((category) => {
        // Assert
        expect(screen.getByText(category.category)).toBeInTheDocument();
        category.kanji.forEach((kanji) => {
          expect(screen.getByText(kanji)).toBeInTheDocument();
        });
      });
    });
  });
});