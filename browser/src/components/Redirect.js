import { Navigate, useLocation } from 'react-router-dom';

import { useStore } from '../store';

function Redirect(props) {
  const { user } = useStore();
  const location = useLocation();

  if (!user && location.pathname === '/dashboard')
    return <Navigate to="/auth" state={{ from: location }} replace />;

  if (user && location.pathname === '/auth')
    return <Navigate to="/dashboard" state={{ from: location }} replace />;

  return props.children;
}

export default Redirect;