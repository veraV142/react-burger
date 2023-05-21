import { ADD_INGREDIENT, DROP_INGREDIENT, CALC_SUM, MOVE_INGREDIENT } from '../actions/index';
  
  export const ingredientConstructorInitialState = {
    selectedIngredients: [], 
    selectedBun: null,
    sum: 0
  };

  export const ingredientConstructorReducer = (state = ingredientConstructorInitialState, action) => 
  {
      switch (action.type) {
          case ADD_INGREDIENT: {
              const newIndex = state.selectedIngredients.length + 1;
              const newSelIng = { index: newIndex, ingredient: action.data.ingredient };

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
                selectedBun: action.index === -1 ? null : state.selectedBun, 
                selectedIngredients: action.index !== -1 ? 
                    state.selectedIngredients.filter(si => si.index !== action.index ) : 
                    [...state.selectedIngredients]
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
                if (elem.index === fromItemIndex)
                    fromPos = i;
                if (elem.index === toItemIndex)
                    toPos = i;
            }

            const tmpEl = newSelectedIngredients[toPos];
            newSelectedIngredients[toPos] = newSelectedIngredients[fromPos];
            newSelectedIngredients[fromPos] = tmpEl;

            return  {
                ...state,
                selectedIngredients: newSelectedIngredients
            };
          }
          default: {
              return state;
          }
      }
  }