import WithLogging from '../HOC/WithLogging';

function Login() {
  return (
    <div className="App-body min-h-[318px] border-t-[3px] border-main px-1 pt-4 text-sm min-[912px]:min-h-[420px] min-[912px]:border-t-4 min-[912px]:px-10 min-[912px]:pt-5 min-[912px]:text-xl">
      <p className="mb-6 min-[912px]:mb-8">Login to access the full dashboard</p>
      <form className="flex flex-col items-start gap-1 min-[520px]:flex-row min-[520px]:flex-wrap min-[520px]:items-center min-[520px]:gap-2" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="email" className="flex flex-col min-[520px]:flex-row min-[520px]:items-center min-[520px]:gap-2">
          Email
          <input type="email" id="email" name="email" className="h-6 w-[180px] max-w-full rounded-[3px] border border-gray-600 px-1 min-[912px]:h-8 min-[912px]:w-52" />
        </label>
        <label htmlFor="password" className="flex flex-col min-[520px]:flex-row min-[520px]:items-center min-[520px]:gap-2">
          Password
          <input type="password" id="password" name="password" className="h-6 w-[180px] max-w-full rounded-[3px] border border-gray-600 px-1 min-[912px]:h-8 min-[912px]:w-52" />
        </label>
        <button type="submit" className="rounded-[3px] border border-gray-600 px-1">OK</button>
      </form>
    </div>
  );
}

export default WithLogging(Login);
