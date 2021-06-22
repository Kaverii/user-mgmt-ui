import JwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

import { URL_CONSTS } from 'constants/UrlConstants';
import HttpUtil from 'utils/HttpUtil';
import logger from 'utils/LoggerUtil';
import { COOKIE_KEYS, LOCAL_STORAGE_KEYS } from 'constants/StorageConstants';

export class UserServices {
  /**
   * Method to create user
   * @param {object} user 
   * @returns 
   */
  static async createUser(user) {
    let isCreated = false;
    try {
      const data = await HttpUtil.post(URL_CONSTS.USER_PATH, user);
      if(data.success) isCreated = true;
      return isCreated;
    } catch (error) {
      const errMessage = error.response.data.message.slice(9);
      logger.error('Error Message: %s', errMessage);
      throw new Error(errMessage);
    }
  }
  /**
   * Service to login user
   * @param {object} user 
   * @returns 
   */
  static async loginUser(user) {
    let isValidCredentials = false;
    try {
      const response = await HttpUtil.post(URL_CONSTS.USER_LOGIN, user);
      this.storeToken(response.token);
      
      isValidCredentials = true;
      return isValidCredentials;
    } catch (error) {
      const errMessage = error.response.data.message.slice(9);
      logger.error('Error Message: %s', errMessage);
      throw new Error(errMessage);
    }
  }

  /**
   * Service to store token
   * @param {string} token 
   */
  static storeToken(token) {
    const id = JwtDecode(token).id;
    localStorage.setItem(LOCAL_STORAGE_KEYS.ID, id);
    Cookies.set(COOKIE_KEYS.ACCESS_TOKEN, token);
  }

  /**
   * Service to get current user id
   * @returns {string} - user id
   */
  static getCurrentUserId() {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.ID);
  }

  /**
   * Service to get user details by user id
   * @param {string} id 
   * @returns {object} - user
   */
  static async getUserDetails(id) {
    try {
      const finalUrl = `${URL_CONSTS.USER_PATH}${id}`;
      const response = await HttpUtil.get(finalUrl, true);
      return response.data;
    } catch (error) {
      const errMessage = error.response.data.message.slice(9);
      logger.error('Error Message: %s', errMessage);
      throw new Error(errMessage);
    }
  }
}