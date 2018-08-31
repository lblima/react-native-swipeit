//import liraries
import React, { Component } from 'react';
import { 
        View, 
        StyleSheet, 
        Dimensions 
    } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

// create a component
class CardsContainer extends Component {

    renderCards() {
        return this.props.data.map((item, index) => {
            return (
                <View 
                    style={styles.cardStyle}
                    key={item.id}
                >
                    {this.props.renderCard(item)}
                </View>
            )
        }).reverse();
    }

    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH
    },
});

//make this component available to the app
export default CardsContainer;
