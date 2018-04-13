// @flow
import userStore from '../stores/usersTempData';
export default function(account: string) {
  for (let i of userStore) {
    if (i.account === account) {
      return i;
    }
  }
}
