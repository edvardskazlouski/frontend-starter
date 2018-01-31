import config from 'constants/config';

export default async function request(method, endpoint, token, requestBody) {
  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': token,
  };
  const body = requestBody && JSON.stringify(requestBody);
  const url = `${config.API_URL}${endpoint}`;

  const response = await fetch(url, { method, headers, body });
  return await response.json();
}
