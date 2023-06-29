import { TIngredient, TIngredientLoadResponse, TRequestOptions, TUser, TUserLoadResponse, dataUrl } from './data';
import { getCookie, saveTokens } from './utils';

export const checkReponse = <T>(res: Response): Promise <T> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const fetchWithRefresh = async <T>(url:string, options:any):Promise<T> => {
    try {
      const res = await fetch(url, options); //делаем запрос
      return await checkReponse<T>(res);
    } catch (err:any) {
      if (err.message === "jwt expired") {
        const refreshToken = getCookie('refreshToken');
        if (refreshToken === null || refreshToken === undefined || refreshToken === '')
            return Promise.reject(err);
        const refreshData = await authToken(refreshToken); //обновляем токен

        console.log(`updateTokens`);
        console.log(`fetchWithRefresh==> refreshData.accessToken=${refreshData.accessToken}  refreshData.refreshToken=${refreshData.refreshToken}`);

        saveTokens(refreshData.accessToken??"", refreshData.refreshToken??"");
        options.headers.authorization = refreshData.accessToken??"";
        const res = await fetch(url, options); //вызываем перезапрос данных
        return await checkReponse<T>(res);
      } else {
        return Promise.reject(err);
      }
    }
  };

interface ISaveAuthUserResponse {
    success:boolean,
    user: TUser,

}

export function saveAuthUser(name:string, email:string, password:string) 
{
    const isPasswordChange = password !== null && password !== '' && password !== undefined;
    const requestBody = isPasswordChange ? {name:name, email:email, password:password} : {name:name, email:email};

    const accessToken = getCookie('accessToken');

    return fetchWithRefresh<ISaveAuthUserResponse>(`${dataUrl}/auth/user`, {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          authorization: accessToken??""
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(requestBody)
      });
}

interface ISendOrder {
    success: boolean,
    order:IOrder
}

interface IOrder {
    number: number
}

export function sendOrder(ingredients: Array<TIngredient>) 
{
    const ingredientsUids:Array<string> = [];
    ingredients.forEach(ing => {
        ingredientsUids.push(ing._id);
    });

    const order = {
        "ingredients": ingredientsUids
    }

    const accessToken = getCookie('accessToken');

    const requestOptions: TRequestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', authorization: accessToken??"" },
        body: JSON.stringify(order)
    };

    return fetchWithRefresh<ISendOrder>(`${dataUrl}/orders`, requestOptions);
}

export function getAuthUser() 
{
    const accessToken = getCookie('accessToken');
    console.log(`getAuthUser(): accessToken = ${accessToken}`);

    const options: TRequestOptions = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',  
        headers: {
          'Content-Type': 'application/json',
          authorization: accessToken??""
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      };

    return fetchWithRefresh<TUserLoadResponse>(`${dataUrl}/auth/user`, options)
}

export interface IAuthLogout {
    success:boolean
}

export function authLogout(refreshToken:string) 
{
    const requestBody = { "token": refreshToken };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };

    return fetch(`${dataUrl}/auth/logout`, requestOptions)
     .then(checkReponse<IAuthLogout>);
}

export interface IAuthResponse {
    success: boolean,
    accessToken: string;
    refreshToken:string;
}

export function authToken(refreshToken:string) 
{
    console.log(`authToken   refreshToken=${refreshToken}`)

    const requestBody = { "token": refreshToken };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };

    return fetch(`${dataUrl}/auth/token`, requestOptions)
     .then(checkReponse<IAuthResponse>)
}

export interface IAuthRegisterResponse {
    success:boolean,
    accessToken:string,
    refreshToken:string,
    user:TUser
}

export function authRegister(email:string, password:string, name:string) 
{
    const requestBody = { "email": email, "password": password, "name":name};

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };

    return fetch(`${dataUrl}/auth/register`, requestOptions)
     .then(checkReponse<IAuthRegisterResponse>)
}

export interface IAuthLogin {
    success:boolean,
    accessToken:string,
    refreshToken:string,
    user:TUser
} 

export function authLogin(email:string, password:string) 
{
    const requestBody = { "email":email, "password": password};

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };

    return fetch(`${dataUrl}/auth/login`, requestOptions)
     .then(checkReponse<IAuthLogin>)
}

export interface INewPassword {
    success:boolean,
} 

export function newPassword(password:string, token:string) 
{
    const requestBody = { "password": password, "token":token};

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };

    return fetch(`${dataUrl}/password-reset/reset`, requestOptions)
     .then(checkReponse<INewPassword>)
}

interface IPasswordResetResponce {
    success: boolean
}

export function passwordReset(email:string) {

    const requestBody = { "email": email };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    };

    return fetch(`${dataUrl}/password-reset`, requestOptions)
     .then(checkReponse<IPasswordResetResponce>)
}

export const loadIngredients = async () => {
    return fetch(`${dataUrl}/ingredients`)
     .then(checkReponse<TIngredientLoadResponse>)
}


