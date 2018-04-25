// @flow

const REDIRECT_URL = 'http://localhost:3000/sign-up';
const PERMISSION =
  'status,email,photos,pages,friends,audio,notify,video,stories,notes,wall,ads,docs,groups,notifications,stats,market';

export default function vkAuthorization() {
  window.location.href =
    'https://oauth.vk.com/authorize?client_id=6450618&display=mobile&redirect_uri=' +
    REDIRECT_URL +
    '&scope=' +
    PERMISSION +
    '&response_type=token&v=5.74&state=123456&revoke=1';
}
