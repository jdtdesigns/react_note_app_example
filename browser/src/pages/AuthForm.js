import { useState } from 'react';

const styles = {
  toggleWrap: {
    marginTop: '15px'
  },
  label: {
    marginRight: '3px'
  },
  input: {
    marginRight: '10px'
  }
};

function AuthForm(props) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isLogin: true
  });

  const handleInputChange = e => {
    const prop = e.target.name;
    const value = e.target.value;

    if (prop === 'isLogin') {
      return setFormData({
        ...formData,
        isLogin: value === 'login' ? true : false
      })
    }

    setFormData({
      ...formData,
      [prop]: value
    });
  };

  const handleSubmit = e => {

  };

  return (
    <>
      <h1 className="text-center">{formData.isLogin ? 'Log In' : 'Register'}</h1>

      <form onSubmit={handleSubmit} className="column">
        {!formData.isLogin && (
          <input
            onChange={handleInputChange}
            name="username"
            type="text"
            placeholder="Enter your Username" />
        )}
        <input
          onChange={handleInputChange}
          name="email"
          type="email"
          placeholder="Enter your email" />
        <input
          onChange={handleInputChange}
          name="password"
          type="password"
          placeholder="Enter your password" />
        <button>Submit</button>
        <div className="toggle-wrap row justify-center align-center" style={styles.toggleWrap}>
          <label style={styles.label} htmlFor="login">Login</label>
          <input
            name="isLogin"
            onChange={handleInputChange}
            style={styles.input}
            type="radio"
            id="login"
            value="login"
            checked={formData.isLogin} />
          <label style={styles.label} htmlFor="register">Register</label>
          <input
            name="isLogin"
            onChange={handleInputChange}
            style={styles.input}
            type="radio"
            id="register"
            value="register"
            checked={!formData.isLogin} />
        </div>
      </form>
    </>
  )
}

export default AuthForm;