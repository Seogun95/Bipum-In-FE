import axios from 'axios';
import QUERY from '../constants/query';
import { getCookie, setCookie } from '../utils/cookie';
import Storage from '../utils/localStorage';

export default class Axios {
  constructor(url) {
    this.instance = axios.create({
      baseURL: url,
    });

    this.instance.interceptors.response.use(
      response => {
        const token = response.headers.authorization;

        if (token) {
          const [, parseToken] = token.split(' ');
          setCookie(QUERY.COOKIE.COOKIE_NAME, parseToken);

          // Storage.setUserName(userName.sub);
        }
        return response;
      },
      error => {
        alert(error.response.data.result);
        return Promise.reject(error);
      }
    );
  }

  async get(path) {
    const cookie = getCookie(QUERY.COOKIE.COOKIE_NAME);
    const option = {
      headers: {
        Authorization: `Bearer ${cookie ? cookie : ''}`,
      },
    };
    return this.instance.get(path, option);
  }

  async post(path, payload) {
    const cookie = getCookie(QUERY.COOKIE.COOKIE_NAME);
    const option = {
      headers: {
        Authorization: `Bearer ${cookie ? cookie : ''}`,
      },
    };
    return this.instance.post(path, payload, option);
  }

  async delete(path) {
    const cookie = getCookie(QUERY.COOKIE.COOKIE_NAME);
    const option = {
      headers: {
        Authorization: `Bearer ${cookie ? cookie : ''}`,
      },
    };
    return this.instance.delete(`${path}`, option);
  }

  async put(path, payload) {
    const cookie = getCookie(QUERY.COOKIE.COOKIE_NAME);
    const option = {
      headers: {
        Authorization: `Bearer ${cookie ? cookie : ''}`,
      },
    };
    return this.instance.put(`${path}`, payload, option);
  }
}
