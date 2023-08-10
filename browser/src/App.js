import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import { useStore } from './store';

// components
import Loading from './components/Loading';
import Header from './components/Header';
import Redirect from './components/Redirect';

// pages
import AuthForm from './pages/AuthForm';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

const AUTHENTICATE = gql`
  query {
    authenticate {
      user {
        _id
        username
        email
        notes {
          text
        }
      }
    }
  }
`;

function App() {
  const { dispatch, actions, loading } = useStore();
  const { data, loading: qLoading } = useQuery(AUTHENTICATE);

  if (!qLoading) console.log('yep');

  useEffect(() => {


    if (data) {
      dispatch({
        type: actions.UPDATE_USER,
        payload: data.authenticate.user
      });
    }
  }, [data, qLoading]);

  return (
    <>
      <Header />

      {loading && <Loading />}

      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/auth" element={(
          <Redirect>
            <AuthForm />
          </Redirect>
        )} />

        <Route path="/dashboard" element={(
          <Redirect>
            <Dashboard />
          </Redirect>
        )} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
