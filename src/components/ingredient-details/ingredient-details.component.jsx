import React from "react";
import styles from "./ingredient-details.styles.module.css";
import { dataType  } from '../../data';

const IngredientDetails = (props) => {
    return (
      <div className={styles.in_det_panel}>
        <img src={props.ingredient.image} alt={props.ingredient.name} className={`mb-4 ${styles.img_sz}`} />
        <p className="text text_type_main-medium mb-8">{props.ingredient.name}</p>
        <div className={`mb-15 ${styles.prms}`}>
            <div className={styles.prm}>
                <p className="mb-1 mr-5 text text_type_main-default text_color_inactive">Калории, ккал</p>
                <p className="text mr-5 text_type_digits-default text_color_inactive">{props.ingredient.calories}</p>
            </div>
            <div className={styles.prm}>
                <p className="mb-1 mr-5 text text_type_main-default text_color_inactive">Белки, г</p>
                <p className="text mr-5 text_type_digits-default text_color_inactive">{props.ingredient.proteins}</p>
            </div>
            <div className={styles.prm}>
                <p className="mb-1 mr-5 text text_type_main-default text_color_inactive">Жиры, г</p>
                <p className="text mr-5 text_type_digits-default text_color_inactive">{props.ingredient.fat}</p>
            </div>
            <div className={styles.prm}>
                <p className="mb-1 text text_type_main-default text_color_inactive">Углеводы, г</p>
                <p className="text text_type_digits-default text_color_inactive">{props.ingredient.carbohydrates}</p>
            </div>
          </div>
      </div>
    );
  };

IngredientDetails.propTypes = {
    ingredient: dataType,
}

export default IngredientDetails;