import { render } from '@testing-library/react';
import Login from './Login';

test('renders Login without crashing', () => {
  render(<Login />);
});
