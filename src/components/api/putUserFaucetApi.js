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
  console.log(data);
  fetch(
    `https://cors-anywhere.herokuapp.com/` +
      `https://utschool.herokuapp.com/api/v1/accounts`,
    {
      headers: {
        'X-Prototype-Version': '1.6.1',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application / x-www-form-urlencoded; charset = UTF-8'
      },
      method: 'POST',
      body: data
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
