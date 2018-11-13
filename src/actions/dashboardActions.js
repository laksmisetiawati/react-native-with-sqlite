import { AsyncStorage } from 'react-native';
import {
  AUTH_LOADING,
  AUTHENTICATED,
  AUTHENTICATING,
  AUTHENTICATION_ERROR,
  REFRESH_ERRORS,
  GET_CURRENT_USER_SUCCESS,
  TO_2FA,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTRATION_START,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  ACTIVATION_START,
  ACTIVATION_SUCCESS,
  ACTIVATION_ERROR,
  QR_AUTH_START,
  QR_AUTH_SUCCESS,
  QR_AUTH_ERROR,
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  CHANGE_PASSWORD_START,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  FORGOT_PASSWORD_OPEN,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_TOKEN_SET
} from './actionTypes';

import {
  ROOT_URL
} from '../configs/settings';

import crypto from "crypto";
import '../../shim';
// import crypto from "crypto";

import axios from 'axios';
import {
  Alert
} from 'react-native';

import deviceInfo from '../utils/deviceInfo';
import { getFromStorage, saveToStorage, removeFromStorage } from './storageActions';
import { AxiosExpanded } from '../api/axiosExpanded';

const authLoading = data => ({
  type: AUTH_LOADING,
  payload: data
});
const to2FA = (link) => ({ type: TO_2FA, payload: {link, showModal: true} });

export const close2FA = () => ({ type: TO_2FA, payload: {showModal: false, link: null} });

export const clearError = () => ({
  type: AUTHENTICATION_ERROR,
  payload: null
});

export const authenticationSuccess = data => ({
  type: AUTHENTICATED,
  payload: data
});

export const requestTwoFa = url => async dispatch => {
  try {
    let res = axios.get(`${ROOT_URL}${url}`);
  } catch (err) {
    console.log('error get 2fa', err.response);
  }
};

const authenticationFailed = err => {

  return async dispatch => {
    // Alert.alert(
    //   'Authentication Error',
    //   err.data && err.data.message && err.data.message,
    //   [
    //     {text: 'OK', onPress: () => console.log('ini emang pasti ke execute?')},
    //   ],
    //   { cancelable: false }
    // );
    // if(err.data.name && err.data.name == "Invalid2FA") {
    //   dispatch(close2FA());
    // }

    dispatch({
      type: AUTHENTICATION_ERROR,
      payload: err
    });
  }
}

export function login(username, password, token2fa = null) {
  return async dispatch => {
    dispatch({ type: LOGIN_START });
    try {
      let ecdh = crypto.createECDH("secp256k1");
      ecdh.generateKeys();
      const ecdhPublicKey = ecdh.getPublicKey("base64");
      let keychange = await axios.post(`${ROOT_URL}/api/v1/auth/keychange`, {
        key: ecdhPublicKey
      });


      let secretkey = ecdh.computeSecret(
        Buffer.from(keychange.data.key, "base64")
      );

      const aesKey = crypto.pbkdf2Sync(secretkey, "d3nm4s3n0", 11537, 32, "sha512");
      const aesSalt = crypto.pbkdf2Sync(ecdh.getPublicKey(), "d3nm4s3n0", 11537, 16, "sha512");
      let aes = crypto.createCipheriv("aes-256-ctr", aesKey, aesSalt);

      let loginname = Buffer.concat([
        aes.update(Buffer.from(username, "utf8")),
        aes.final()
      ]).toString("base64");


      let saltResp = await axios.post(`${ROOT_URL}/api/v1/auth/salt`, {
        key: ecdh.getPublicKey("base64"),
        login: loginname
      });

      let aesd = crypto.createDecipheriv("aes-256-ctr", aesKey, aesSalt);
      let salt = Buffer.concat([
        aesd.update(Buffer.from(saltResp.data.salt, "base64")),
        aesd.final()
      ]);

      let hpassword = crypto.pbkdf2Sync(password, salt, 13713, 64, "sha512");

      aes = crypto.createCipheriv("aes-256-ctr", aesKey, aesSalt);
      let xpassword = Buffer.concat([
        aes.update(hpassword),
        aes.final()
      ]).toString("base64");

      let xtoken2fa = null;
      if (token2fa) {
        aes = crypto.createCipheriv("aes-256-ctr", aesKey, aesSalt);
        xtoken2fa = Buffer.concat([
          aes.update(Buffer.from(token2fa, "utf-8")),
          aes.final()
        ]).toString("base64");
      }

      let res = await axios.post(`${ROOT_URL}/api/v1/auth`, {
        key: ecdh.getPublicKey("base64"),
        login: loginname,
        password: xpassword,
        token2fa: xtoken2fa
      });

      res.data.secretkey = secretkey.toString("base64");
      res.data.ecdhPublicKey = ecdhPublicKey;
      dispatch({type: LOGIN_SUCCESS, payload: res.data});
      dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: res.data.user });
      let resData = JSON.stringify(res.data);
      await removeFromStorage('user');
      await saveToStorage("user", resData);
      return res.data;
    } catch (err) {
      dispatch({type: LOGIN_ERROR});
      const error = err.response ? err.response : err;

      if (err.response && err.response.data.message === "Require 2FA") {
        dispatch(to2FA(err.response.data.link));
        return false;
      } else {
        dispatch({type: LOGIN_ERROR, payload: error});
        throw error;
      }
    }
  };
}