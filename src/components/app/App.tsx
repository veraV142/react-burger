import React, { useState, useEffect }  from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/app-header.component';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.component';
import BurgerConstructor from '../burger-constructor/burger-constructor.component';
import { data, dataUrl } from '../../data';

function App() 
{
  const [loadedData, setData] = useState(data);

  useEffect(() => {   
    
    fetch(dataUrl)
            .then((response) => response.json())
            .then((response) => {
              console.log(response);
              if (response.success === true)
                setData(response.data);
            })
            .then((error) => {
              console.log(`При загрузке данных произошла ошибка ${error}`);
            })
  }, []);

  return (
    <div className="App">
        <AppHeader />
        <div className={styles.main_control} >
          <div className={`mr-10`}>
            <BurgerIngredients allData={loadedData} />
          </div>
          <BurgerConstructor allData={loadedData} />
        </div>
    </div>
  );
}

export default App;
