import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// components
import Loading from './components/Loading';
import Header from './components/Header';

// pages
import AuthForm from './pages/AuthForm';
import Landing from './pages/Landing';

function App() {
  const [state, setState] = useState({
    user: null,
    notes: [],
    loading: false
  });

  // useEffect(() => {
  //   fetch('/api/test')
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //     })
  // }, []);

  return (
    <>
      <Header state={state} />

      {state.loading && <Loading />}

      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/auth" element={<AuthForm />} />
      </Routes>
    </>
  );
}

export default App;
