import { useState } from 'react';
import WithLogging from '../HOC/WithLogging';

function Login({
  email: initialEmail,
  password: initialPassword,
  logIn,
}) {
  const [enableSubmit, setEnableSubmit] = useState(false);

  const [formData, setFormData] = useState({
    email: initialEmail,
    password: initialPassword,
  });

  const isFormValid = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return (
      emailRegex.test(email)
      && password.length >= 8
    );
  };

  const handleChangeEmail = (event) => {
    const email = event.target.value;
    const { password } = formData;

    setFormData((previousFormData) => ({
      ...previousFormData,
      email,
    }));

    setEnableSubmit(
      isFormValid(email, password),
    );
  };

  const handleChangePassword = (event) => {
    const password = event.target.value;
    const { email } = formData;

    setFormData((previousFormData) => ({
      ...previousFormData,
      password,
    }));

    setEnableSubmit(
      isFormValid(email, password),
    );
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    logIn(
      formData.email,
      formData.password,
    );
  };

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
        onSubmit={handleLoginSubmit}
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
            value={formData.email}
            onChange={handleChangeEmail}
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
            value={formData.password}
            onChange={handleChangePassword}
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

        <input
          type="submit"
          value="OK"
          disabled={!enableSubmit}
          className="
            h-7
            w-auto
            cursor-pointer
            rounded
            border
            border-gray-400
            px-3
            text-[10px]
            disabled:cursor-not-allowed
            disabled:opacity-50
            min-[912px]:h-4
            min-[912px]:px-2
            min-[912px]:text-[8px]
          "
        />
      </form>
    </div>
  );
}

Login.defaultProps = {
  email: '',
  password: '',
  logIn: () => {},
};

export default WithLogging(Login);
