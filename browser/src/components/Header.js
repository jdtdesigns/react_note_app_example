import { NavLink } from 'react-router-dom';

function Header(props) {
  return (
    <header className="row justify-between align-center">
      <h3>Note App</h3>

      <nav>
        <NavLink to="/">Home</NavLink>
        {props.state.user ? (
          <NavLink to="/dashboard">Dashboard</NavLink>
        ) : (
          <NavLink to="/auth">Login or Register</NavLink>
        )}
      </nav>
    </header>
  )
}

export default Header;