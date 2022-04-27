import {
  createContext, Dispatch, ReactNode, useReducer,
} from 'react';

interface UserType {
  firstName:string,
  lastName: string,
  phone: string,
  email: string,
  password: string
}
type AppState = typeof initialState;
interface Action <Type> { type: 'SET_USER_DATA', payload: Type }

interface UserProviderProps {
  children: ReactNode
}
const initialState = {
  user: {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
  },
};

const reducer = (state: AppState, action: Action<UserType>) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};

const UserContext = createContext<{
  state: AppState;
  dispatch: Dispatch<Action<UserType>>
}>({ state: initialState, dispatch: () => { } });

const UserProvider = ({ children }: UserProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>

  );
};

export { UserContext, UserProvider };
