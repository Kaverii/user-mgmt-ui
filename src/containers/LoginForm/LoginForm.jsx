import React from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import './LoginForm.scss';

import { USER_FIELDS } from 'constants/CommonConstants';
import { LoginUserSchema } from 'schema/User';
import { UserServices } from 'services/UserServices';
import logger from 'utils/LoggerUtil';

import useFieldState from 'hooks/useFieldState';

import Button from 'components/Button/Button';
import InputField from 'components/InputField/InputField';
import SimpleToast from 'components/SimpleToast/SimpleToast';
import Title from 'components/Title/Title';
import { PATH } from 'constants/RouteConstants';

function LoginForm() {
  // Component State Definition
  const history = useHistory();
  const [emailId, setEmailId, emailIdError, setEmailError] = useFieldState('');
  const [
    password,
    setPassword,
    passwordError,
    setPasswordError,
  ] = useFieldState('');

  /**
   * Method to set error messages
   * @param {object} errorMsgs - error messages map. key & error message map
   */
  const setErrorMessages = (errorMsgs) => {
    const FIELD_ERROR_SETTER_MAP = [
      {
        fieldName: USER_FIELDS.EMAIL_ID,
        setFieldError: setEmailError,
      },
      {
        fieldName: USER_FIELDS.PASSWORD,
        setFieldError: setPasswordError,
      },
    ];
    for (let i = 0; i < FIELD_ERROR_SETTER_MAP.length; i++) {
      const userField = FIELD_ERROR_SETTER_MAP[i].fieldName;
      const setFieldError = FIELD_ERROR_SETTER_MAP[i].setFieldError;
      if (errorMsgs[userField]) {
        setFieldError(errorMsgs[userField]);
      }
    }
  };

  /**
   * Method to check if the form is valid
   */
  const validateForm = () => {
    let isValid = true;
    const user = {
      emailId,
      password,
    };
    const validationResult = LoginUserSchema.validate(user, {
      abortEarly: false,
    });
    if (validationResult.error) {
      // On Invalid User
      const errorMsgs = validationResult.error.details.reduce(
        (accumulator, error) => {
          accumulator[error.context.key] = error.message;
          return accumulator;
        },
        {}
      );
      setErrorMessages(errorMsgs);
      isValid = false;
    }
    return isValid;
  };

  const loginUser = async () => {
    if (!validateForm()) {
      toast.error('Please address the error fields.');
      return;
    }
    try {
      const user = {
        emailId,
        password,
      };
      let isLoggedIn = await UserServices.loginUser(user);
      if(isLoggedIn)
        history.push(PATH.HOME);
    } catch (error) {
      toast.error(<SimpleToast text={error.message} />, {});
    }
  };

  return (
    <div className="login-form-wrap">
      <Title>Login</Title>
      <form className="register-form">
        <InputField
          id="email"
          label="Email Id"
          initialValue={emailId}
          errorMsg={emailIdError}
          onChange={setEmailId}
        />

        <InputField
          id="password"
          label="Password"
          inputType="password"
          initialValue={password}
          errorMsg={passwordError}
          onChange={setPassword}
        />

        <div className="submit-btn">
          <Button onClick={loginUser}>Login</Button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
