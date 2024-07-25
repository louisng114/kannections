import { render } from '@testing-library/react';
import Profile from '../components/Profile';
import { AuthProvider } from '../context/AuthContext';

test('renders without crashing', () => {
  render(
    <AuthProvider>
        <Profile />
    </AuthProvider>
  );
});

it("matches snapshot", function() {
  const {asFragment} = render(
      <AuthProvider>
        <Profile />
      </AuthProvider>
    );
  expect(asFragment()).toMatchSnapshot();
});
