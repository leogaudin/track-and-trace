import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

function sendRequest(method, endpoint, data = null) {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: `${BASE_URL}/${endpoint}`,
      data: data,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response.data.data);
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

export async function getBox(id) {
  return await sendRequest('get', `box/${id}`);
}

export async function getScans() {
  return await sendRequest('get', 'scans');
}

export async function getAdmins() {
  return await sendRequest('get', 'admins');
}
