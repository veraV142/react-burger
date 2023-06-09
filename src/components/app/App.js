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

function App() 
{
  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader />
        <DndProvider backend={HTML5Backend}>
          <div className={styles.main_control} >
            
              <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/login" element={<EnterPage />}/>
                <Route path="/register" element={<RegistrationPage />}/>
                <Route path="/forgot-password" element={<RecoveryPage />}/>
                <Route path="/reset-password" element={<ResetPage />}/>
                <Route path="/profile" element={<ProfilePage subpage={''} />}/>
                <Route path="/profile/orders" element={<ProfilePage subpage={'orders'} />}/>
                <Route path="/profile/exit" element={<ProfilePage subpage={'exit'} />}/>
                <Route path="*" element={<NotFoundPage />}/>
              </Routes>
            
          </div>
        </DndProvider>
      </BrowserRouter>
        
    </div>
  );
}

export default App;
