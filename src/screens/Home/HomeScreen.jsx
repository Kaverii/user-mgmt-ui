import React from 'react';
import { useHistory } from 'react-router-dom';
import './HomeScreen.scss';

import About from 'components/About';
import Button from 'components/Button';
import Container from 'components/Container';
import Header from 'components/Header';
import { BTN_TYPE } from 'constants/BtnConstants';
import { PATH } from 'constants/RouteConstants';

const HomeScreen = () => {
  const history = useHistory();

  const openRegistationForm = () => {
    history.push(PATH.REGISTER_PAGE);
  };
  const openLoginForm = () => {
    history.push(PATH.LOGIN_PAGE);
  };
  return (
    <div className="home-page-wrap">
      <Header page="Home" />
      <Container>
        <About />
        <div className="button-section">
          <Button onClick={openRegistationForm}>Register</Button>
          <Button onClick={openLoginForm} btnType={BTN_TYPE.OUTLINE}>
          Login
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default HomeScreen;
