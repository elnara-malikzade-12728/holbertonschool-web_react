import WithLogging from '../HOC/WithLogging';

function Login() {
  return (
    <div
      className="
        App-body
        mt-4
        border-t-2
        border-main
        px-2
        py-6
        text-[13px]
        min-[520px]:px-3
        min-[520px]:text-[12px]
        min-[912px]:text-[10px]
      "
    >
      <p className="mb-6">Login to access the full dashboard</p>

      <form
        className="
          flex
          w-full
          flex-col
          items-start
          gap-3
          min-[520px]:gap-2
          min-[912px]:flex-row
          min-[912px]:items-center
        "
      >
        <label htmlFor="email" className="flex flex-col gap-1 min-[912px]:flex-row min-[912px]:items-center">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            className="
              h-6
              w-32
              rounded-sm
              border
              border-gray-400
              px-1
              text-[12px]
              min-[912px]:ml-1
              min-[912px]:h-5
              min-[912px]:w-28
              min-[912px]:text-[10px]
            "
          />
        </label>

        <label htmlFor="password" className="flex flex-col gap-1 min-[912px]:flex-row min-[912px]:items-center">
          Password:
          <input
            type="password"
            id="password"
            name="password"
            className="
              h-6
              w-32
              rounded-sm
              border
              border-gray-400
              px-1
              text-[12px]
              min-[912px]:ml-1
              min-[912px]:h-5
              min-[912px]:w-28
              min-[912px]:text-[10px]
            "
          />
        </label>

        <button
          type="submit"
          className="
            h-6
            rounded-sm
            border
            border-gray-400
            px-3
            text-[12px]
            min-[912px]:h-5
            min-[912px]:px-2
            min-[912px]:text-[10px]
          "
        >
          OK
        </button>
      </form>
    </div>
  );
}

export default WithLogging(Login);
