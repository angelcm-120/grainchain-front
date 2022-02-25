import axios from "axios";
import { serverExpress } from '../../../../redux/config'

export const LOGIN_URL = "api/auth/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = "api/me";

export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

//var promise = require('promise');
const express = `${serverExpress}users`

export function loginCycMovil(email, password) {
  return fetch(`${express}/login?us=${email}&pw=${password}`)
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function registerCyCMovil(email, fullname, password, department) {
  return fetch(`${express}/register?fullname=${fullname}&email=${email}&pw=${password}&department=${department}`)
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function requestPasswordCyCMovil(email) {
  return fetch(`${express}/sendpw?us=${email}`)
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}

export function updatePassword(email, currentpw, newpw, accessToken) {
  return fetch(`${express}/updatepw?email=${email}&pw=${currentpw}&pw2=${newpw}`, {
    headers: {
      'Authorization': "Bearer " + accessToken
    }
  })
}

export function updateInfoPersonal(email, firstname, lastname, companyName, phone, website, accessToken) {
  return fetch(`${express}/updateinfopersonal?email=${email}&firstname=${firstname}&lastname=${lastname}&companyName=${companyName}&phone=${phone}&website=${website}`, {
    headers: {
      'Authorization': "Bearer " + accessToken
    }
  })
}