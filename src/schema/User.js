import Joi from 'joi';
import tlds from '@sideway/address/lib/tlds.js';

import { ERROR_MSGS } from 'constants/ErrorMsgConstants';
import ValidationUtils from 'utils/ValidationUtil';
import {
  NICKNAME_VALIDATION,
  PASSWORD_PATTERN,
  USER_FIELDS,
} from 'constants/CommonConstants';

/**
 * Validation Error message mapping constants
 */
const ERROR_MSG_MAPPING = {
  /**
   * Register user dto error message map
   */
  REGISTER_USER: {
    EMAIL: {
      'any.required': ERROR_MSGS.EMAIL_ID_REQUIRED,
      'string.base': ERROR_MSGS.INVALID_EMAIL_ID,
      'any.empty': ERROR_MSGS.EMAIL_ID_EMPTY,
      default: ERROR_MSGS.INVALID_EMAIL_ID,
    },
    NICKNAME: {
      'any.required': ERROR_MSGS.NICKNAME_REQUIRED,
      'string.base': ERROR_MSGS.INVALID_NICKNAME,
      'any.empty': ERROR_MSGS.NICKNAME_EMPTY,
      'string.min': ERROR_MSGS.NICKNAME_LENGTH_NOT_SATISFIED,
      'string.max': ERROR_MSGS.NICKNAME_LENGTH_NOT_SATISFIED,
      'string.alphanum': ERROR_MSGS.NICKNAME_CANNOT_CONTAIN_SPECIAL_CHARACTERS,
      default: ERROR_MSGS.INVALID_NICKNAME,
    },
    FULL_NAME: {
      'any.required': ERROR_MSGS.FULL_NAME_REQUIRED,
      'string.base': ERROR_MSGS.INVALID_FULL_NAME,
      'any.empty': ERROR_MSGS.FULL_NAME_EMPTY,
      default: ERROR_MSGS.INVALID_FULL_NAME,
    },
    PASSWORD: {
      'any.required': ERROR_MSGS.PASSWORD_REQUIRED,
      'string.base': ERROR_MSGS.INVALID_PASSWORD,
      'any.empty': ERROR_MSGS.PASSWORD_EMPTY,
      'object.pattern.match': ERROR_MSGS.PASSWORD_PATTERN_NOT_MATCHED,
      'string.pattern.base': ERROR_MSGS.PASSWORD_PATTERN_NOT_MATCHED,
      default: ERROR_MSGS.INVALID_PASSWORD,
    },
    CONFIRM_PASSWORD: {
      'any.required': ERROR_MSGS.CONFIRM_PASSWORD_REQUIRED,
      'any.empty': ERROR_MSGS.CONFIRM_PASSWORD_EMPTY,
      'any.only': ERROR_MSGS.CONFIRM_PASSWORD_MISMATCH,
      default: ERROR_MSGS.INVALID_CONFIRM_PASSWORD,
    },
  },

  /**
   * Login user dto error message map
   */
  LOGIN_USER: {
    EMAIL: {
      'any.required': ERROR_MSGS.EMAIL_ID_REQUIRED,
      'string.base': ERROR_MSGS.INVALID_EMAIL_ID,
      'any.empty': ERROR_MSGS.EMAIL_ID_EMPTY,
      default: ERROR_MSGS.INVALID_EMAIL_ID,
    },
    PASSWORD: {
      'any.required': ERROR_MSGS.PASSWORD_REQUIRED,
      'string.base': ERROR_MSGS.INVALID_PASSWORD,
      'any.empty': ERROR_MSGS.PASSWORD_EMPTY,
      default: ERROR_MSGS.INVALID_PASSWORD,
    },
  },

  /**
   * Update User Dto error message
   */
  UPDATE_USER: {
    ID: {
      'any.required': ERROR_MSGS.ID_REQUIRED,
      'string.base': ERROR_MSGS.INVALID_ID,
      'any.empty': ERROR_MSGS.ID_EMPTY,
      default: ERROR_MSGS.INVALID_ID,
    },
    EMAIL: {
      'string.base': ERROR_MSGS.INVALID_EMAIL_ID,
      'any.empty': ERROR_MSGS.EMAIL_ID_EMPTY,
      default: ERROR_MSGS.INVALID_EMAIL_ID,
    },
    NICKNAME: {
      'string.base': ERROR_MSGS.INVALID_NICKNAME,
      'any.empty': ERROR_MSGS.NICKNAME_EMPTY,
      'string.min': ERROR_MSGS.NICKNAME_LENGTH_NOT_SATISFIED,
      'string.max': ERROR_MSGS.NICKNAME_LENGTH_NOT_SATISFIED,
      'string.alphanum': ERROR_MSGS.NICKNAME_CANNOT_CONTAIN_SPECIAL_CHARACTERS,
      default: ERROR_MSGS.INVALID_NICKNAME,
    },
    FULL_NAME: {
      'string.base': ERROR_MSGS.INVALID_FULL_NAME,
      'any.empty': ERROR_MSGS.FULL_NAME_EMPTY,
      default: ERROR_MSGS.INVALID_FULL_NAME,
    },
    PASSWORD: {
      'string.base': ERROR_MSGS.INVALID_PASSWORD,
      'any.empty': ERROR_MSGS.PASSWORD_EMPTY,
      'object.pattern.match': ERROR_MSGS.PASSWORD_PATTERN_NOT_MATCHED,
      'string.pattern.base': ERROR_MSGS.PASSWORD_PATTERN_NOT_MATCHED,
      default: ERROR_MSGS.INVALID_PASSWORD,
    },
    
  },

};

