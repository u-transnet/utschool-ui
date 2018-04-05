// @flow
import { SubmissionError } from 'redux-form';
import userStore from '../../stores/studentsTempData';

const sleep: any = ms => new Promise(resolve => setTimeout(resolve, ms));

export default function cheсkUser(values: any) {
  let accounts: any[] = [];
  for (let i of userStore) {
    accounts.push(i.account);
  }
  return sleep(100).then(() => {
    if (!accounts.includes(values.account)) {
      throw new SubmissionError({
        account: 'Такой учетной записи не существует.',
        _error: 'Login failed!'
      });
    } else {
      alert('Ok! ' + values.account + ' ' + values.rememberMe);
    }
  });
}
