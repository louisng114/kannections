import { render } from '@testing-library/react';
import GamePage from '../components/GamePage';
import { AuthProvider } from '../context/AuthContext';

test('renders without crashing', () => {
  render(
    <AuthProvider>
        <GamePage />
    </AuthProvider>
  );
});

it("matches snapshot", function() {
  const {asFragment} = render(
      <AuthProvider>
        <GamePage />
      </AuthProvider>
    );
  expect(asFragment()).toMatchSnapshot();
});
