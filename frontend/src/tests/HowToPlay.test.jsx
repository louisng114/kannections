import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HowToPlay from '../components/HowToPlay';

describe('HowToPlay Component', () => {
  test('renders without crashing', () => {
    render(
      <HowToPlay />
    );
  });
  
  it("matches snapshot", function() {
    const {asFragment} = render(
      <HowToPlay />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('initially does not display how-to-play content', () => {
    render(<HowToPlay />);
    
    // Assert that the overlay content is not visible initially
    expect(screen.queryByText('How to Play')).not.toBeInTheDocument();
  });

  test('displays how-to-play content when the icon is clicked', () => {
    render(<HowToPlay />);
    
    // Find the FontAwesome icon and click it
    const icon = screen.getByLabelText('How to play');
    fireEvent.click(icon);

    // Assert that the overlay content is visible after clicking the icon
    expect(screen.getByText('How to Play')).toBeInTheDocument();
    expect(screen.getByText('Each Kanji belongs to one of four categories.')).toBeInTheDocument();
  });

  test('hides how-to-play content when clicking outside the content', () => {
    render(<HowToPlay />);
    
    // Open the overlay
    const icon = screen.getByLabelText('How to play');
    fireEvent.click(icon);
    
    // Click the overlay (outside content)
    const overlay = screen.getByText('How to Play').closest('.overlay');
    fireEvent.click(overlay);

    // Assert that the overlay content is not visible after clicking the overlay
    expect(screen.queryByText('How to Play')).not.toBeInTheDocument();
  });

  test('does not hide how-to-play content when clicking inside the content', () => {
    render(<HowToPlay />);
    
    // Open the overlay
    const icon = screen.getByLabelText('How to play');
    fireEvent.click(icon);
    
    // Click inside the how-to-play content
    const content = screen.getByText('How to Play');
    fireEvent.click(content);

    // Assert that the overlay content is still visible after clicking inside the content
    expect(screen.getByText('How to Play')).toBeInTheDocument();
  });
});
