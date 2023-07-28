import React, {FC, useState, useEffect} from 'react';
import styles from "./ingredient-details.styles.module.css";
import { useDispatch, useSelector } from '../../services/types';
import { useParams } from 'react-router-dom';
import { TIngredient } from '../../utils/data';
import { getIngredients } from '../../services/actions/ingredientsLoad';

const IngredientDetails: FC = () => {

    const dispatch = useDispatch();
    var prms = useParams();
    const [ingredient, setIngredient] = useState<TIngredient>();
    const ingredients = useSelector(store => store.ingredientsLoadReducer.data);

    useEffect(() => {
      // if (ingredients.length === 0)
      //     dispatch(getIngredients());
      // else 
      // {
          const ing = ingredients.find((item) => item._id === prms.id);
          setIngredient(ing);
      //}
  }, [prms, ingredients])

    return (
      <div className={styles.in_det_panel} data-cy={`openingredient643d69a5c3f7b9001cfa093c`}>
        <img src={ingredient?.image} alt={ingredient?.name} className={`mb-4 ${styles.img_sz}`} />
        <p className="text text_type_main-medium mb-8">{ingredient?.name}</p>
        <div className={`mb-15 ${styles.prms}`}>
            <div className={styles.prm}>
                <p className="mb-1 mr-5 text text_type_main-default text_color_inactive">Калории, ккал</p>
                <p className="text mr-5 text_type_digits-default text_color_inactive">{ingredient?.calories}</p>
            </div>
            <div className={styles.prm}>
                <p className="mb-1 mr-5 text text_type_main-default text_color_inactive">Белки, г</p>
                <p className="text mr-5 text_type_digits-default text_color_inactive">{ingredient?.proteins}</p>
            </div>
            <div className={styles.prm}>
                <p className="mb-1 mr-5 text text_type_main-default text_color_inactive">Жиры, г</p>
                <p className="text mr-5 text_type_digits-default text_color_inactive">{ingredient?.fat}</p>
            </div>
            <div className={styles.prm}>
                <p className="mb-1 text text_type_main-default text_color_inactive">Углеводы, г</p>
                <p className="text text_type_digits-default text_color_inactive">{ingredient?.carbohydrates}</p>
            </div>
          </div>
      </div>
    );
  };

export default IngredientDetails;