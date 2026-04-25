import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const { login }  = useAuth();
  const navigate   = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      login(email, password);
      navigate('/');
    } catch {
      setError('Sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Background */}
      <div className="auth-page__bg" />
      <div className="auth-page__overlay" />

      {/* Logo */}
      <header className="auth-page__header">
        <Link to="/login">
          <svg viewBox="0 0 111 30" className="auth-page__logo" aria-label="Netflix">
            <path d="M105.06 0l-9.44 26.43L86.18 0H76.6v30h7.14V7.82L93.9 30h7.5l10.16-22.18V30H119V0zM55.84 0v30h7.13V16.76L74.66 30h9.1L71.3 13.41 83.1 0h-8.9L63.13 13.57V0zm-28.37 7.08V30h7.14V7.08h10.17V0H17.3v7.08zM0 0v30h21.45v-7.08H7.13V0z" fill="#E50914"/>
          </svg>
        </Link>
      </header>

      {/* Form box */}
      <main className="auth-page__main">
        <div className="auth-box">
          <h1 className="auth-box__title">Sign In</h1>

          {error && (
            <div className="auth-box__error">{error}</div>
          )}

          <form className="auth-box__form" onSubmit={handleSubmit}>
            <div className="auth-box__field">
              <input
                type="email"
                placeholder=" "
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="auth-box__input"
                id="email"
                autoComplete="email"
              />
              <label htmlFor="email" className="auth-box__label">Email or phone number</label>
            </div>

            <div className="auth-box__field">
              <input
                type="password"
                placeholder=" "
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="auth-box__input"
                id="password"
                autoComplete="current-password"
              />
              <label htmlFor="password" className="auth-box__label">Password</label>
            </div>

            <button
              type="submit"
              className="auth-box__submit"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="auth-box__options">
              <label className="auth-box__remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="auth-box__forgot">Need help?</a>
            </div>
          </form>

          <div className="auth-box__footer">
            <p>
              New to Netflix?{' '}
              <Link to="/signup" className="auth-box__link">Sign up now.</Link>
            </p>
            <p className="auth-box__recaptcha">
              This page is protected by Google reCAPTCHA to ensure you're not a bot.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;