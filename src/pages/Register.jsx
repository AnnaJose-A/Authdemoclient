import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
} from 'react-icons/hi';
import AuthLayout from '../components/AuthLayout';
import '../styles/Register.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Include uppercase, lowercase, and a number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      console.log('Registration submitted:', {
        fullName: formData.fullName,
        email: formData.email,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Get started with your free account today"
    >
      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <div className={`input-wrapper ${errors.fullName ? 'input-wrapper--error' : ''}`}>
            <HiOutlineUser className="input-icon" aria-hidden="true" />
            <input
              id="fullName"
              name="fullName"
              type="text"
              className="form-input"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              autoComplete="name"
              disabled={isLoading}
            />
          </div>
          {errors.fullName && <span className="form-error">{errors.fullName}</span>}
        </div>

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
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className={`input-wrapper ${errors.password ? 'input-wrapper--error' : ''}`}>
            <HiOutlineLockClosed className="input-icon" aria-hidden="true" />
            <input
              id="password"
              name="password"
              type="password"
              className="form-input"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              disabled={isLoading}
            />
          </div>
          {errors.password && <span className="form-error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <div className={`input-wrapper ${errors.confirmPassword ? 'input-wrapper--error' : ''}`}>
            <HiOutlineLockClosed className="input-icon" aria-hidden="true" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="form-input"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              disabled={isLoading}
            />
          </div>
          {errors.confirmPassword && (
            <span className="form-error">{errors.confirmPassword}</span>
          )}
        </div>

        <button
          type="submit"
          className={`btn btn--primary ${isLoading ? 'btn--loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="btn__spinner" aria-hidden="true" />
              Creating account...
            </>
          ) : (
            'Create account'
          )}
        </button>
      </form>

      <p className="auth-footer">
        Already have an account?{' '}
        <Link to="/login" className="form-link">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Register;
