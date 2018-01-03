import { API_URL } from 'constants/config';

export async function requestWithBody(method, endpoint, token, requestBody) {
  const headers = {
    'Content-Type': 'application/json',
    'x-access-token': token,
  };
  const body = requestBody && JSON.stringify(requestBody);
  const url = `${API_URL}${endpoint}`;

  const response = await fetch(url, { method, headers, body });
  return await response.json();
}
