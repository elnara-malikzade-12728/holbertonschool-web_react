import {
  useEffect,
  useState,
} from 'react';
import {
  useSelector,
} from 'react-redux';

function useLogin(onLogin = () => {}) {
  const isLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn,
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] =
    useState('');

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const enableSubmit =
    emailRegex.test(email)
    && password.length >= 8;

  useEffect(() => {
    if (!isLoggedIn) {
      setEmail('');
      setPassword('');
    }
  }, [isLoggedIn]);

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
