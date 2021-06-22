/**
 * Nick Name configuration constant
 */
export const NICKNAME_VALIDATION = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 30,
};

/**
 * Password configration constant
 */
export const PASSWORD_PATTERN = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';

/**
 * User fields
 */
export const USER_FIELDS = {
  ID: 'id',
  EMAIL_ID: 'emailId',
  NICKNAME: 'nickName',
  FULL_NAME: 'fullName',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword'
};