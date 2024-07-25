import { render } from '@testing-library/react';
import HowToPlay from '../components/HowToPlay';

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
