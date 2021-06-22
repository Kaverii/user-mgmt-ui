import React from 'react';
import './RegisterScreen.scss';

import Container from 'components/Container';
import Header from 'components/Header';
import RegistrationForm from 'containers/RegistrationForm';

function RegisterScreen() {
  return (
    <div className="register-screen-wrap">
      <Header page="Home" />
      <Container>
        <RegistrationForm />
      </Container>
    </div>
  );
}

export default RegisterScreen;
