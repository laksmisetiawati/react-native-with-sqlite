import React, {Component} from 'react';

import {
    FlatList,
    Platform,
    Text, 
    View
} from 'react-native';

import axios from "axios";

class CallApiAxiosScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            loanData: []
        }
    }

    componentDidMount() {
        return axios.get('https://dev372577.lumbungdana.co.id/api/v1/loan/ID5bdfb4fdefaa76957b7e070', {
                    headers: {
                        Authorization: `Bearer DEV_TOKEN`
                    }
                })
                .then(response => {
                    this.setState({ 
                        loanData: response.data
                    })
                })
                .catch(error => {
                    console.log(error);
                    this.setState({ 
                        loanData: error
                    })
                });
    }

    render() {
        return (
            <View style={{ marginTop:30 }}>
                <FlatList
                    data={this.state.loanData}
                    renderItem={({item}) => <Text>{item}</Text>}
                    keyExtractor={({id}, index) => id}
                />
                <Text>{ this.state.loanData.error }</Text>
            </View>
        );
    }
}

export default CallApiAxiosScreen;