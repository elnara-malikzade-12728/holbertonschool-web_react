import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockAxios from 'jest-mock-axios';
import App from './App';

const notificationsData = [
  {
    id: 1,
    type: 'default',
    value: 'New course available',
  },
  {
    id: 2,
    type: 'urgent',
    value: 'New resume available',
  },
  {
    id: 3,
    type: 'urgent',
    html: {
      __html: '',
    },
  },
];

const coursesData = [
  {
    id: 1,
    name: 'ES6',
    credit: 60,
  },
  {
    id: 2,
    name: 'Webpack',
    credit: 20,
  },
  {
    id: 3,
    name: 'React',
    credit: 40,
  },
];

const respondWithNotifications = async () => {
  await act(async () => {
    mockAxios.mockResponseFor(
      {
        url: '/notifications.json',
      },
      {
        data: notificationsData,
      },
    );
  });
};

const respondWithCourses = async () => {
  await act(async () => {
    mockAxios.mockResponseFor(
      {
        url: '/courses.json',
      },
      {
        data: coursesData,
      },
    );
  });
};

describe('App component', () => {
  afterEach(() => {
    mockAxios.reset();
    jest.restoreAllMocks();
  });

  test('renders Login by default', () => {
    render(<App />);

    expect(
      screen.getByText(
        /login to access the full dashboard/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByText('ES6'),
    ).not.toBeInTheDocument();

    expect(
      document.querySelector('#logoutSection'),
    ).not.toBeInTheDocument();
  });

  test('displays the notifications drawer by default', () => {
    render(<App />);

    expect(
      document.querySelector(
        '.notification-items',
      ),
    ).toBeInTheDocument();
  });

  test('hides the notifications drawer when close is clicked', () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole('button', {
        name: /close/i,
      }),
    );

    expect(
      document.querySelector(
        '.notification-items',
      ),
    ).not.toBeInTheDocument();
  });

  test('displays the notifications drawer when the title is clicked', () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole('button', {
        name: /close/i,
      }),
    );

    expect(
      document.querySelector(
        '.notification-items',
      ),
    ).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByText(
        /your notifications/i,
      ),
    );

    expect(
      document.querySelector(
        '.notification-items',
      ),
    ).toBeInTheDocument();
  });

  test('retrieves notifications when App initially loads', async () => {
    render(<App />);

    expect(mockAxios.get).toHaveBeenCalledWith(
      '/notifications.json',
    );

    await respondWithNotifications();

    expect(
      await screen.findByText(
        /new course available/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /new resume available/i,
      ),
    ).toBeInTheDocument();
  });

  test('retrieves courses when App initially loads', async () => {
    render(<App />);

    expect(mockAxios.get).toHaveBeenCalledWith(
      '/courses.json',
    );

    await respondWithCourses();
  });

  test('retrieves courses whenever the user state changes', async () => {
    const user = userEvent.setup();

    render(<App />);

    await respondWithCourses();

    const initialCoursesRequests =
      mockAxios.get.mock.calls.filter(
        ([url]) => url === '/courses.json',
      );

    expect(initialCoursesRequests).toHaveLength(1);

    await user.type(
      screen.getByLabelText(/email/i),
      'student@example.com',
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'password123',
    );

    await user.click(
      screen.getByDisplayValue('OK'),
    );

    await waitFor(() => {
      const coursesRequests =
        mockAxios.get.mock.calls.filter(
          ([url]) => url === '/courses.json',
        );

      expect(coursesRequests).toHaveLength(2);
    });

    await respondWithCourses();
  });

  test('updates the user state after successful login', async () => {
    const user = userEvent.setup();

    render(<App />);

    await respondWithCourses();

    const emailInput =
      screen.getByLabelText(/email/i);

    const passwordInput =
      screen.getByLabelText(/password/i);

    await user.type(
      emailInput,
      'student@example.com',
    );

    await user.type(
      passwordInput,
      'password123',
    );

    await user.click(
      screen.getByDisplayValue('OK'),
    );

    await respondWithCourses();

    expect(
      await screen.findByText('ES6'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Webpack'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('React'),
    ).toBeInTheDocument();

    expect(
      document.querySelector('#logoutSection'),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /welcome student@example\.com/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: /contact us/i,
      }),
    ).toBeInTheDocument();
  });

  test('clears the user state after logout', async () => {
    const user = userEvent.setup();

    render(<App />);

    await respondWithCourses();

    await user.type(
      screen.getByLabelText(/email/i),
      'student@example.com',
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'password123',
    );

    await user.click(
      screen.getByDisplayValue('OK'),
    );

    await respondWithCourses();

    await user.click(
      screen.getByText(/\(logout\)/i),
    );

    await respondWithCourses();

    expect(
      screen.getByText(
        /login to access the full dashboard/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByText('ES6'),
    ).not.toBeInTheDocument();

    expect(
      document.querySelector('#logoutSection'),
    ).not.toBeInTheDocument();

    expect(
      screen.getByLabelText(/email/i),
    ).toHaveValue('');

    expect(
      screen.getByLabelText(/password/i),
    ).toHaveValue('');

    expect(
      screen.queryByRole('link', {
        name: /contact us/i,
      }),
    ).not.toBeInTheDocument();
  });

  test('removes a notification and logs its ID when clicked', async () => {
    const logSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    render(<App />);

    await respondWithNotifications();

    expect(
      await screen.findByText(
        /new course available/i,
      ),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByText(
        /new course available/i,
      ),
    );

    expect(
      screen.queryByText(
        /new course available/i,
      ),
    ).not.toBeInTheDocument();

    expect(logSpy).toHaveBeenCalledWith(
      'Notification 1 has been marked as read',
    );
  });
});