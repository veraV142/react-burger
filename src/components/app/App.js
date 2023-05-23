import { useEffect }  from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/app-header.component';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.component';
import BurgerConstructor from '../burger-constructor/burger-constructor.component';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredientsLoad';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() 
{
  const dispatch = useDispatch();

  useEffect(() => {  
    dispatch(getIngredients());
  }, [dispatch]);
  

  return (
    <div className="App">
        <AppHeader />
        <DndProvider backend={HTML5Backend}>
          <div className={styles.main_control} >
            <div className={`mr-10`}>
              <BurgerIngredients />
            </div>
            <BurgerConstructor />
          </div>
        </DndProvider>
        
    </div>
  );
}

export default App;
