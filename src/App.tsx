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
        <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-around', width: '70%', marginRight: '15%', marginLeft: '15%' }}>
          <BurgerConstructor allData={data} />
          <BurgerIngredients allData={data} />
        </div>
    </div>
  );
}

export default App;
