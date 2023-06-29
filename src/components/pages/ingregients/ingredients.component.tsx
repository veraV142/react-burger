import {FC} from 'react';
import { useEffect, useState } from "react";
import IngredientDetails from "../../ingredient-details/ingredient-details.component";
import { useParams } from "react-router-dom";
import { loadIngredients } from "../../../utils/burger-api";
import { TIngredient, TIngredientLoadResponse } from '../../../utils/data';

const IngredientsPage: FC = () => 
{
    const [ingredient, setIngredient] = useState<TIngredient>();

    var prms = useParams();

    useEffect(() => {
        loadIngredients()
            .then((response:TIngredientLoadResponse) => {
              if (response.success === true) 
              {
                const ing = response.data.find((item) => item._id === prms.id);
                setIngredient(ing);
              }
              else {
                console.log('Ингредиент не найден');
              }
            })
            .catch((error) => {
               console.log(error.message);
            })
    }, [prms])
    
    if (ingredient === null) 
        return null;

    return (
        <>
            {ingredient && (<IngredientDetails />)}
        </>
    );
} 

export default IngredientsPage;