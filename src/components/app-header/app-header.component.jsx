import React from 'react';
import styles from './app-header.styles.module.css'
import { ProfileIcon, ListIcon, BurgerIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';

class MenuLabel extends React.Component {
    render() {
      return (
          <div className={ `mt-4 mb-4 ${styles.label}`}>
            <span className={`ml-5 mr-2 mt-4 mb-4`}>
              {this.props.children}
            </span>
            <p className={`mr-5 mt-4 mb-4 text text_type_main-default` }>
              {this.props.text}
            </p>
          </div>
      );
    }
  }

  
class AppHeader extends React.Component {
    render() {
      return (
        <header className={styles.header}>
          
            <div className={`${styles.icon_and_text}`}>
              <MenuLabel text="Конструктор" > 
                <BurgerIcon type="primary"/>
              </MenuLabel>
              <MenuLabel text="Лента заказов"> 
                <ListIcon type="secondary"/>
              </MenuLabel>
            </div>
            
            <div className={`mt-4 mb-4 ${styles.icon_and_text}`}>
              <Logo  />
            </div>
            
            <div className={`${styles.icon_and_text}`}>
              <MenuLabel text="Личный кабинет"> 
                <ProfileIcon type="secondary"/>
              </MenuLabel>
            </div>
            
          
       </header>
      );
    }
  }

   export default AppHeader;
