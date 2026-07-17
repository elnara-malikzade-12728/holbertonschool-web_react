import WithLogging from '../HOC/WithLogging';

function Login() {
  return (
    <div
      className="
        App-body flex-1 px-[10px] py-[10px] text-[5px] border-t-2 border-main pt-[10px]
      "
    >
      <p className="mb-4 text-[10px]">
        Login to access the full dashboard
      </p>

      <div className="flex items-center gap-1 flex-wrap">
        <label htmlFor="email">Email:</label>

        <input
          type="email"
          id="email"
          name="email"
          className="h-4 w-26 border border-gray-400 px-2 text-sm rounded"
        />

        <label htmlFor="password">Password:</label>

        <input
          type="password"
          id="password"
          name="password"
          className="h-4 w-26 border border-gray-400 px-2 text-sm rounded"
        />

        <button
          type="button"
          className="rounded border border-gray-400 px-3 py-1 text-[10px] h-4 w-4 flex items-center justify-center"
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default WithLogging(Login);
