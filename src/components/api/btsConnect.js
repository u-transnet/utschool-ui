// @flow

import Api from 'utschool-js';
import changedNode from './changedNode';

const NODE = 'wss://bitshares.openledger.info/ws'; // Url ноды Bitshares
let node = NODE;
let accountName = 'guest';
let privateKey = null;
let reloadNumber = 0;

export default function btsConnect(account: string) {
  accountName = account;
  let api = apiConnect();
  return api;
}
function apiConnect() {
  return Api.init(node, accountName, privateKey)
    .then(api => api)
    .catch(error => {
      if (reloadNumber < 10) {
        reloadNumber++;
        node = changedNode(node);
        apiConnect();
      }
    });
}
