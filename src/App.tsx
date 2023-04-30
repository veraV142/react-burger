import React from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header.component';
import BurgerConstructor from './components/burger-constructor/burger-constructor.component';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients.component';
import { data } from './data';

function App() {
  return (
    <div className="App">
        <AppHeader />
        <div className={`main_control`} >
          <div className={`mr-10`}>
            <BurgerConstructor allData={data} />
          </div>
          <BurgerIngredients allData={data} />
        </div>
    </div>
  );
}

export default App;
