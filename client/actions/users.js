import axios from 'axios';
import qs from 'qs';
import { AsyncStorage, ToastAndroid } from 'react-native';
import { Config } from '../config';
import NavigationService from '../navigation_service';

export const FETCHED_CUR_USER = 'FETCHED_CUR_USER';


export function signin(username, password) {
  return async dispatch => {
    try {
      const response = await axios.post(`${Config.server}/api/oauth/token`,
        qs.stringify({
          username: username,
          password: password,
          client_secret: Config.clientSecret,
          client_id: Config.clientId,
          grant_type: 'password'
        }), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
      await AsyncStorage.setItem('accessToken', response.data.access_token);
      const curU = await axios.get(`${Config.server}/api/users/me`);
      dispatch({type: FETCHED_CUR_USER, payload: curU.data});
    
      NavigationService.navigate('App');
    } catch (err) {
      console.log(err.response || err);
      alert('Invalid ID or Password');
    }
  };
}

export function signUp(username, password) {
  return async () => {
    try {
      await axios.post(`${Config.server}/api/users`,
        {
          username: username,
          password: password,
        }, {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      ToastAndroid.show('가입 완료. 로그인하세요', ToastAndroid.SHORT);
      NavigationService.navigate('Auth');
    } catch (err) {
      console.log(err.response || err);
      alert('ID exists.');
    }
  }
}

export function signout() {
  return async () => {
    delete axios.defaults.headers.common['Authorization'];
    await AsyncStorage.clear();
    NavigationService.navigate('Auth');
  };
}
