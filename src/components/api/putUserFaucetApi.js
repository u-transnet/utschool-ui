// @flow
import { Login } from 'bitsharesjs';
import fetch from 'isomorphic-fetch';

export default function putUserFaucetApi(
  account: string,
  password: string,
  social: string,
  token: string
) {
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
  fetch(
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
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(JSON.stringify(data));
    })
    .catch(error => console.log('error ' + error));
}
