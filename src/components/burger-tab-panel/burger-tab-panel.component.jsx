import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { useSelector, useDispatch} from "react-redux";
import {TAB_CHANGE} from '../../services/actions/index'

const BurgerTabPanel = (props) => 
{
    const currentTab = useSelector(store => store.tabChangeReducer.tab);
    const dispatch = useDispatch();

    const selectTab = (currTab) => {
        props.selectTab(currTab);
        dispatch({type: TAB_CHANGE, tab: currTab});
    }

    return (
        <div style={{ display: 'flex' }}>
            <Tab value={`bun`} active={currentTab === `bun`} onClick={selectTab}>
                Булки
            </Tab>
            <Tab value={`sauce`} active={currentTab === `sauce`} onClick={selectTab}>
                Соусы
            </Tab>
            <Tab value={`main`} active={currentTab === `main`} onClick={selectTab}>
                Начинки
            </Tab>
        </div>
    );
    
}

BurgerTabPanel.propTypes = {
    selectTab: PropTypes.func.isRequired
}

export default BurgerTabPanel;