// @flow

import Api from 'utschool-js';
import { Login, PrivateKey, key } from 'bitsharesjs';

export default function registrationLecture(
  account: string,
  lectureAccount: string
) {
  let keys = Login.generateKeys(account, '!234567Qwertyu', '', 'BTS');
  let nodeUrl = 'wss://bitshares.openledger.info/ws'; // Url ноды Bitshares
  let accountName = account;
  let privateKey = keys.privKeys.active.toWif(); //Приватный ключ
  return Api.init(nodeUrl, accountName, privateKey).then(api => {
    return api.studentApi
      .applyForLecture(lectureAccount)
      .then(resp => {
        return resp;
      })
      .catch(error => error);
  });
}
