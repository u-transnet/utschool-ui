// @flow

export default function(values: any) {
  const errors = {};
  const requiredFields = ['account', 'newaccount', 'password'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Поле должно быть заполнено';
    }
  });
  return errors;
}
