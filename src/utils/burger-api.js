import { dataUrl } from './data';
import { getCookie, saveTokens } from './utils';

export const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const fetchWithRefresh = async (url, options) => {
    try {
      const res = await fetch(url, options); //делаем запрос
      return await checkReponse(res);
    } catch (err) {
      if (err.message === "jwt expired") {
        const refreshToken = getCookie('refreshToken');
        if (refreshToken === null || refreshToken === undefined || refreshToken === '')
            return Promise.reject(err);
        const refreshData = await authToken(refreshToken); //обновляем токен

        console.log(`updateTokens`);
        console.log(`fetchWithRefresh==> refreshData.accessToken=${refreshData.accessToken}  refreshData.refreshToken=${refreshData.refreshToken}`);

        saveTokens(refreshData.accessToken, refreshData.refreshToken);
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options); //вызываем перезапрос данных
        return await checkReponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  };

export function saveAuthUser(name, email, password) 
{
    const isPasswordChange = password !== null && password !== '' && password !== undefined;
    const requestBody = isPasswordChange ? {name:name, email:email, password:password} : {name:name, email:email};

    const accessToken = getCookie('accessToken');

    return fetchWithRefresh(`${dataUrl}/auth/user`, {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          authorization: accessToken
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(requestBody)
      });
}

export function sendOrder(ingredients) 
{
    const ingredientsUids = [];
    ingredients.forEach(ing => {
        ingredientsUids.push(ing._id);
    });

    const order = {
        "ingredients": ingredientsUids
    }

    const accessToken = getCookie('accessToken');

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', authorization: accessToken },
        body: JSON.stringify(order)
    };

    return fetchWithRefresh(`${dataUrl}/orders`, requestOptions);
}

export function getAuthUser() 
{
    const accessToken = getCookie('accessToken');

    return fetchWithRefresh(`${dataUrl}/auth/user`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          authorization: accessToken
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      })
}

export function authLogout(refreshToken) 
{
    const requestBody = { "token": refreshToken };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };

    return fetch(`${dataUrl}/auth/logout`, requestOptions)
     .then(checkReponse);
}

export function authToken(refreshToken) 
{
    console.log(`authToken   refreshToken=${refreshToken}`)

    const requestBody = { "token": refreshToken };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };

    return fetch(`${dataUrl}/auth/token`, requestOptions)
     .then(checkReponse)
}

export function authRegister(email, password, name) 
{
    const requestBody = { "email": email, "password": password, "name":name};

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };

    return fetch(`${dataUrl}/auth/register`, requestOptions)
     .then(checkReponse)
}

export function authLogin(email, password) 
{
    const requestBody = { "email":email, "password": password};

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };

    return fetch(`${dataUrl}/auth/login`, requestOptions)
     .then(checkReponse)
}

export function newPassword(password, token) 
{
    const requestBody = { "password": password, "token":token};

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };

    return fetch(`${dataUrl}/password-reset/reset`, requestOptions)
     .then(checkReponse)
}

export function passwordReset(email) {

    const requestBody = { "email": email };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };

    return fetch(`${dataUrl}/password-reset`, requestOptions)
     .then(checkReponse)
}

export function loadIngredients() {
    return fetch(`${dataUrl}/ingredients`)
     .then(checkReponse)
}


