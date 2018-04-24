// @flow
export const VK_ACCESS_TOKEN = 'VK_ACCESS_TOKEN';

export function setVkToken(val: boolean) {
  return {
    type: VK_ACCESS_TOKEN,
    vkToken: val
  };
}
