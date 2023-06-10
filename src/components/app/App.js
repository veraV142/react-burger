import styles from './App.module.css';
import AppHeader from '../app-header/app-header.component';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from "../pages/home/home.component"
import { RegistrationPage } from "../pages/registration/registration.component"
import { EnterPage } from "../pages/enter/enter.component"
import { RecoveryPage } from "../pages/recovery/recovery.component"
import { ResetPage } from "../pages/reset/reset.component"
import { ProfilePage } from "../pages/profile/profile.component"
import { NotFoundPage } from "../pages/notfound/notfound.component"
import { ProtectedRouteElement } from '../protected-route/protected-route.component';
import { useSelector } from "react-redux";
import IngredientsPage from '../pages/ingregients/ingredients.component';
import { LogoutPage } from '../pages/logout/logout.component';

function App() 
{
  const showedIngredient = useSelector(store => store.fullIngredientDataReducer.ingredient);

  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader />
        <DndProvider backend={HTML5Backend}>
          <div className={styles.main_control} >
            
              <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/ingredients/:id" element={showedIngredient ? <HomePage /> : <IngredientsPage />}/>
                <Route path="/login" element={<ProtectedRouteElement element={<EnterPage />} revers={true}/>} />
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/register" element={<ProtectedRouteElement element={<RegistrationPage />} revers={true}/>} />
                <Route path="/forgot-password" element={<ProtectedRouteElement element={<RecoveryPage />} revers={true}/>} />
                <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPage />} revers={true}/>} />
                <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage subpage={''}/>}/>}/>
                <Route path="/profile/user" element={<ProtectedRouteElement element={<ProfilePage subpage={'profile'}/>}/>} />
                <Route path="/profile/orders" element={<ProtectedRouteElement element={<ProfilePage subpage={'orders'}/>}/>} />
                <Route path="/profile/exit" element={<ProtectedRouteElement element={<ProfilePage subpage={'exit'}/>}/>} />
                <Route path="*" element={<NotFoundPage />}/>
              </Routes>
            
          </div>
        </DndProvider>
      </BrowserRouter>
        
    </div>
  );
}

export default App;
