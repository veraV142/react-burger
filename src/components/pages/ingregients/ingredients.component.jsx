import { useEffect, useState } from "react";
import IngredientDetails from "../../ingredient-details/ingredient-details.component";
import { ADD_FULL_INGREDIENT_DATA } from "../../../services/actions/fullIngredientData";
import { useParams } from "react-router-dom";
import { loadIngredients } from "../../../utils/burger-api";

const IngredientsPage = () => 
{
    const [ingredient, setIngredient] = useState({});

    var prms = useParams();

    useEffect(() => {
        loadIngredients()
            .then((response) => {
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
    }, [])
    
    if (ingredient === null) 
        return null;

    return (
        <>
            {ingredient && (<IngredientDetails ingredient={ingredient}/>)}
        </>
    );
} 

export default IngredientsPage;