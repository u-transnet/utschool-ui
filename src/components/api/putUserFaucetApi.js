// @flow
import { Login } from 'bitsharesjs';
import fetch from 'isomorphic-fetch';
import { SubmissionError } from 'redux-form';

export default function putUserFaucetApi(
  account: string,
  password: string,
  social: string,
  token: string
) {
  // validation of password
  let passValid = password
    ? password.match(
        /(?=.*[0-9])(?=.*[!@#$%|^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{12,}/g
      )
    : false;

  if (!passValid) {
    throw new SubmissionError({
      password:
        '12 символов минимум (цыфры, большие и маленькие буквы, символы).',
      _error: 'SignUp failed!'
    });
  }
  // end validation of password

  let keys = Login.generateKeys(account, password);
  let data = {
    name: account,
    social_network: social,
    access_token: token,
    owner_key: keys.pubKeys.active,
    active_key: keys.pubKeys.memo,
    memo_key: keys.pubKeys.owner,
    referrer: 'ut-school'
  };
  // TODO проверить формат отправки даты с помощью fetch
  let postData = Object.keys(data)
    .map(key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
    })
    .join('&');

  return fetch(
    `https://cors-anywhere.herokuapp.com/` +
      `https://utschool.herokuapp.com/api/v1/accounts`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json; charset=utf-8'
      },
      method: 'post',
      body: postData
    }
  )
    .then(res => res.json())
    .then(data => data)
    .catch(error => error);
}
