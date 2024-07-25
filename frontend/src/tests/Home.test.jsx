import { render } from '@testing-library/react';
import Home from '../components/Home';
import { AuthProvider } from '../context/AuthContext';

test('renders without crashing', () => {
  render(
    <AuthProvider>
        <Home />
    </AuthProvider>
  );
});

it("matches snapshot", function() {
  const {asFragment} = render(
      <AuthProvider>
        <Home />
      </AuthProvider>
    );
  expect(asFragment()).toMatchSnapshot();
});
