//import liraries
import React, { Component } from 'react';
import { View } from 'react-native';

// create a component
class CardsContainer extends Component {

    renderCards() {
        return this.props.data.map((item, index) => {
            return (
                <View key={item.id}>
                    {this.props.renderCard(item)}
                </View>
            )
        });
    }

    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        );
    }
}

//make this component available to the app
export default CardsContainer;
