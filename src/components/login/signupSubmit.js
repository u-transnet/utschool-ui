// @flow
import { SubmissionError } from 'redux-form';
import userStore from '../../stores/studentsTempData';

const sleep: any = ms => new Promise(resolve => setTimeout(resolve, ms));

export default function signupSubmit(values: any) {
  let accounts: any[] = [];
  for (let i of userStore) {
    accounts.push(i.account);
  }
  return sleep(100).then(() => {
    let passValid = values.password
      ? values.password.match(
          /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g
        )
      : false;
    if (accounts.includes(values.newaccount)) {
      throw new SubmissionError({
        newaccount: 'Такая запись уже существует.',
        _error: 'SignUp failed!'
      });
    } else if (!passValid) {
      throw new SubmissionError({
        password:
          '8 символов минимум (цыфры, большие и маленькие буквы, символы).',
        _error: 'SignUp failed!'
      });
    } else {
      alert(
        'Ok! ' +
          values.newaccount +
          ' ' +
          values.password +
          ' ' +
          values.rememberMe
      );
    }
  });
}
