import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaMicrosoft } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import AuthLayout from '../components/AuthLayout';
import '../styles/Login.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(null);

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      // Future API integration point
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Login submitted:', formData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    setOauthLoading(provider);
    try {
      // Future OAuth integration point
      // Example: window.location.href = `/api/auth/${provider}`;
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log(`OAuth login with ${provider}`);
    } finally {
      setOauthLoading(null);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue"
    >
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <div className={`input-wrapper ${errors.email ? 'input-wrapper--error' : ''}`}>
            <HiOutlineMail className="input-icon" aria-hidden="true" />
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              disabled={isLoading}
            />
          </div>
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <div className="form-label-row">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <a href="#" className="form-link form-link--small">
              Forgot Password?
            </a>
          </div>
          <div className={`input-wrapper ${errors.password ? 'input-wrapper--error' : ''}`}>
            <HiOutlineLockClosed className="input-icon" aria-hidden="true" />
            <input
              id="password"
              name="password"
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              disabled={isLoading}
            />
          </div>
          {errors.password && <span className="form-error">{errors.password}</span>}
        </div>

        <button
          type="submit"
          className={`btn btn--primary ${isLoading ? 'btn--loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="btn__spinner" aria-hidden="true" />
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </button>
      </form>

      <div className="divider">
        <span className="divider__text">or continue with</span>
      </div>

      <div className="oauth-buttons">
        <button
          type="button"
          className={`oauth-btn oauth-btn--google ${oauthLoading === 'google' ? 'oauth-btn--loading' : ''}`}
          onClick={() => handleOAuthLogin('google')}
          disabled={oauthLoading !== null || isLoading}
          data-provider="google"
          aria-label="Sign in with Google"
        >
          {oauthLoading === 'google' ? (
            <span className="btn__spinner btn__spinner--dark" aria-hidden="true" />
          ) : (
            <FcGoogle className="oauth-btn__icon" aria-hidden="true" />
          )}
          <span>Google</span>
        </button>

        <button
          type="button"
          className={`oauth-btn oauth-btn--microsoft ${oauthLoading === 'microsoft' ? 'oauth-btn--loading' : ''}`}
          onClick={() => handleOAuthLogin('microsoft')}
          disabled={oauthLoading !== null || isLoading}
          data-provider="microsoft"
          aria-label="Sign in with Microsoft"
        >
          {oauthLoading === 'microsoft' ? (
            <span className="btn__spinner btn__spinner--dark" aria-hidden="true" />
          ) : (
            <FaMicrosoft className="oauth-btn__icon oauth-btn__icon--microsoft" aria-hidden="true" />
          )}
          <span>Microsoft</span>
        </button>
      </div>

      <p className="auth-footer">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="form-link">
          Register
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Login;
