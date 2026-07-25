import {
  useCallback,
  useMemo,
  useState,
} from 'react';

function useLogin(onLogin) {
  const [email, setEmail] = useState('');
  const [password, setPassword] =
    useState('');

  const isValidEmail = useCallback(
    (value) => {
      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      return emailPattern.test(value);
    },
    [],
  );

  const enableSubmit = useMemo(
    () =>
      isValidEmail(email) &&
      password.length >= 8,
    [email, password, isValidEmail],
  );

  const handleChangeEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [],
  );

  const handleChangePassword =
    useCallback((event) => {
      setPassword(event.target.value);
    }, []);

  const handleLoginSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (!enableSubmit) {
        return;
      }

      onLogin(email, password);
    },
    [
      email,
      password,
      enableSubmit,
      onLogin,
    ],
  );

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
