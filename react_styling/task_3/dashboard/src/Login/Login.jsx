import WithLogging from '../HOC/WithLogging';

function Login() {
  return (
    <div
      className="App-body min-h-[420px] border-t-4 border-main px-10 pt-5 text-xl"
    >
      <p className="mb-8">
        Login to access the full dashboard
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        <label htmlFor="email">Email:</label>

        <input
          type="email"
          id="email"
          name="email"
          className="h-8 w-52 rounded border border-gray-600 px-2"
        />

        <label htmlFor="password">Password:</label>

        <input
          type="password"
          id="password"
          name="password"
          className="h-8 w-52 rounded border border-gray-600 px-2"
        />

        <button
          type="button"
          className="rounded border border-gray-600 px-1"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default WithLogging(Login);
