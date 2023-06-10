import { dataUrl } from './data';
import { getCookie } from './utils';

export const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function saveAuthUser(name, email) 
{
    const requestBody = {name:name, email:email};

    const accessToken = getCookie('accessToken');

    return fetch(`${dataUrl}/auth/user`, {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(requestBody)
      })
     .then(checkReponse)
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
        headers: { 'Content-Type': 'application/json', Authorization: accessToken },
        body: JSON.stringify(order)
    };

    return fetch(`${dataUrl}/orders`, requestOptions)
        .then(checkReponse);
}

export function getAuthUser() 
{
    const accessToken = getCookie('accessToken');

    return fetch(`${dataUrl}/auth/user`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      })
     .then(checkReponse)
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


