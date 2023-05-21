import React from "react";
import styles from "./ingredient-details.styles.module.css";
import { useSelector } from "react-redux";

const IngredientDetails = () => {

    const ingredient = useSelector(store => store.fullIngredientDataReducer.ingredient);

    return (
      <div className={styles.in_det_panel}>
        <img src={ingredient.image} alt={ingredient.name} className={`mb-4 ${styles.img_sz}`} />
        <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
        <div className={`mb-15 ${styles.prms}`}>
            <div className={styles.prm}>
                <p className="mb-1 mr-5 text text_type_main-default text_color_inactive">Калории, ккал</p>
                <p className="text mr-5 text_type_digits-default text_color_inactive">{ingredient.calories}</p>
            </div>
            <div className={styles.prm}>
                <p className="mb-1 mr-5 text text_type_main-default text_color_inactive">Белки, г</p>
                <p className="text mr-5 text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
            </div>
            <div className={styles.prm}>
                <p className="mb-1 mr-5 text text_type_main-default text_color_inactive">Жиры, г</p>
                <p className="text mr-5 text_type_digits-default text_color_inactive">{ingredient.fat}</p>
            </div>
            <div className={styles.prm}>
                <p className="mb-1 text text_type_main-default text_color_inactive">Углеводы, г</p>
                <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
            </div>
          </div>
      </div>
    );
  };

export default IngredientDetails;