import axios from 'axios';
import { COOKIE_KEYS } from 'constants/StorageConstants';
import Cookies from 'js-cookie';
import logger from './LoggerUtil';

export default class HttpUtil {
  setAuthHeader(isAuthorized) {
    const authHeader = {};
    if(isAuthorized) {
      authHeader.headers = {
        'Authorization': `Bearer ${Cookies.get(COOKIE_KEYS.ACCESS_TOKEN)}`
      };
    }
    return authHeader;
  }
  /**
   * Method to post the request
   * @param {string} url 
   * @param {object} data 
   * @returns {object} response
   */
  static async post(url, data = {}, isAuthorized) {
    let result;
    try {
      const options = this.setAuthHeader(null, isAuthorized);
      const response = await axios.post(url, data, options);
      logger.info('Response: %o', response);
      result = response.data;
    } catch (error) {
      logger.error('Response Error: %o \n config: %o', error, error.toJSON());
      throw error;
    }
    return result;
  }

  static async get(url, isAuthorized) {
    let result;
    try {
      const options = this.setAuthHeader(null, isAuthorized);
      const response = await axios.get(url,options);
      logger.info('Response: %o', response);
      result = response.data;
    } catch (error) {
      logger.error('Response Error: %o \n config: %o', error, error.toJSON());
      throw error;
    }
    return result;
  }
}