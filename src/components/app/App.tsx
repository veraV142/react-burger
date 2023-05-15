import React, { useState, useEffect }  from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/app-header.component';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.component';
import BurgerConstructor from '../burger-constructor/burger-constructor.component';
import { data } from '../../utils/data';
import { IngredientsContext, SumPriceContext } from '../../utils/contexts';
import { loadIngredients} from '../../utils/burger-api';
import { sumPrice, randomBuh, randomOtherIngredients} from '../../utils/utils';

function App() 
{
  const [allData, setAllData] = useState([]);
  const [buhData, setBuhData] = useState();
  const [ingredientsData, setIngredientData] = useState(data);
  const [sum, setSum] = useState(0);
  const [loadedData, setLoadedData] = useState(data);

  useEffect(() => {   
    loadIngredients()
            .then((response) => {
              console.log(response);
              if (response.success === true) 
              {
                console.log('Загруженные данные');
                console.log(response.data);

                const buh = randomBuh(response.data);  
                setBuhData(buh);
                
                const otherIngredients = randomOtherIngredients(response.data);
                setIngredientData(otherIngredients);

                setAllData(response.data);
                setLoadedData(response.data);

                const sp = sumPrice([buh, buh, ...otherIngredients]);
                setSum(sp);
              }
            })
            .catch((error) => {
              console.log(`При загрузке данных произошла ошибка ${error}`);
            })
  }, []);

  return (
    <div className="App">
        <AppHeader />

            <IngredientsContext.Provider value={{ingredientsData, allData, buhData}}>
              <SumPriceContext.Provider value={sum}>
                <div className={styles.main_control} >
                  <div className={`mr-10`}>
                    <BurgerIngredients allData={loadedData} />
                  </div>
                  <BurgerConstructor />
                </div>
              </SumPriceContext.Provider>
            </IngredientsContext.Provider>

        
        
    </div>
  );
}

export default App;
