import { ADD_INGREDIENT, DROP_INGREDIENT, CALC_SUM, MOVE_INGREDIENT, CLEAR_INGREDIENTS } from '../actions/ingredientConstructor';
import { v4 as uuidv4 } from 'uuid';
  
  export const ingredientConstructorInitialState = {
    selectedIngredients: [], 
    selectedBun: null,
    sum: 0
  };

  export const ingredientConstructorReducer = (state = ingredientConstructorInitialState, action) => 
  {
      switch (action.type) {
          case ADD_INGREDIENT: {
              const uuid = uuidv4();
              const newSelIng = { uuid: uuid, ingredient: action.data.ingredient };

              return {
                ...state,
                selectedBun: action.data.ingredient.type === 'bun' ? action.data.ingredient : state.selectedBun, 
                selectedIngredients: action.data.ingredient.type !== 'bun' ? 
                    [...state.selectedIngredients, newSelIng ] : [...state.selectedIngredients]
              };
          }
          case DROP_INGREDIENT: {
            return  {
                ...state,
                selectedBun: action.uuid === null ? null : state.selectedBun, 
                selectedIngredients: action.uuid !== null ? 
                    state.selectedIngredients.filter(si => si.uuid !== action.uuid ) : 
                    [...state.selectedIngredients]
            };
          }
          case CLEAR_INGREDIENTS: {
            return  {
                ...state,
                selectedBun: null, 
                selectedIngredients: []
            };
          }
          case CALC_SUM: {
            let newSum = 0;
            if (state.selectedBun !== null)
                newSum += state.selectedBun.price * 2;

            state.selectedIngredients.forEach(si => newSum += si.ingredient.price );

            return  {
                ...state,
                sum: newSum
            };
          }

          case MOVE_INGREDIENT: {
            const fromItemIndex = action.data.fromItemIndex;
            const toItemIndex = action.data.toItemIndex;

            const newSelectedIngredients = [...state.selectedIngredients];

            let fromPos = 0;
            let toPos = 0;
            for (let i = 0; i < newSelectedIngredients.length; i++) {
                let elem = newSelectedIngredients[i];
                if (elem.uuid === fromItemIndex)
                    fromPos = i;
                if (elem.uuid === toItemIndex)
                    toPos = i;
            }

            const tmpEl = newSelectedIngredients[toPos];
            newSelectedIngredients[toPos] = newSelectedIngredients[fromPos];
            newSelectedIngredients[fromPos] = tmpEl;

            return  {
                ...state,
                dragIngredientIndex: fromItemIndex,
                selectedIngredients: newSelectedIngredients
            };
          }
          default: {
              return state;
          }
      }
  }