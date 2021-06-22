/**
 * Error Message Constants
 */
export const ERROR_MSGS = {
  // Emailid Error Messages
  INVALID_EMAIL_ID: 'Email id is invalid!',
  EMAIL_ID_REQUIRED: 'Email id is required!',
  EMAIL_ID_EMPTY: 'Email id cannot be empty!',

  // Nick Name Error Messages
  INVALID_NICKNAME: 'Nick name is invalid!',
  NICKNAME_REQUIRED: 'Nick name is required!',
  NICKNAME_EMPTY: 'Nick name cannot be empty!',
  NICKNAME_LENGTH_NOT_SATISFIED: 'Nick name should be from 3 to 30 characters.',
  NICKNAME_CANNOT_CONTAIN_SPECIAL_CHARACTERS: 'Nick name can only contain alphabets and numbers. Special charecters are not allowed.',

  // Full Name Error Messages
  INVALID_FULL_NAME: 'Fullname is invalid!',
  FULL_NAME_REQUIRED: 'Fullname is required!',
  FULL_NAME_EMPTY: 'Fullname cannot be empty!',

  // Password Error Messages
  INVALID_PASSWORD: 'Password is invalid!',
  PASSWORD_REQUIRED: 'Password is required!',
  PASSWORD_EMPTY: 'Password cannot be empty!',
  PASSWORD_PATTERN_NOT_MATCHED: 'Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',

  // Confirm Password Error Messages
  INVALID_CONFIRM_PASSWORD: 'Confirm password is invalid!',
  CONFIRM_PASSWORD_REQUIRED: 'Confirm password is required!',
  CONFIRM_PASSWORD_EMPTY: 'Confirm password cannot be empty!',
  CONFIRM_PASSWORD_MISMATCH: 'Confirm password does not match.',

};
