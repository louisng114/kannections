import { render } from '@testing-library/react';
import App from '../App';
import { AuthProvider } from '../context/AuthContext';

test('renders without crashing', () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
});

it("matches snapshot", function() {
  const {asFragment} = render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );
  expect(asFragment()).toMatchSnapshot();
});
