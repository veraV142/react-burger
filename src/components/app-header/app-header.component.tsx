import React from 'react';
import styles from './app-header.styles.module.css'
import { ProfileIcon, ListIcon, BurgerIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import MenuLabel from '../menu-label/menu-label.component'


class AppHeader extends React.Component {
    render() {
      return (
        <header className={styles.header_line}>
          <div className={styles.header}>
            <div className={`${styles.icon_and_text}`}>
              <MenuLabel text="Конструктор" isActive={true} links={["/", "/ingredients"]}> 
                <BurgerIcon type="primary"/>
              </MenuLabel>
              <MenuLabel text="Лента заказов" isActive={false} links={["/ribbon"]}> 
                <ListIcon type="secondary"/>
              </MenuLabel>
            </div>
            
            <div className={`mt-4 mb-4 ${styles.icon_and_text}`}>
              <Logo  />
            </div>
            
            <div className={`${styles.icon_and_text}`}>
              <MenuLabel text="Личный кабинет"  isActive={false} links={["/profile"]}> 
                <ProfileIcon type="secondary"/>
              </MenuLabel>
            </div>
          </div>
        </header>
      );
    }
  }

   export default AppHeader;
