import { NavLink } from 'react-router-dom';
import axios from 'axios';

import { useStore } from '../store';

function Header() {
  const { dispatch, actions, user } = useStore();

  const logout = async e => {
    e.preventDefault();

    await axios.get('/api/logout');

    dispatch({
      type: actions.UPDATE_USER,
      payload: null
    });
  }

  return (
    <header className="row justify-between align-center">
      <h3>Note App</h3>

      <nav className="row">
        {user && <p className="header-username">Welcome, {user.username}</p>}
        <NavLink to="/">Home</NavLink>
        {user ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink onClick={logout} to="/logout">Log Out</NavLink>
          </>
        ) : (
          <NavLink to="/auth">Login or Register</NavLink>
        )}
      </nav>
    </header>
  )
}

export default Header;