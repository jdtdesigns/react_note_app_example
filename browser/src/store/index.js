import { useReducer, useContext, createContext } from 'react';

const StoreContext = createContext();

const initial_state = {
  user: null,
  loading: true
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_LOADING':
      return { ...state, loading: !state.loading };
    case 'UPDATE_USER':
      return { ...state, user: action.payload };
  }
};

const actions = {
  TOGGLE_LOADING: 'TOGGLE_LOADING',
  UPDATE_USER: 'UPDATE_USER'
};

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial_state);

  return (
    <StoreContext.Provider value={{ ...state, dispatch, actions }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext);