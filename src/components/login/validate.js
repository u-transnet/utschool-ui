// @flow

export default function(values: any) {
  const errors = {};
  const requiredFields = ['account'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Введите номер учетной записи';
    }
  });
  return errors;
}
