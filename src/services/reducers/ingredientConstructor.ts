import { TIngredient, TIngredientExt } from '../../utils/data';
import { ADD_INGREDIENT, DROP_INGREDIENT, CALC_SUM, MOVE_INGREDIENT, CLEAR_INGREDIENTS, IIngredientConstructorAction } from '../actions/ingredientConstructor';

  export type TIngredientsState = {
    selectedIngredients: Array<TIngredient|TIngredientExt>, 
    selectedBun?: TIngredient|TIngredientExt,
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
              
              const newSelIng: TIngredient|TIngredientExt = { ...action.data, uuid: (action.data as TIngredientExt).uuid };

              return {
                ...state,
                selectedBun: (action.data as TIngredient).type === 'bun' ? action.data : state.selectedBun, 
                selectedIngredients: (action.data as TIngredient).type !== 'bun' ? 
                    [...state.selectedIngredients, newSelIng ] : [...state.selectedIngredients]
              };
          }
          case DROP_INGREDIENT: {
            return  {
                ...state,
                selectedBun: action.uuid === undefined ? undefined : state.selectedBun, 
                selectedIngredients: action.uuid !== null ? 
                    state.selectedIngredients.filter(si => (si as TIngredientExt).uuid !== action.uuid ) : 
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
                newSum += state.selectedBun ? (state.selectedBun as TIngredient).price : 0;

            state.selectedIngredients.forEach(si => newSum += (si as TIngredient).price );

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
                if ((elem as TIngredientExt).uuid === fromItemIndex)
                    fromPos = i;
                if ((elem as TIngredientExt).uuid === toItemIndex)
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