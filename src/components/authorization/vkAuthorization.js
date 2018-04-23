// @flow

const REDIRECT_URL = 'http://localhost:3000/sign-up';

export default function vkAuthorization() {
  window.location.href =
    'https://oauth.vk.com/authorize?client_id=6450618&display=page&redirect_uri=' +
    REDIRECT_URL +
    '&scope=friends&response_type=token&v=5.74&state=123456';
}
