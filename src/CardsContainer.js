//import liraries
import React, { Component } from 'react';
import { 
        View, 
        StyleSheet, 
        Dimensions,
        Animated,
        PanResponder
    } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

// create a component
class CardsContainer extends Component {

    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy });
            },
            onPanResponderRelease: (event, gesture) => {
               
            }
        });

        this.state = { panResponder, position, index: 0 };
    }

    getCardStyle() {
        const { position } = this.state;
        const rotationX = SCREEN_WIDTH * 2;

        const rotate = position.x.interpolate({
            inputRange: [-rotationX, 0, rotationX],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            ...position.getLayout(),
            transform: [{ rotate }]
        }
    }
    
    renderCards() {
        return this.props.data.map((item, index) => {
            if (index < this.state.index)
                return null;
                
            //Add animation only to the card on top
            if (index === this.state.index) {
                return (
                    <Animated.View 
                        style={[
                            styles.cardStyle,
                            this.getCardStyle()
                        ]}
                        {...this.state.panResponder.panHandlers}
                        key={item.id}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }

            return (
                <Animated.View 
                    key={item.id}
                    style={[styles.cardStyle, {transform: [{ rotate: '0deg'}]}, { top: 10 * (index - this.state.index) }]}
                >
                    {this.props.renderCard(item)}
                </Animated.View>
            );
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
