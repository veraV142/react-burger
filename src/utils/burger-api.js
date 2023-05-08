import { dataUrl } from './data';

export const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getIngredients() {
    return fetch(`${dataUrl}/ingredients`)
     .then(checkReponse)
 }