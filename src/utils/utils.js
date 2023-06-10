import { TOKEN_INVALID } from "../services/actions/user";
import { authToken } from "./burger-api";

export function withCheckToken( dispatch, action, failAction ) {
  const accessToken = getCookie('accessToken');
  console.log(`withCheckToken  accessToken=${accessToken}`);
  if (accessToken===null || accessToken==='undefined' || accessToken==='' || accessToken==='null') {
      const refreshToken = getCookie('refreshToken');
      console.log(`withCheckToken  refreshToken=${refreshToken}`);
      if (refreshToken === '' || refreshToken === undefined || refreshToken === null)
      {
        dispatch({ type: TOKEN_INVALID });
        return;
      }
      authToken(refreshToken)
        .then(response=> {
          if (response.success === 'true') {
              saveTokens(response.accessToken, response.refreshToken);
              action();
          } 
          else {
              dispatch({ type: failAction });
          }
        })
        .catch(error => {
          console.log(`withCheckToken error=${error.message}`);
          if (error.message === 'Token is invalid') {
              dispatch({ type: TOKEN_INVALID });
          }
          else 
              dispatch({ type: failAction });
        });
  }
  else {
    action();
  }
}

export function saveTokens(accessToken, refreshToken) 
{
  setCookie('accessToken', accessToken, 60*60*20)
  setCookie('refreshToken', refreshToken, 60*60*24*30)

  console.log(`saveTokens: accessToken=${accessToken}; refreshToken=${refreshToken};`);
}

export function clearTokens() 
{
  setCookie('accessToken', '', 0)
  setCookie('refreshToken', '', 0)
}

export function clearCookie() {
  document.cookie = null;
}

export function setCookie(name, value, props) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
      updatedCookie += '; ' + propName;
      const propValue = props[propName];
      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
    document.cookie = updatedCookie;
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
} 

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

