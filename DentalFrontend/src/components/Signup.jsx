import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';

export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Automatically login the user after successful signup 
        // Our backend doesn't automatically return token on register, 
        // so we need to either change backend or just let them login.
        // Doing a quick fetch to login to get the token!
        const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const loginData = await loginResponse.json();
        if(loginResponse.ok) {
            login(loginData.user, loginData.token);
            navigate('/');
        } else {
            navigate('/login');
        }

      } else {
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Server unreachable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container d-flex align-items-center justify-content-center">
      <div className="auth-card">
        <h2 className="auth-title text-center mb-4">Create Account</h2>
        <p className="auth-subtitle text-center mb-4">Join our clinic and book your appointments</p>

        {error && <div className="alert alert-danger fade show" role="alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group mb-4">
            <span className="input-group-text"><FiUser /></span>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Full Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>

          <div className="input-group mb-4">
            <span className="input-group-text"><FiMail /></span>
            <input 
              type="email" 
              className="form-control" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="input-group mb-4">
            <span className="input-group-text"><FiLock /></span>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 auth-btn" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-footer text-center mt-4">
          Already have an account? <Link to="/login" className="auth-link">Log in</Link>
        </p>
      </div>
    </div>
  );
}
