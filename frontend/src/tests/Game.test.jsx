import { render } from '@testing-library/react';
import Game from '../components/Game';
import { AuthProvider } from '../context/AuthContext';

test('renders without crashing', () => {
  render(
    <AuthProvider>
        <Game />
    </AuthProvider>
  );
});

it("matches snapshot", function() {
  const {asFragment} = render(
      <AuthProvider>
        <Game />
      </AuthProvider>
    );
  expect(asFragment()).toMatchSnapshot();
});
