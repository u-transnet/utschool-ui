// @flow

import Api from 'utschool-js';
import { Login } from 'bitsharesjs';

export default function acceptApplication(
  account: string,
  lectureApplicationId: string,
  password: string
) {
  let keys = Login.generateKeys(account, password, '', 'BTS');
  let nodeUrl = 'wss://bitshares.openledger.info/ws'; // Url ноды Bitshares
  let accountName = account;
  let privateKey = keys.privKeys.active.toWif(); //Приватный ключ

  return Api.init(nodeUrl, accountName, privateKey).then(api => {
    return api.teacherApi
      .acceptApplication(lectureApplicationId)
      .then(resp => resp)
      .catch(error => error);
  });
}
