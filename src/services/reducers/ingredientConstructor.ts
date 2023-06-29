import { TIngredient } from '../../utils/data';
import { ADD_INGREDIENT, DROP_INGREDIENT, CALC_SUM, MOVE_INGREDIENT, CLEAR_INGREDIENTS, IIngredientConstructorAction } from '../actions/ingredientConstructor';

  export type TIngredientsState = {
    selectedIngredients: Array<TIngredient>, 
    selectedBun?: TIngredient,
    sum: number,
    dragIngredientIndex?: string
  }

  const ingredientConstructorInitialState: TIngredientsState = {
    selectedIngredients: [], 
    selectedBun: undefined,
    sum: 0
  };

  export const ingredientConstructorReducer = (state = ingredientConstructorInitialState, action:IIngredientConstructorAction) : TIngredientsState => 
  {
      switch (action.type) {
          case ADD_INGREDIENT: {
              
              const newSelIng: TIngredient = { ...action.data, uuid: action.data.uuid };

              return {
                ...state,
                selectedBun: action.data.type === 'bun' ? action.data : state.selectedBun, 
                selectedIngredients: action.data.type !== 'bun' ? 
                    [...state.selectedIngredients, newSelIng ] : [...state.selectedIngredients]
              };
          }
          case DROP_INGREDIENT: {
            return  {
                ...state,
                selectedBun: action.uuid === undefined ? undefined : state.selectedBun, 
                selectedIngredients: action.uuid !== null ? 
                    state.selectedIngredients.filter(si => si.uuid !== action.uuid ) : 
                    [...state.selectedIngredients]
            };
          }
          case CLEAR_INGREDIENTS: {
            return  {
                ...state,
                selectedBun: undefined, 
                selectedIngredients: []
            };
          }
          case CALC_SUM: {
            let newSum = 0;
            if (state.selectedBun !== null)
                newSum += state.selectedBun ? state.selectedBun.price : 0;

            state.selectedIngredients.forEach(si => newSum += si.price );

            return  {
                ...state,
                sum: newSum
            };
          }

          case MOVE_INGREDIENT: {
            const fromItemIndex = action.fromItemIndex;
            const toItemIndex = action.toItemIndex;

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