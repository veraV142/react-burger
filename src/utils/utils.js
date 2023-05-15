export function buhFilter(it)  
{
    return it.type === 'bun';
}

export function otherFilter(it)  
{
    return it.type !== 'bun';
}

export function sumPrice(ingredients) {
    let sum = 0;
    ingredients.forEach(ing => sum += ing.price);
    return sum;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function randomBuh(ingredients) {
    const data = ingredients.filter(buhFilter);
    const dataLen = Object.keys(data).length;

    const index = getRandomInt(dataLen);
    return data[index];
}

export function randomOtherIngredients(ingredients) {
    const data = ingredients.filter(otherFilter); 

    const results = [];
    data.forEach(ing => {
        const add = getRandomInt(2);
        if (add === 1) 
            results.push(ing);
    });

    return results;
}