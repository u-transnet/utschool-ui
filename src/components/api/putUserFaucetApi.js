// @flow

import fetch from 'isomorphic-fetch';

export default function putUserFaucetApi(
  account: string,
  password: string,
  social: string
) {
  let json = {
    name: account,
    social_network: social,
    access_token: 'example_token',
    owner_key: 'BTSrgbcctkwswdqczzeqwz24',
    active_key: 'BTSgdrrkm845cvdnkddjakws',
    memo_key: 'BTSgdrrkm845cvdnkddjakws',
    referrer: 'example_referrer'
  };

  return fetch(
    'https://cors-anywhere.herokuapp.com/' +
      `https://utschool.herokuapp.com/api/v1/accounts?accounts=${account}`,
    {
      method: 'post',
      mode: 'cors'
    }
  )
    .then()
    .catch(error => {
      return error;
    });
}
