import WithLogging from '../HOC/WithLogging';

function Login() {
  return (
    <div
      className="
        App-body
        flex-1
        border-t-2
        border-main
        px-[10px]
        py-[10px]
        text-[10px]
        min-[912px]:text-[8px]
      "
    >
      <p
        className="
          mb-4
          text-[10px]
          min-[520px]:mb-3
          min-[912px]:mb-2
          min-[912px]:text-[8px]
        "
      >
        Login to access the full dashboard
      </p>

      <form
        className="
          flex
          w-full
          flex-col
          items-start
          gap-3

          min-[520px]:flex-row
          min-[520px]:flex-wrap
          min-[520px]:items-center
          min-[520px]:gap-2
        "
      >
        <label
          htmlFor="email"
          className="
            flex
            w-full
            flex-col
            gap-1

            min-[520px]:w-auto
            min-[520px]:flex-row
            min-[520px]:items-center
          "
        >
          Email:

          <input
            type="email"
            id="email"
            name="email"
            className="
              h-7
              w-40
              rounded
              border
              border-gray-400
              px-2
              text-[10px]

              min-[520px]:ml-1
              min-[912px]:h-4
              min-[912px]:w-28
              min-[912px]:text-[8px]
            "
          />
        </label>

        <label
          htmlFor="password"
          className="
            flex
            w-full
            flex-col
            gap-1

            min-[520px]:w-auto
            min-[520px]:flex-row
            min-[520px]:items-center
          "
        >
          Password:

          <input
            type="password"
            id="password"
            name="password"
            className="
              h-7
              w-40
              rounded
              border
              border-gray-400
              px-2
              text-[10px]

              min-[520px]:ml-1
              min-[912px]:h-4
              min-[912px]:w-28
              min-[912px]:text-[8px]
            "
          />
        </label>

        <button
          type="submit"
          className="
            flex
            h-7
            w-auto
            items-center
            justify-center
            rounded
            border
            border-gray-400
            px-3
            text-[10px]

            min-[912px]:h-4
            min-[912px]:px-2
            min-[912px]:text-[8px]
          "
        >
          OK
        </button>
      </form>
    </div>
  );
}

export default WithLogging(Login);
