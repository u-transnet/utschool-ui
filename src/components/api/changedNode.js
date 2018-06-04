// @flow

const NODES = [
  'wss://bitshares.crypto.fans/ws',
  'wss://eu.openledger.info/ws',
  'wss://dex.rnglab.org',
  'wss://dexnode.net/ws',
  'wss://bts.proxyhosts.info/wss',
  'wss://bitshares.openledger.info/ws'
];

export default function changedNode(brokenNode: string | void) {
  let n = NODES.length;
  let random = Math.floor(Math.random() * n);
  let newNode = NODES[random];
  if (brokenNode === newNode) {
    changedNode(newNode);
  } else {
    return newNode;
  }
}
