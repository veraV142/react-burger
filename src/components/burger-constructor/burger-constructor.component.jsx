import React from 'react';
import styles from './burger-constructor.styles.module.css'
import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

class BurgerConstructorTabPanel extends React.Component {

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
                <Tab value={0} active={this.state.currentTab === 0} onClick={this.selectTab}>
                    Булки
                </Tab>
                <Tab value={1} active={this.state.currentTab === 1} onClick={this.selectTab}>
                    Соусы
                </Tab>
                <Tab value={2} active={this.state.currentTab === 2} onClick={this.selectTab}>
                    Начинки
                </Tab>
            </div>
        );
    }
}

class BurgerConstructorElement extends React.Component 
{
    render() {

        return (
            <div className={`ml-4 mb-8 ${styles.constructor_el}`} >
                <Counter count={1} size="default" />
                <img src={this.props.data.image} alt={this.props.data.name} className="ml-4 mr-4 mt-6" />

                <div className={`mt-1 mb-1 ${styles.price_for_icon}`}>
                    <p className={`mr-4 text text_type_digits-default`}>{this.props.data.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
 
                <p className={`text text_type_main-default ${styles.name_ing}`}>
                    {this.props.data.name}
                </p>
            </div>
        );
    }
}

class BurgerConstructorListElements extends React.Component 
{
    render() {

        let scrollHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
          ) - 310;

        return (
            <div className='mr-10' style={{overflowY: 'auto', overflowX: 'hidden', maxHeight: `${scrollHeight}px`, scrollBarColor: '#6969dd #e0e0e0', scrollbarWidth: 'thin'}}>
                <h2 id='t0' align='left' className="mb-6 mt-10 text text_type_main-medium">
                    Булки
                </h2>
                <div  className={`mt-6 ml-4 mr-4 ${styles.table_el}`} >
                    {this.props.bunList.map((elem) => {
                        return (
                            <BurgerConstructorElement data={elem} />
                        );
                    })}
                </div>
                <h2 id='t1' align='left' className="mb-6 mt-2 text text_type_main-medium mb-6">
                    Соусы
                </h2>
                <div className={`mt-6 ml-4 mr-4 ${styles.table_el}`} >
                    {this.props.sauceList.map((elem) => {
                        return (
                            <BurgerConstructorElement data={elem} />
                        );
                    })}
                </div>
                <h2 id='t2' align='left' className="mb-6 mt-2 text text_type_main-medium mb-6">
                    Начинки
                </h2>
                <div className={`mt-6 ml-4 mr-4 ${styles.table_el}`}>
                    {this.props.fillingList.map((elem) => {
                        return (
                            <BurgerConstructorElement data={elem} />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default class BurgerConstructor extends React.Component {

    render() {

        const bunList = [];
        const sauceList = [];
        const fillingList = [];

        for (let index = 0; index < Object.keys(this.props.allData).length; index++) {
            const elem = this.props.allData[index];
            if (elem.type === "bun") 
                bunList.push(elem);
            if (elem.type === "sauce") 
                sauceList.push(elem);
        }

        return (
            <div>
                <p align='left' className={`mt-10 mb-5 text text_type_main-large`}>
                    Соберите бургер
                </p>
                <BurgerConstructorTabPanel selectTab={(currTab) => {
                    let elemForScroll = document.getElementById(`t${currTab}`);
                    elemForScroll.scrollIntoView();
                }} 
                />
                <BurgerConstructorListElements bunList={bunList} sauceList={sauceList} fillingList={fillingList} />
            </div>
        );
    }
}
