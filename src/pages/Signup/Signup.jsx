import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../Login/Login.css'; // reuse shared auth styles

const Signup = () => {
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const { signup } = useAuth();
  const navigate   = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    signup(email, password, name);
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-page__bg" />
      <div className="auth-page__overlay" />

      <header className="auth-page__header">
        <Link to="/login">
          <svg viewBox="0 0 111 30" className="auth-page__logo" aria-label="Netflix">
            <path d="M105.06 0l-9.44 26.43L86.18 0H76.6v30h7.14V7.82L93.9 30h7.5l10.16-22.18V30H119V0zM55.84 0v30h7.13V16.76L74.66 30h9.1L71.3 13.41 83.1 0h-8.9L63.13 13.57V0zm-28.37 7.08V30h7.14V7.08h10.17V0H17.3v7.08zM0 0v30h21.45v-7.08H7.13V0z" fill="#E50914"/>
          </svg>
        </Link>
      </header>

      <main className="auth-page__main">
        <div className="auth-box">
          <h1 className="auth-box__title">Sign Up</h1>

          {error && <div className="auth-box__error">{error}</div>}

          <form className="auth-box__form" onSubmit={handleSubmit}>
            <div className="auth-box__field">
              <input type="text" placeholder=" " value={name}
                onChange={e => setName(e.target.value)} className="auth-box__input" id="name"/>
              <label htmlFor="name" className="auth-box__label">Full name</label>
            </div>

            <div className="auth-box__field">
              <input type="email" placeholder=" " value={email}
                onChange={e => setEmail(e.target.value)} className="auth-box__input" id="email"/>
              <label htmlFor="email" className="auth-box__label">Email address</label>
            </div>

            <div className="auth-box__field">
              <input type="password" placeholder=" " value={password}
                onChange={e => setPassword(e.target.value)} className="auth-box__input" id="password"/>
              <label htmlFor="password" className="auth-box__label">Password (6+ chars)</label>
            </div>

            <button type="submit" className="auth-box__submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div className="auth-box__footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-box__link">Sign in.</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;