import WithLogging from '../HOC/WithLogging';

function Login() {
  return (
    <div
      className="
        App-body
        flex-1
        border-t-2
        border-main
        p-4
        text-[10px]
      "
    >
      <p className="mb-4 text-sm">
        Login to access the full dashboard
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        <label htmlFor="email">Email:</label>

        <input
          type="email"
          id="email"
          name="email"
          className="h-6 w-36 border border-gray-400 px-2 text-sm"
        />

        <label htmlFor="password">Password:</label>

        <input
          type="password"
          id="password"
          name="password"
          className="h-6 w-36 border border-gray-400 px-2 text-sm"
        />

        <button
          type="button"
          className="rounded border border-gray-400 px-3 py-1 text-sm"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default WithLogging(Login);
