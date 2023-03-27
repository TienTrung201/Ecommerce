function getToken() {
  return localStorage.getItem('token');
}

async function checkedResponse(response) {
  switch (response.status) {
    case 401:
      throw new Error('unauthorized');
    case 403:
      throw new Error('forbidden');
    case 200:
      return await response.json();
    default:
      const error = await response.json();
      throw new Error(JSON.stringify(error));
  }
}

export async function getData(url = '') {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return await checkedResponse(response);
}

export async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(data),
  });

  return await checkedResponse(response);
}

export async function updateData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(data),
  });

  return await checkedResponse(response);
}

export async function deleteData(url = '') {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return await checkedResponse(response);
}
