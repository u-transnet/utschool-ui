// @flow

import fetch from 'isomorphic-fetch';

export default function getUserFaucetApi(account: string) {
  return fetch(
    `https://utschool.herokuapp.com/api/v1/accounts?accounts=${account}`,
    {
      mode: 'cors'
    }
  )
    .then(response => {
      if (response.status !== 200) {
        alert(
          'Looks like there was a problem. Status Code: ' + response.status
        );
        return;
      }
      // Examine the text in the response
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(function(error) {
      return error;
    });
}
