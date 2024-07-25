import { render } from '@testing-library/react';
import SignupForm from '../components/SignupForm';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

test('renders without crashing', () => {
  render(
    <AuthProvider>
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>
    </AuthProvider>
  );
});

it("matches snapshot", function() {
  const {asFragment} = render(
      <AuthProvider>
        <BrowserRouter>
          <SignupForm />
        </BrowserRouter>
      </AuthProvider>
    );
  expect(asFragment()).toMatchSnapshot();
});
