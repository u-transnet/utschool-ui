// @flow
import Api from 'schoolapi';

export default function getData(account: string) {
  let nodeUrl = 'wss://bitshares.openledger.info/ws'; // Url ноды Bitshares
  let accountName = 'markup-ua'; // Имя учетной записи uts-bch-intro, uts-common-info, ut-school or my markup-ua
  let privateKey = '5KhUTQgpAk61Vym3mg6S3sAV5LWUgwp2NczXukpogRqemv7Fxv8'; // Приватный ключ

  Api.init(nodeUrl, accountName, privateKey).then(api => {
    api.studentApi
      .getLectures()
      .then(resp => {
        //console.log(resp);
      })
      .catch(error => {
        //console.log(error);
      });
  });
}
