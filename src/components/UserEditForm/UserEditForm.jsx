import useFieldState from 'hooks/useFieldState';
import React, { useEffect } from 'react';
import { UserServices } from 'services/UserServices';
import logger from 'utils/LoggerUtil';

function UserEditForm({isReadOnly}) {
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
  const fetchUserDetails = async() => {
    try{
      const user = await UserServices.getUserDetails();
      setFullName(user.fullName);
      setEmailId(user.emailId);
    } catch(error) {
      logger.error('%o',error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div class="user-edit-form">
      
    </div>
  );
}

export default UserEditForm;
