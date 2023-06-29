import {FC} from 'react';
import { memo} from 'react';


export const NotFoundPage:FC = () => 
{
    return (
        <>
           Страница не найдена, или недоступна
        </>
    );
} 

export default memo(NotFoundPage);