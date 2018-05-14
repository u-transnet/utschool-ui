// @flow
import fetch from 'isomorphic-fetch';

export default function getLectureDataApi(vkUrl: string, account: string) {
  let urlData = vkUrl.split('-')[1];
  let groupId = urlData.split('_')[0];
  let topicId = urlData.split('_')[1];
  let url =
    'https://api.vk.com/method/board.getTopics?access_token=f42d4ac8f42d4ac8f42d4ac851f44f2772ff42df42d4ac8aef9b8406849f91f1a8b1f86&group_id=' +
    groupId +
    '&topic_ids=' +
    topicId +
    '&preview=1&preview_length=0&extended=1&v=5.45';
  return fetch('https://cors-anywhere.herokuapp.com/' + url, {
    mode: 'cors'
  })
    .then(response => {
      if (response.status !== 200) {
        alert(
          'Looks like there was a problem. Status Code: ' + response.status
        );
        return;
      }
      return response.json();
    })
    .then(data => {
      let lectureData = {
        account: account,
        title: data.response.items[0].title,
        text: data.response.items[0].first_comment,
        closed: data.response.items[0].is_closed,
        teachername:
          data.response.profiles[0].first_name +
          ' ' +
          data.response.profiles[0].last_name,
        teacherphoto: data.response.profiles[0].photo_100
      };
      return lectureData;
    })
    .catch(error => error);
}
