// @flow

export default function(data: any, account: string) {
  for (let i of data) {
    if (i.account === account) return i;
  }
}
