import React from 'react';
import PropTypes from 'prop-types'
import styles from './menu-label.styles.module.css'
import { NavLink } from 'react-router-dom';

export default class MenuLabel extends React.Component 
{
    render() {
      return (
          <div className={ `mt-4 mb-4 ${styles.label}`}>
            <span className={`ml-5 mr-2 mt-4 mb-4`}>
              {this.props.children}
            </span>

            <NavLink to={{ pathname: `${this.props.link}` }}
                    className={({isActive, isPending }) =>  { 
                        return !isActive ? 
                          `mr-5 mt-4 mb-4 text text_type_main-default text_color_inactive` : 
                          `mr-5 mt-4 mb-4 text text_type_main-default`
                        } 
                    }
                    > {this.props.text}
            </NavLink>

            
          </div>
      );
    }
}

MenuLabel.propTypes = {
    text: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    children: PropTypes.object.isRequired
  }