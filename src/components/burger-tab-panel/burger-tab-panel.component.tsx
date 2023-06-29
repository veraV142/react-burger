import {FC} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import {TAB_CHANGE} from '../../services/actions/tabChange'
import { useDispatch, useSelector } from '../../services/types';

interface IBurgerTabPanelProps {
    selectTab: (currTab: string) => void
}

const BurgerTabPanel: FC<IBurgerTabPanelProps> = (props:IBurgerTabPanelProps) => 
{
    const currentTab = useSelector(store => store.tabChangeReducer.tab);
    const dispatch = useDispatch();

    const selectTab = (currTab: string) => {
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

export default BurgerTabPanel;