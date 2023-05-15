import { dataUrl } from './data';

export const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function loadIngredients() {
    return fetch(`${dataUrl}/ingredients`)
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

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
    };

    return fetch(`${dataUrl}/orders`, requestOptions)
        .then(checkReponse);
}
