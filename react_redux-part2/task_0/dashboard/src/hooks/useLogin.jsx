import { useState } from 'react';

function useLogin(onLogin = () => {}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] =
    useState('');

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const enableSubmit =
    emailRegex.test(email)
    && password.length >= 8;

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    if (!enableSubmit) {
      return;
    }

    onLogin(email, password);
  };

  return {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit,
  };
}

export default useLogin;
