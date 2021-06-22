import React from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import './RegistrationForm.scss';

import { USER_FIELDS } from 'constants/CommonConstants';
import { PATH } from 'constants/RouteConstants';
import useFieldState from 'hooks/useFieldState';

import { RegisterUserSchema } from 'schema/User';
import logger from 'utils/LoggerUtil';
import { UserServices } from 'services/UserServices';

import Button from 'components/Button/Button';
import InputField from 'components/InputField';
import SimpleToast from 'components/SimpleToast/SimpleToast';
import Title from 'components/Title/Title';

function RegistrationForm() {
  // Component State Definition
  const history = useHistory();
  const [
    fullName,
    setFullName,
    fullNameError,
    setFullNameError,
  ] = useFieldState('');
  const [
    emailId, 
    setEmailId, 
    emailIdError, 
    setEmailError
  ] = useFieldState('');
  const [
    nickName,
    setNickName,
    nickNameError,
    setNickNameError,
  ] = useFieldState('');
  const [
    password,
    setPassword,
    passwordError,
    setPasswordError,
  ] = useFieldState('');
  const [
    confirmPassword,
    setConfirmPassword,
    confirmPasswordError,
    setConfirmPasswordError,
  ] = useFieldState('');

  /**
   * Method to set error messages
   * @param {object} errorMsgs - error messages map. key & error message map
   * @param {string} fieldToValidate - Field to check if it is valid
   */
  const setErrorMessages = (errorMsgs, fieldToValidate) => {
    const FIELD_ERROR_SETTER_MAP = [
      {
        fieldName: USER_FIELDS.FULL_NAME,
        setFieldError: setFullNameError
      },
      {
        fieldName: USER_FIELDS.EMAIL_ID,
        setFieldError: setEmailError
      },
      {
        fieldName: USER_FIELDS.NICKNAME,
        setFieldError: setNickNameError
      },
      {
        fieldName: USER_FIELDS.PASSWORD,
        setFieldError: setPasswordError
      },
      {
        fieldName: USER_FIELDS.CONFIRM_PASSWORD,
        setFieldError: setConfirmPasswordError
      },
    ];
    for (let i = 0; i < FIELD_ERROR_SETTER_MAP.length; i++) {
      const userField = FIELD_ERROR_SETTER_MAP[i].fieldName;
      const setFieldError = FIELD_ERROR_SETTER_MAP[i].setFieldError;
      if (
        errorMsgs[userField] &&
        (!fieldToValidate || fieldToValidate === userField)
      ) {
        setFieldError(errorMsgs[userField]);
        if(fieldToValidate) break;
      }
    }
  };

  /**
   * Method to check if the form is valid
   * @param {string} fieldToValidate - Field to check if it is valid
   */
  const validateForm = (fieldToValidate) => {
    let isValid = true;
    const user = {
      fullName,
      emailId,
      nickName,
      password,
      confirmPassword,
    };
    const validationResult = RegisterUserSchema.validate(user, {
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
      setErrorMessages(errorMsgs, fieldToValidate);
      isValid = false;
    }
    return isValid;
  };

  /**
   * Register user
   */
  const registerUser = async() => {
    if(!validateForm()) {
      toast.error('Please address the error fields.');
      return;
    }
    try {
      const user = {
        fullName,
        emailId,
        nickName,
        password,
      };
      const result = await UserServices.createUser(user);
      toast.info(<SimpleToast text="Successfully registered your account!!" />, {
        onClose: () => {
          history.push(PATH.LOGIN_PAGE);
        }
      });
      logger.info('Result: %o',result );
    } catch (error) {
      logger.error('Error Message: %s', error.message);
      toast.error(<SimpleToast text={error.message} />, {});
    }
  };
  
  const validateFullName = validateForm.bind(this, USER_FIELDS.FULL_NAME);
  const validateEmailId = validateForm.bind(this, USER_FIELDS.EMAIL_ID);
  const validateNickName = validateForm.bind(this, USER_FIELDS.NICKNAME);
  const validatePassword = validateForm.bind(this, USER_FIELDS.PASSWORD);
  const validateConfirmPassword= validateForm.bind(this, USER_FIELDS.CONFIRM_PASSWORD);

  return (
    <div className="register-form-wrap">
      <Title>Create Your Account</Title>
      <form className="register-form">
        <InputField
          id="fullName"
          label="Full Name"
          initialValue={fullName}
          isRequired={true}
          errorMsg={fullNameError}
          onChange={setFullName}
          onBlur={validateFullName}
        />
        <InputField
          id="email"
          label="Email Id"
          initialValue={emailId}
          isRequired={true}
          errorMsg={emailIdError}
          onChange={setEmailId}
          onBlur={validateEmailId}
        />
        <InputField
          id="nickName"
          label="Nick Name"
          initialValue={nickName}
          isRequired={true}
          errorMsg={nickNameError}
          onChange={setNickName}
          onBlur={validateNickName}
        />
        <InputField
          id="password"
          label="Password"
          inputType="password"
          initialValue={password}
          isRequired={true}
          errorMsg={passwordError}
          onChange={setPassword}
          onBlur={validatePassword}
        />
        <InputField
          id="confirmPassword"
          label="Confirm Password"
          inputType="password"
          initialValue={confirmPassword}
          isRequired={true}
          errorMsg={confirmPasswordError}
          onChange={setConfirmPassword}
          onBlur={validateConfirmPassword}
        />
        <div className="submit-btn">
          <Button onClick={registerUser}>Register</Button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
