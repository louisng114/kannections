import { render } from '@testing-library/react';
import LoginForm from '../components/LoginForm';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

test('renders without crashing', () => {
  render(
    <AuthProvider>
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    </AuthProvider>
  );
});

it("matches snapshot", function() {
  const {asFragment} = render(
      <AuthProvider>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </AuthProvider>
    );
  expect(asFragment()).toMatchSnapshot();
});
