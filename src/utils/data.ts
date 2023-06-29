export type TIngredient = {
   _id: string,
   name?: string,
   type?: string,
   proteins?: number,
   fat?: number,
   carbohydrates?: number,
   calories?: number,
   price: number,
   image?: string,
   image_mobile?: string,
   image_large?: string,
   __v?: number,
   selected?: boolean, 
   uuid?: string
}

export type TIngredientLoadResponse = {
	data: Array<TIngredient>;
	success: boolean;
}

export type TUserLoadResponse = {
	user: TUser;
   message?:string;
	success: boolean;
}

export type TLoadResponse = {
	success: boolean;
}

export type TOrder = {
   number: number
}

export type TSendOrderResponse = {
   success: boolean;
   order: TOrder
}

export type TRequestOptions = {
      method: string,
      mode?: string 
      cache?:string,
      credentials?:string,
      headers: THeader,
      body?: string,
      redirect?: string,
      referrerPolicy?: string,  
}

export type THeader = 
{
   'Content-Type': string, 
   authorization: string
}

export type TUser = 
{
   email?: string,
   name?: string,
   accessToken?: string,
   refreshToken?: string,
   isError?:boolean
}


export const dataUrl = 'https://norma.nomoreparties.space/api';

export const data: Array<TIngredient> = [
    {
       "_id":"60666c42cc7b410027a1a9b1",
       "name":"Заглушка",
       "type":"bun",
       "proteins":80,
       "fat":24,
       "carbohydrates":53,
       "calories":420,
       "price":1255,
       "image":"https://code.s3.yandex.net/react/code/bun-02.png",
       "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
       "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
       "__v":0
    },
 ] 