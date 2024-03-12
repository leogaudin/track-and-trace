import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3000/api' : 'https://track-and-trace-api.vercel.app/api';

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

export async function getBoxesByAdminId(adminId, skip, limit) {
  return await sendRequest('get', `boxes/${adminId}?skip=${skip}&limit=${limit}`);
}

export async function getBox(id) {
  return await sendRequest('get', `box/${id}`);
}

export async function deleteBoxes(boxes) {
  const batchSize = 250;
  const idsToDelete = boxes.map(box => box.id);
  const deleteConditions = { id: { $in: [] } };
  const requestBody = { deleteConditions };
  let startIndex = 0;
  let endIndex = batchSize;
  let deletedCount = 0;

  while (startIndex < idsToDelete.length) {
    const batchIds = idsToDelete.slice(startIndex, endIndex);
    deleteConditions.id.$in = batchIds;
    const response = await sendRequest('delete', 'boxes', requestBody);
    deletedCount += response.deletedCount;
    startIndex = endIndex;
    endIndex = startIndex + batchSize;
  }

  return { deletedCount };
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

export async function setInsights(id, publicInsights) {
  return await sendRequest('post', 'insights', { id, publicInsights });
}

export async function getInsights(id) {
  return await sendRequest('get', `insights/${id}`);
}

export function groupByProperty(boxes, propertyName) {
  return boxes.reduce((acc, box) => {
    const property = box[propertyName];
    if (!property) {
      return acc;
    }
    if (!acc[property]) {
      acc[property] = [];
    }
    acc[property].push(box);
    return acc;
  }, {});
}

export function getLastFinalScan(box) {
  const scans = box.scans;
  if (!scans || !scans.length) return null;
  const finalScans = scans.filter(scan => scan.finalDestination);
  if (!finalScans.length) return null;
  return finalScans.reduce((acc, scan) => {
    return acc.time > scan.time ? acc : scan;
  });
}

export function getLastMarkedAsReceivedScan(box) {
  const scans = box.scans;
  if (!scans || !scans.length) return null;
  const markedAsReceivedScans = scans.filter(scan => scan.markedAsReceived);
  if (!markedAsReceivedScans.length) return null;
  return markedAsReceivedScans.reduce((acc, scan) => {
    return acc.time > scan.time ? acc : scan;
  });
}
