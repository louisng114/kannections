import { render } from '@testing-library/react';
import KanjiPanel from '../components/KanjiPanel';

test('renders without crashing', () => {
  render(
    <KanjiPanel />
  );
});

it("matches snapshot", function() {
  const {asFragment} = render(
    <KanjiPanel />
  );
  expect(asFragment()).toMatchSnapshot();
});
