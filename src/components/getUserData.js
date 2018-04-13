// @flow

export default function(store: any, account: string) {
  for (let i of store) {
    if (i.account === account) {
      return i;
    }
  }
}
