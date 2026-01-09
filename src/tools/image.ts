import { BASE_URL } from '~/config/config';

export function downloadURI(uri: string, name: string) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const getUserAvatarSrc = (id: number | string) => {
  return `${BASE_URL}/v1/user/avatar?id=${id}`;
};

export const getImageSrc = (imageId: number | string) => {
  return `${BASE_URL}/v1/image/file/${imageId}`;
};
