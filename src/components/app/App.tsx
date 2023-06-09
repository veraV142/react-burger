import styles from './App.module.css';
import AppHeader from '../app-header/app-header.component';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HomePage } from "../pages/home/home.component"
import { RegistrationPage } from "../pages/registration/registration.component"
import { EnterPage } from "../pages/enter/enter.component"
import { RecoveryPage } from "../pages/recovery/recovery.component"
import { ResetPage } from "../pages/reset/reset.component"
import { ProfilePage } from "../pages/profile/profile.component"
import { NotFoundPage } from "../pages/notfound/notfound.component"
import { useDispatch } from "react-redux";
import IngredientsPage from '../pages/ingregients/ingredients.component';
import { LogoutPage } from '../pages/logout/logout.component';
import Modal from '../modal/modal.component';
import IngredientDetails from '../ingredient-details/ingredient-details.component';
import { DROP_FULL_INGREDIENT_DATA } from '../../services/actions/fullIngredientData';
import ProtectedRouteElement from '../protected-route/protected-route.component';


function App() 
{
  const location = useLocation();
  const background = location.state?.background;

  console.log(`background=${background} state=${location.state?.fromRoute}`)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCloseIngredient = () => {
    dispatch({ type: DROP_FULL_INGREDIENT_DATA });
    navigate(`/`);
  };

  return (
    <div className="App">
        <AppHeader />
        <DndProvider backend={HTML5Backend}>
          <div className={styles.main_control} >
            
            <Routes location={background || location}>
                <Route path="/" element={<HomePage />}/>
                <Route path="/ingredients/:id" element={<IngredientsPage />}/>
                <Route path="/login" element={<ProtectedRouteElement element={<EnterPage />} revers={true}/>} />
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/register" element={<ProtectedRouteElement element={<RegistrationPage />} route='/register' revers={true}/>} />
                <Route path="/forgot-password" element={<ProtectedRouteElement element={<RecoveryPage />} route='/forgot-password' revers={true}/>} />
                <Route path="/reset-password" element={<ProtectedRouteElement element={<ResetPage />} route='/reset-password' revers={true}/>} />
                <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage subpage={''}/>} route='/profile' />}/>
                <Route path="/profile/user" element={<ProtectedRouteElement element={<ProfilePage subpage={'profile'}/>} route='/profile/user' />} />
                <Route path="/profile/orders" element={<ProtectedRouteElement element={<ProfilePage subpage={'orders'}/>} route='/profile/orders' />} />
                <Route path="/profile/exit" element={<ProtectedRouteElement element={<ProfilePage subpage={'exit'}/>} route='/profile/exit' />} />
                <Route path="*" element={<NotFoundPage />}/>
              </Routes>
              {
                background && (
                  <Routes>
                    <Route path="/ingredients/:id" element={ 
                      <Modal header={'Детали ингредиента'} onClose={onCloseIngredient} showed={background !== null}>
                          <IngredientDetails />
                      </Modal> 
                    }/>
                  </Routes>
                ) 
            }
            
          </div>
        </DndProvider>
    </div>
  );
}

export default App;
