// import React, {Component} from 'react';

// import {
//     Platform,
//     Text,
//     View
// } from 'react-native';

// import gs from '../assets/stylesheets/global';

// const SQLite = require('react-native-sqlite-storage')
// const db = SQLite.openDatabase({
//                 name: 'databs.db',
//                 createFromLocation: '~sqlite.db'
//             })

// // hardcode password
// // const Pass = "amiami";
// // C:\Users\Admin\Documents\react_project\project2\android\app\src\main\assets

// class LoginScreen extends React.Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             user: []
//         }

//         const coloumn = "(username, password)";
//         const coloumnData = "(Test 3, test3)";

//         // db.transaction((tx) => {
//         //     tx.executeSql(
//         //         "INSERT INTO user VALUES " + coloumn + ";", coloumnData,
//         //         (tx, results) => {
//         //             const len = results.rows.length;
//         //             if(len > 0) {
//         //                 const rows = results.rows.item(0);
//         //                 this.setState({
//         //                     user: rows
//         //                 })
//         //             }
//         //         }
//         //     )
//         // })

//         const Pass = "amiami";

//         db.transaction((tx) => {
//             tx.executeSql(
//                 "SELECT * FROM user WHERE password=?", [Pass],
//                 (tx, results) => {
//                     const len = results.rows.length;
//                     if(len > 0) {
//                         const datas = results.rows.item(0);
//                         this.setState({
//                             users: datas
//                         })
//                     }
//                 }
//             )
//         })

//         db.transaction((tx) => {
//             tx.executeSql(
//                 "SELECT * FROM user WHERE password=?", [Pass],
//                 (tx, results) => {
//                     const len = results.rows.length;
//                     if(len > 0) {
//                         const currRow = results.rows.item(0);
//                         this.setState({
//                             user: currRow
//                         })
//                     }
//                 }
//             )
//         })
//     }

//     static navigationOptions = {
//         header: null
//     }

//     render() {

//         var payments = [];
//         for(let i = 0; i < this.state.users; i++){
//             payments.push(
//                 <View key = {i}>
//                     <Text>Return Insert New Data</Text>
//                     <Text>ID: { this.state.user.id }</Text>
//                     <Text>Username: { this.state.user.username }</Text>
//                     <Text>Password: { this.state.user.password }</Text>
//                 </View>
//             )
//         }

//         return (
//             <View style={{ marginTop:30 }}>
//                 <Text>Return Insert New Data</Text>
//                 <Text>Username: { this.state.user.username }</Text>
//                 <Text>Password: { this.state.user.password }</Text>
//             </View>
//             <View style={{ marginTop:30 }}>
//                 <Text>Return Insert New Data</Text>
//                 <Text>ID: { this.state.user.id }</Text>
//                 <Text>Username: { this.state.user.username }</Text>
//                 <Text>Password: { this.state.user.password }</Text>
//             </View>
//         );
//     }
// }

// export default LoginScreen;

// login screen
import React, {Component} from 'react';
import {
    Keyboard,
    Text, 
    TextInput,
    TouchableHighlight, 
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import {
    reduxForm,
    Field,
    getFormValues
} from 'redux-form';

import gs from '../assets/stylesheets/global';

class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    onPressDashboardScreen = () => this.props.navigation.navigate('Dashboard');

    render({handleSubmit, redirect} = this.props) {
        return (
            <View style={[ gs.body, gs.flex1 ]}>
                <View style={[ gs.container ]}>
                    <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
                        <View style={[gs.container]}>
                            <View>
                                <Text>Login</Text>
                                <TextInput
                                    label="Email"
                                    name="email"
                                    textContentType="emailAddress"
                                    style={[
                                    gs.inputText,
                                    gs.marginTop5
                                    ]} />
                                <TextInput
                                    label="Password"
                                    name="password"
                                    secureTextEntry={true}
                                    textContentType="password"
                                    style={[
                                    gs.inputText,
                                    gs.marginTop5
                                    ]} />
                            </View>
                            <TouchableOpacity
                                onPress={this.onPressDashboardScreen}
                                style={[
                                gs.btn,
                                gs.marginTop5
                            ]}>
                                <View>
                                <Text>Login</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

const validate = values => {
    const { username, password } = values;
    const errors = {};

    errors.username = (!username) ? 'Required' : undefined;
    errors.password = (!password) ? 'Required' : undefined;

    return errors;
}

// LoginScreen = reduxForm({form: 'signIn', validate})(LoginScreen);
// LoginScreen = connect(mstp, {activateUser, requestTwoFa, close2FA})(ActivationScreen);

export default LoginScreen;