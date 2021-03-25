import React, { useState } from 'react';
import AppContext from '@Components/AppContext';

const GlobalProvider = ({ children }) => {
  const login = ({ user = undefined }) => {
    setState((prevState) => {
      return {
        ...prevState,
        auth: {
          ...prevState.auth,
          isLoggedIn: true,
          user,
        },
      };
    });
  };

  const logout = () => {
    setState((prevState) => {
      return {
        ...prevState,
        auth: {
          ...prevState.auth,
          isLoggedIn: false,
          userType: undefined,
          user: undefined,
        },
      };
    });
  };
  const changeLoading = (loading) => {
    setState((prevState) => {
      return {
        ...prevState,
        loading,
      };
    });
  };
  const changeUserType = (userType) => {
    setState((prevState) => {
      return {
        ...prevState,
        auth: {
          ...prevState.auth,
          userType,
        },
      };
    });
  };

  //state초기화 객체 입니다.
  const initialState = {
    auth: {
      loading: false,
      isLoggedIn: false,
      userType: undefined,
    },
    loading: false,

    login,
    logout,
    changeLoading,
    changeUserType,
  };
  //Hook을 통한 state, setState를 정의합니다.
  const [state, setState] = useState(initialState);

  return (
    //ColorProvider에 state를 사용할 컴포넌트들을 호출하려면
    //{children}이 있어야 합니다
    //그래서 마지막 return에서 {children}을 리턴해줍니다.
    <AppContext.Provider value={state}>{children}</AppContext.Provider>
  );
};

export default GlobalProvider;
