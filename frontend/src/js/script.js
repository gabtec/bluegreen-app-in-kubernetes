(function () {
  'use strict';

  // const apiUrl = 'http://api.127.0.0.1.nip.io';
  const apiUrl = '/api';

  function printApiUrl() {
    const el = document.getElementById('apiUrl');
    el.innerHTML = apiUrl;
  }

  function printWebServerName() {
    const elWebServer = document.getElementById('serverField');
    elWebServer.innerHTML = location.hostname;
  }

  async function printApiServerName() {
    console.log('REQ. to API...');
    const resp = await fetch(`${apiUrl}/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      mode: 'cors',
      cache: 'default',
    });

    const d = await resp.json();

    console.log(d);
    const elApiServer = document.getElementById('apiField');
    elApiServer.innerHTML = d.server;
  }

  async function printApiData() {
    console.log('REQ. to API /users...');
    const resp = await fetch(`${apiUrl}/users`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      mode: 'cors',
      cache: 'default',
    });

    const d = await resp.json();

    console.log(d);
    const apiDataElement = document.getElementById('apiData');
    apiDataElement.innerHTML =
      d.users[0].id + ' | ' + d.users[0].name + ' | ' + d.users[0].country;
  }

  printApiServerName();
  printApiUrl();
  printWebServerName();
  printApiData();
})();
