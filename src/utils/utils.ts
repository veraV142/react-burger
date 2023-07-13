import { TIngredient } from "./data";


export function saveTokens(accessToken: string, refreshToken: string) 
{
  setCookie('accessToken', accessToken, 60*60*24*30)
  setCookie('refreshToken', refreshToken, 60*60*24*30)

  console.log(`saveTokens: accessToken=${accessToken}; refreshToken=${refreshToken};`);
}

export function clearTokens() 
{
  console.log(`clearTokens()`);
  setCookie('accessToken', '', 0)
  setCookie('refreshToken', '', 0)
}

export function clearCookie() {
  document.cookie = "";
}

export function setCookie(name: string, value: string, time: number) 
{
    const d = new Date();
    d.setTime(d.getTime() + time * 1000);

    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value + ';expires=' + d.toUTCString();
   
    document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
} 

export function buhFilter(it: TIngredient)  
{
    return it.type === 'bun';
}

export function otherFilter(it: TIngredient)  
{
    return it.type !== 'bun';
}

export function sumPrice(ingredients:Array<TIngredient>) {
    let sum = 0;
    ingredients.forEach(ing => sum += ing.price);
    return sum;
}

function getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
}

export function randomBuh(ingredients:Array<TIngredient>) {
    const data = ingredients.filter(buhFilter);
    const dataLen = Object.keys(data).length;

    const index = getRandomInt(dataLen);
    return data[index];
}

export function randomOtherIngredients(ingredients:Array<TIngredient>):Array<TIngredient> {
    const data = ingredients.filter(otherFilter); 

    const results:Array<TIngredient> = [];
    data.forEach(ing => {
        const add = getRandomInt(2);
        if (add === 1) 
            results.push(ing);
    });

    return results;
}

export const toDate = (inputDate: string) => {
  let dayDiff;
  const date = new Date(inputDate);
  const time = date.toLocaleTimeString("ru", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
  const currentDate = new Date();
  const diff = Math.round((currentDate.valueOf() - date.valueOf()) / (24 * 60 * 60 * 1000));

  if (diff === 0) dayDiff = "Сегодня, ";
  else if (diff === 1) dayDiff = "Вчера, ";
  else if (diff === 2) dayDiff = "2 дня назад, ";
  else if (diff === 3) dayDiff = "3 дня назад, ";
  else if (diff === 4) dayDiff = "4 дня назад, ";
  else dayDiff = `${diff} дней назад `;

  return `${dayDiff}${time}`;
};

