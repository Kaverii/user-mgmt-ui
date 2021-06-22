import React from 'react';
import './LoginScreen.scss';

import Container from 'components/Container';
import Header from 'components/Header';
import LoginForm from 'containers/LoginForm/LoginForm';

function LoginScreen() {
  return (
    <div className="login-screen-wrap">
      <Header page="Home" />
      <Container>
        <LoginForm />
      </Container>
    </div>
  );
}

export default LoginScreen;
