import { BASE_URL } from '~/config/constants';

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

export const getImageSrc = (
  imageId: number | string,
  opts: { v?: string | number; origin?: boolean; width?: number }
) => {
  let url = `${BASE_URL}/v1/image/file/${imageId}`;

  const querys: string[] = [];
  if (opts?.v) {
    querys.push(`v=${opts?.v}`);
  }
  if (opts?.origin) {
    querys.push(`origin=true`);
  }
  if (opts?.width) {
    querys.push(`width=${opts?.width}px`);
  }

  if (querys?.length) {
    url += `?${querys?.join('&')}`;
  }

  return url;
};
