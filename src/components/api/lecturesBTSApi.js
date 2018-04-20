// @flow
import Api from 'utschool-js';

export default function lecturesBTSApi(account: string) {
  let nodeUrl = 'wss://bitshares.openledger.info/ws'; // Url ноды Bitshares
  let accountName = account;
  let privateKey = null; //Приватный ключ

  return Api.init(nodeUrl, accountName, privateKey).then(api => {
    return api.studentApi
      .getLectures()
      .then(resp => {
        return resp;
      })
      .catch(error => {
        alert(error);
      });
  });
}
