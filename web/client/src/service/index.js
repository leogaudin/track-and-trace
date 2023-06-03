import axios from 'axios';

const BASE_URL = 'https://track-and-trace-api.vercel.app/api';

function sendRequest(method, endpoint, data = null, headers = {}) {
  const user = JSON.parse(localStorage.getItem('user'));
  const authorization = user ? user['apiKey'] : null;
  const requestHeaders = {
    'Content-Type': 'application/json',
    'X-Authorization': authorization,
    ...headers,
  };

  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: `${BASE_URL}/${endpoint}`,
      data: data,
      headers: requestHeaders
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data);
        } else {
          reject(new Error(`Request failed with status code ${response.status}`));
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

export async function addBox(box) {
  return await sendRequest('post', 'box', box);
}

export async function addBoxes(boxes) {
  return await sendRequest('post', 'boxes', boxes);
}

export async function getBoxes() {
  return await sendRequest('get', 'boxes');
}

export async function getBoxesByAdminId(adminId) {
  return await sendRequest('get', `boxes/${adminId}`);
}

export async function getBox(id) {
  return await sendRequest('get', `box/${id}`);
}

export async function deleteBoxes(boxes) {
  const idsToDelete = boxes.map(box =>  box.id);
  const deleteConditions = { id: { $in: idsToDelete } };
  const requestBody = { deleteConditions };
  return await sendRequest('delete', `boxes`, requestBody);
}

export async function getScans() {
  return await sendRequest('get', 'scans');
}

export async function getScansByBoxes(boxIds) {
  return await sendRequest('post', 'scans', boxIds);
}

export async function getAdmins() {
  return await sendRequest('get', 'admins');
}

export async function getCountryName(coordinates) {
  return await sendRequest('post', 'country', coordinates);
}

export async function login(user) {
  return await sendRequest('post', 'login', user);
}

export async function register(user) {
  return await sendRequest('post', 'register', user);
}
