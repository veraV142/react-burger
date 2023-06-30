import React, {FC, ReactNode} from 'react';
import styles from './menu-label.styles.module.css'
import { NavLink, useLocation } from 'react-router-dom';

interface IMenuLabel  {
  text: string,
  isActive: boolean,
  children?: ReactNode,
  links: Array<string>
}

const MenuLabel:FC<IMenuLabel> = (props) =>
{
    const location = useLocation();
    const links = props.links;
    return (
        <div className={ `mt-4 mb-4 ${styles.label}`}>
          <span className={`ml-5 mr-2 mt-4 mb-4`}>
            {props.children}
          </span>

          <NavLink to={{ pathname: `${props.links[0]}` }}
                  className={({isActive, isPending }) =>  
                  { 
                      const activeStyle = `mr-5 mt-4 mb-4 text text_type_main-default`;

                      if (isActive)
                        return activeStyle;

                      for (let link of links) {
                        const isRootLink = link === '/';
                        const locationIsRoot = location.pathname === '/';
                        const isStart = !isRootLink && !locationIsRoot && location.pathname.startsWith(`${link}`); 

                        if ((locationIsRoot && isRootLink) || isStart) {
                          return activeStyle;
                        }
                      }

                      return `mr-5 mt-4 mb-4 text text_type_main-default text_color_inactive`; 
                  }}
                  > {props.text}
          </NavLink>

          
        </div>
    );
}



export default MenuLabel;