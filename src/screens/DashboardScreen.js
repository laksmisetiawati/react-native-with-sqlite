import React, { Component } from 'react';

import {
    Alert,
    FlatList,
    Keyboard,
    Picker,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import { reduxForm, Field } from 'redux-form';

import {
    Col,
    Row,
    Grid
} from "react-native-easy-grid";

import Icon from 'react-native-vector-icons/FontAwesome';

import db from '../configs/database';

import gs from '../assets/stylesheets/global';
import ds from '../assets/stylesheets/dashboard';

class DashboardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            selected: '',
            insuraces: []
        }
    }

    async componentDidMount() {

        await db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM beneficiary", 
                [],
                (tx, results) => {
                    const len = results.rows.length;
                    const rows = [];
                    for (let i = 0; i < len; i++) {
                        rows[i] = results.rows.item(i);
                    }
                    this.setState({
                        beneficiaries : rows
                    })
                }
            )
        })

        await db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM product", 
                [],
                (tx, results) => {
                    const len = results.rows.length;
                    const rows = [];
                    for (let i = 0; i < len; i++) {
                        rows[i] = results.rows.item(i);
                    }
                    this.setState({
                        products : rows
                    })
                }
            )
        })

        await db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM insurace", 
                [],
                (tx, results) => {
                    const len = results.rows.length;
                    const rows = [];
                    for (let i = 0; i < len; i++) {
                        rows[i] = results.rows.item(i);
                    }
                    this.setState({
                        insuraces : rows
                    })
                }
            )
        })

        await db.transaction((tx) => {
            tx.executeSql(
                "SELECT id FROM insurace WHERE status=?", 
                ['1'],
                (tx, results) => {
                    this.setState({
                        totalSuccess : results.rows.length
                    })
                }
            )
        })

        await db.transaction((tx) => {
            tx.executeSql(
                "SELECT id FROM insurace WHERE status=?", 
                ['2'],
                (tx, results) => {
                    this.setState({
                        totalDraft : results.rows.length
                    })
                }
            )
        })

        await db.transaction((tx) => {
            tx.executeSql(
                "SELECT id FROM insurace WHERE status=?", 
                ['3'],
                (tx, results) => {
                    this.setState({
                        totalCancel : results.rows.length
                    })
                }
            )
        })
    }

	static navigationOptions = {
		header: null
	}

    onPressSimulateScreen = () => this.props.navigation.navigate('Simulate');

    submit = async values => {
        Alert.alert('values:', JSON.stringify(values));
        // try {
        //     const { product } = values;
        //     const response = await this.props.login(email, password, otp);
        //     // TODO redirect based on role
        //     if (response) {
        //         if (response.user.privileges.includes('investment:read')) {
        //             this.props.navigation.navigate('InvestorApp');
        //         } else {
        //             this.props.navigation.navigate('BorrowerApp');
        //         }
        //     }
        // } catch (error) {
        //     Alert.alert('Authentication Error', error.data && error.data.message);
        // }
    };

    handleFormSubmission = () => {
        // Alert.alert(JSON.stringify(this.state.selected));
        this.props.navigation.navigate('Simulate', {
            product: this.state.selected
        });
    }

    render() {
        const { handleSubmit } = this.props;

        // nggak bisa dipanggil this.state.products langsung di return()
        const products = this.state.products;
        const insuraces = this.state.insuraces;

        console.log(this.state.beneficiaries);

        return (
            <ScrollView>
                <View style={[gs.body]}>
                    <View style={[gs.container]}>
                        
                        <View style={[ds.addForm]}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[ gs.wrapAddFormDropDown, ds.wrapAddFormDropDown]}>
                                    <Picker name="product"
                                        selectedValue={ this.state.selected }
                                        style={[ gs.dropDown]}
                                        onValueChange={(itemValue, itemIndex) => this.setState({selected: itemValue})}
                                    >
                                        <Picker.Item label="Select" value="0" />
                                        {
                                            products.map((item, index) => {
                                                return (<Picker.Item key={index} label={item.name} value={item.id} />) 
                                            })
                                        }
                                    </Picker>
                                </View>
                                <TouchableOpacity
                                    style={[
                                        gs.btn,
                                        ds.addFormBtn
                                    ]}
                                    // onPress={handleSubmit(this.submit)}
                                    onPress={this.handleFormSubmission}
                                    >
                                    <View>
                                        <Text style={[ds.addFormBtnText]}>New</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={[ds.box1]}>
                            <View style={[ gs.flexDirectionRow ]}>
                                <View style={[ds.box1List]}>
                                    <Text style={[ds.box1Number]}>{ this.state.totalSuccess }</Text>
                                    <Text style={[ds.box1Text]}>Success</Text>
                                </View>
                                <View style={[ds.box1List, ds.box1Center]}>
                                    <Text style={[ds.box1Number]}>{ this.state.totalCancel }</Text>
                                    <Text style={[ds.box1Text]}>Cancel</Text>
                                </View>
                                <View style={[ds.box1List]}>
                                    <Text style={[ds.box1Number]}>{ this.state.totalDraft }</Text>
                                    <Text style={[ds.box1Text]}>Draft</Text>
                                </View>
                            </View>
                        </View>

                        <View>
                            <Grid style={{ marginTop: 40 }}>
                                <Col style={[gs.tableHeader]}>
                                    <Text>No</Text>
                                </Col>
                                <Col style={[gs.tableHeader]}>
                                    <Text>Date</Text>
                                </Col>
                                <Col style={[gs.tableHeader, ds.tableList1Header3]}>
                                    <Text>Certificate No</Text>
                                </Col>
                                <Col style={[gs.tableHeader]}>
                                    <Text>Name</Text>
                                </Col>
                                <Col style={[gs.tableHeader]}>
                                    <Text>Status</Text>
                                </Col>
                            </Grid>
                        </View>
                        
                        {
                            insuraces.map((row, i) => {
                                let tableClass;
                                if ( i % 2 == 0) {
                                    tableClass = 'gs.tableEvenClass';
                                }else{
                                    tableClass = 'gs.tableOddClass';
                                }
                                let status;
                                if(row.status === 1) {
                                    status = 'Sukses';
                                } else if(row.status === 2) {
                                    status = 'Draft';
                                } else if(row.status === 3) {
                                    status = 'Cancel';
                                }
                                return (
                                    <View key={i}>
                                        <Grid>
                                            <Col style={[ gs.tableBody, {tableClass} ]}>
                                                <Text>{i+1}</Text>
                                            </Col>
                                            <Col style={[ gs.tableBody, {tableClass} ]}>
                                                <Text>{ row.submit_date }</Text>
                                            </Col>
                                            <Col style={[ gs.tableBody, {tableClass} ]}>
                                                <Text>{ row.certificate_no }</Text>
                                            </Col>
                                            <Col style={[ gs.tableBody, {tableClass} ]}>
                                                <Text>{ row.holder_name }</Text>
                                            </Col>
                                            <Col style={[ gs.tableBody, {tableClass} ]}>
                                                <Text>{ status }</Text>
                                                <Icon.Button 
                                                    name="file-text" 
                                                    backgroundColor="#eeeeee" 
                                                    onPress={this.onPressSimulateScreen}>
                                                </Icon.Button>
                                            </Col>
                                        </Grid>
                                    </View>
                                ) 
                            })
                        }

                    </View>
                </View>
            </ScrollView>
        )
    }
}

// DashboardScreen = reduxForm({
//     form: 'DashboardScreenForm',
//     validate
// })(DashboardScreen);

// const validate = values => {
//   const { product } = values;
//   const errors = {};
//   errors.product = (!product) ? 'Required' : undefined;
//   return errors;
// }

export default DashboardScreen;