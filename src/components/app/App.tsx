import React from 'react';
import styles from './App.module.css';
import AppHeader from '../app-header/app-header.component';
import BurgerConstructor from '../burger-constructor/burger-constructor.component';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.component';
import { data } from '../../data';

function App() {
  return (
    <div className="App">
        <AppHeader />
        <div className={styles.main_control} >
          <div className={`mr-10`}>
            <BurgerConstructor allData={data} />
          </div>
          <BurgerIngredients allData={data} />
        </div>
    </div>
  );
}

export default App;
