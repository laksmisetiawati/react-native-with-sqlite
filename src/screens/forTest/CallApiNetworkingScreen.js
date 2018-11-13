import React, {Component} from 'react';

import {
    FlatList,
    Text,
    View
} from 'react-native';

class CallApiNetworkingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true
        }
    }

    componentWillMount() {
        return fetch( 'https://facebook.github.io/react-native/movies.json')
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ 
                        isLoading: false,
                        dataSource: responseJson.movies,
                    }, function(){

                    })
                })
                .catch((error) =>{
                    console.error(error);
                });
    }

    render() {
        return (
            <View style={{ marginTop:30 }}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
                    keyExtractor={({id}, index) => id}
                />
            </View>
        );
    }
}

export default CallApiNetworkingScreen;