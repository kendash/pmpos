import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {red500} from 'material-ui/styles/colors';

export default class Categories extends React.Component {
    render() {
        const {categories, selectedCategory, onClick = () => { } } = this.props;
        return (
            <div className="categories" id="categories">
                {categories.map(({id, name, color, foreground}) =>
                    <RaisedButton
                        className = 'categoryButton'
                        label = {selectedCategory === name ? <b>-{name}-</b> : name}
                        labelColor = {foreground}
                        key={id}
                        backgroundColor={selectedCategory === name ? red500 : color}
                        onClick={onClick.bind(null, name) }/>
                ) }
            </div>
        );
    }
} 