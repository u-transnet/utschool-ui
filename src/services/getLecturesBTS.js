// @flow
import Api from 'utschool-js';

export default function getLecturesBTS(account: string) {
  let nodeUrl = 'wss://bitshares.openledger.info/ws'; // Url ноды Bitshares
  let accountName = account; // Имя учетной записи
  let privateKey = null; //Приватный ключ

  Api.init(nodeUrl, accountName, privateKey).then(api => {
    api.studentApi
      .getLectures()
      .then(resp => {
        return resp;
      })
      .catch(error => {
        return error;
      });
  });
}
