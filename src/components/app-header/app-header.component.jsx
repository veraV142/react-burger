import React from 'react';
class NavBar extends React.Component {
    render() {
      return (
        <header className='header'>
          {this.props.children}
        </header>
      );
    }
  }
  
  class Logo extends React.Component {
    render() {
      return (
        <img className='logo' src='./images/logo.svg' alt='логотип.' />
      );
    }
  }
  
  class Menu extends React.Component {
    render() {
      return (
        <nav className='menu'>
          {this.props.children}
        </nav>
      );
    }
  }
  
  class MenuItem extends React.Component {
    render() {
      return (
        <button className='item-btn' type='button'>{this.props.text}</button>
      );
    }
  }
  
  class Button extends React.Component {
    render() {
      return (
        <button className='log-in-btn' type='button'>{this.props.text}</button>
      );
    }
  }
  
  class AppHeader extends React.Component {
    render() {
      return (
        <div className='page'>
           <NavBar>  
           <Logo> </Logo>
           <Menu>
            <MenuItem text = 'О нас'>  </MenuItem>
            <MenuItem text = 'Цены'>  </MenuItem>
            <MenuItem text = 'Блог'>  </MenuItem>
            </Menu>
            <Button text ='Войти'>  </Button>         
        </NavBar> 
        </div>
      );
    }
  }

   export default AppHeader;