/**
 * Register User Schema to validate given user object
 */
export const RegisterUserSchema = Joi.object({
  [USER_FIELDS.EMAIL_ID]: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: tlds
      }
    })
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.REGISTER_USER.EMAIL),
    ),
  [USER_FIELDS.NICKNAME]: Joi.string()
    .required()
    .alphanum()
    .min(NICKNAME_VALIDATION.MIN_LENGTH)
    .max(NICKNAME_VALIDATION.MAX_LENGTH)
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.REGISTER_USER.NICKNAME),
    ),
  [USER_FIELDS.FULL_NAME]: Joi.string()
    .required()
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.REGISTER_USER.FULL_NAME),
    ),
  [USER_FIELDS.PASSWORD]: Joi.string()
    .required()
    .pattern(new RegExp(PASSWORD_PATTERN))
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.REGISTER_USER.PASSWORD),
    ),
  [USER_FIELDS.CONFIRM_PASSWORD]: Joi.any()
    .required()
    .equal(Joi.ref(USER_FIELDS.PASSWORD))
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.REGISTER_USER.CONFIRM_PASSWORD),
    )
});

/**
 * Login User Schema to validate given user object
 */
export const LoginUserSchema = Joi.object({
  [USER_FIELDS.EMAIL_ID]: Joi.string()
    .required()
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.LOGIN_USER.EMAIL),
    ),
  [USER_FIELDS.PASSWORD]: Joi.string()
    .required()
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.LOGIN_USER.PASSWORD),
    ),
});

/**
 * Update User Schema to validate given user object
 */
export const UpdateUserSchema = Joi.object({
  [USER_FIELDS.ID]: Joi.string()
    .required()
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.ID),
    ),
  [USER_FIELDS.EMAIL_ID]: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: tlds
      }
    })
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.EMAIL),
    ),
  [USER_FIELDS.NICKNAME]: Joi.string()
    .alphanum()
    .min(NICKNAME_VALIDATION.MIN_LENGTH)
    .max(NICKNAME_VALIDATION.MAX_LENGTH)
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.NICKNAME),
    ),
  [USER_FIELDS.FULL_NAME]: Joi.string()
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.FULL_NAME),
    ),
  [USER_FIELDS.PASSWORD]: Joi.string()
    .pattern(new RegExp(PASSWORD_PATTERN))
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.PASSWORD),
    ),
});