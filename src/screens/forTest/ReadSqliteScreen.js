import React, {Component} from 'react';

import {
    Platform,
    Text,
    View
} from 'react-native';

import gs from '../assets/stylesheets/global';

const SQLite = require('react-native-sqlite-storage')
const db = SQLite.openDatabase({
                name: 'databs.db',
                createFromLocation: '~sqlite.db'
            })

// hardcode password
const Pass = "amiami";
// C:\Users\Admin\Documents\react_project\project2\android\app\src\main\assets

class ReadSqliteScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: []
        }

        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM user WHERE password=?", [Pass],
                (tx, results) => {
                    const len = results.rows.length;
                    if(len > 0) {
                        const rows = results.rows.item(0);
                        this.setState({
                            user: rows
                        })
                    }
                }
            )
        })
    }

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={{ marginTop:30 }}>
                <Text>ID: { this.state.user.id }</Text>
                <Text>Username: { this.state.user.username }</Text>
                <Text>Password: { this.state.user.password }</Text>
            </View>
        );
    }
}

export default ReadSqliteScreen;