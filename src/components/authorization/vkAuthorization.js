// @flow

const REDIRECT_URL = 'https://utschool.herokuapp.com/sign-up';
//const REDIRECT_URL = 'http://localhost:3000/sign-up';
const PERMISSION =
  'photos,audio,video,docs,notes,pages,status,offers,questions,wall,groups,email,notifications,stats,ads,offline,docs,pages,stats,notifications';

export default function vkAuthorization() {
  window.location.href =
    'https://oauth.vk.com/authorize?client_id=6450618&display=mobile&redirect_uri=' +
    REDIRECT_URL +
    '&scope=' +
    PERMISSION +
    '&response_type=token&v=5.74&state=123456&revoke=1';
}
