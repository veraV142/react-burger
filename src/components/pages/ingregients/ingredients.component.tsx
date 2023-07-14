import {FC} from 'react';
import { useEffect, useState } from "react";
import IngredientDetails from "../../ingredient-details/ingredient-details.component";
import { useParams } from "react-router-dom";
import { loadIngredients } from "../../../utils/burger-api";
import { TIngredient, TIngredientLoadResponse } from '../../../utils/data';
import { useDispatch, useSelector } from '../../../services/types';
import { getIngredients } from '../../../services/actions/ingredientsLoad';

const IngredientsPage: FC = () => 
{
    const dispatch = useDispatch();

    const ingredients = useSelector(store => store.ingredientsLoadReducer.data);

    const [ingredient, setIngredient] = useState<TIngredient>();

    var prms = useParams();

    useEffect(() => {
        if (ingredients.length === 0)
            dispatch(getIngredients());
        else 
        {
            const ing = ingredients.find((item) => item._id === prms.id);
            setIngredient(ing);
        }
    }, [prms, ingredients])
    
    if (ingredient === null) 
        return null;

    return (
        <>
            {ingredient && (<IngredientDetails />)}
        </>
    );
} 

export default IngredientsPage;