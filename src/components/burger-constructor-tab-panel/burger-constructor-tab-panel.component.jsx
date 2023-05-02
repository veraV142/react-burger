import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'

export default class BurgerConstructorTabPanel extends React.Component {

    constructor(props) {
        super(props);
        this.selectTab = this.selectTab.bind(this);
    }

    state = {
        currentTab: 0
    }

    selectTab = (currTab) => {
        this.props.selectTab(currTab);
        this.setState({ currentTab: currTab });
    }

    render() {
        return (
            <div style={{ display: 'flex' }}>
                <Tab value={`bun_tab`} active={this.state.currentTab === 0} onClick={this.selectTab}>
                    Булки
                </Tab>
                <Tab value={`sauce_tab`} active={this.state.currentTab === 1} onClick={this.selectTab}>
                    Соусы
                </Tab>
                <Tab value={`main_tab`} active={this.state.currentTab === 2} onClick={this.selectTab}>
                    Начинки
                </Tab>
            </div>
        );
    }
}

BurgerConstructorTabPanel.propTypes = {
    selectTab: PropTypes.func.isRequired
}