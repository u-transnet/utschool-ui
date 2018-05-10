// @flow

import Api from 'utschool-js';

export default function getUserLectureData(
  userAccount: string,
  lectureAccount: string
) {
  let nodeUrl = 'wss://bitshares.openledger.info/ws'; // Url ноды Bitshares
  let accountName = userAccount;
  let privateKey = null; //Приватный ключ

  return Api.init(nodeUrl, accountName, privateKey).then(api => {
    return api.studentApi
      .getLectureStats(lectureAccount)
      .then(resp => resp)
      .catch(error => error);
  });
}
