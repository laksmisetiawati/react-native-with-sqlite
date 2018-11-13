import React, { Component } from 'react';

import {
    ScrollView,
    Keyboard,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import {
    Col,
    Row,
    Grid
} from "react-native-easy-grid";

import DatePicker from 'react-native-datepicker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import db from '../configs/database';

import gs from '../assets/stylesheets/global';
import ss from '../assets/stylesheets/simulate';

class SimulateScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "1000/01/01",
            allNasabah: [],
            member: ''
        }
    }

    async componentDidMount() {
        // const currentDate = new Date();
        // var dd = currentDate.getDate();
        // var mm = currentDate.getMonth()+1;
        // var yyyy = currentDate.getFullYear();
        // this.setState({
        //     date: yyyy + "/" + mm + "/" + dd
        // });

        const { navigation } = this.props;
        const product = navigation.getParam('product', null);

        await db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM nasabah WHERE product_id=" + product, 
                [],
                (tx, results) => {
                    const len = results.rows.length;
                    const rows = [];
                    for (let i = 0; i < len; i++) {
                        rows[i] = results.rows.item(i);
                    }
                    this.setState({
                        allNasabah : rows
                    })
                }
            )
        })
    }
    
    static navigationOptions = {
        header: null
    }

    render() {
        const { navigation } = this.props;
        const product = navigation.getParam('product', null);
        
        // nggak bisa dipanggil this.state.products langsung di return()
        const allNasabah = this.state.allNasabah;

        return (
            <ScrollView style={[ gs.body, gs.flex1 ]}>
                <View style={[gs.container]}>

                    <View style={[ss.addForm]}>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <TextInput
                                name="name"
                                placeholder="Name"
                                style={[
                                    gs.inputText,
                                    ss.inputTextSimulate
                                ]} />
                            <DatePicker
                                style={{ width: '40%', marginTop: 3, marginLeft: 6 }}
                                date={ this.state.date }
                                androidMode="spinner"
                                mode="date"
                                placeholder="select date"
                                format="YYYY/MM/DD"
                                minDate="2016/05/01"
                                maxDate="2016/06/01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateInput: {
                                        borderWidth: 3,
                                        borderColor: '#000000'
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {this.setState({date: date})}}
                            />
                        </View>
                        <View style={{ flexDirection: 'row',  width: '100%' }}>
                            <TextInput
                                name="nilaiUp"
                                placeholder="Nilai UP"
                                style={[
                                    gs.inputText,
                                    ss.inputTextSimulate
                                ]} />
                            <TouchableOpacity
                                style={[
                                    gs.btn,
                                    ss.addFormBtn
                                ]}>
                                <View>
                                    <Text style={[ss.addFormBtnText]}>Simulate</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ marginTop: 30}}>
                        <Text style={{ fontSize: 20 }}>
                            Simulation Result
                        </Text>
                    </View>
                    <View style={[ss.simulasionResult]}>
                        <View style={{ flexDirection: 'row', marginBottom: 30 }}>
                            <View style={{ width: '20%' }}>
                                <Text style={{ fontSize: 15, marginBottom:5 }}>Name</Text>
                                <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>Date of Birth</Text>
                                <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>Premium</Text>
                                <Text style={{ fontSize: 15, marginTop:5 }}>Benefit</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 15, marginBottom:5 }}>Eko Irawan</Text>
                                <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>10 Mei 1990</Text>
                                <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>Rp 75.000 / bulan</Text>
                                <Text style={{ fontSize: 15, marginTop:5 }}>- Uang pertanggungan Rp 45.000.000</Text>
                            </View> 
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '50%'}}></View>
                            <TouchableOpacity
                                style={[
                                    gs.btn,
                                    ss.simulasionResultBtn
                                ]}
                                onPress={() => {
                                    this.props.navigation.navigate('Dashboard');
                                }}>
                                <View>
                                    <Text style={[ss.addFormBtnText]}>Cancel</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    gs.btn,
                                    ss.simulasionResultBtn
                                ]}
                                onPress={() => {
                                    this.props.navigation.navigate('Dashboard');
                                }}>
                                <View>
                                    <Text style={[ss.addFormBtnText]}>Confirm</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ marginTop: 40, borderBottomWidth: 3, borderColor: '#dddddd', marginBottom: 20 }}>
                        <Grid>
                            <Col style={[gs.tableHeader]}>
                                <Text style={[gs.textCenter]}>Nik</Text>
                            </Col>
                            <Col style={[gs.tableHeader]}>
                                <Text style={[gs.textCenter]}>Name</Text>
                            </Col>
                            <Col style={[gs.tableHeader]}>
                                <Text style={[gs.textCenter]}>DOB</Text>
                            </Col>
                            <Col style={[gs.tableHeader]}>
                                <Text style={[gs.textCenter]}>&nbsp;</Text>
                            </Col>
                        </Grid>
                        {
                            allNasabah.map((row, index) => {
                                return (
                                    <Grid key={index}>
                                        <Col style={[gs.tableBody, gs.tableEvenClass]}>
                                            <Text style={[gs.textCenter]}>{ row.identity_no }</Text>
                                        </Col>
                                        <Col style={[gs.tableBody, gs.tableEvenClass]}>
                                            <Text style={[gs.textCenter]}>{ row.name }</Text>
                                        </Col>
                                        <Col style={[gs.tableBody, gs.tableEvenClass]}>
                                            <Text style={[gs.textCenter]}>{ row.dob }</Text>
                                        </Col>
                                        <Col style={[gs.tableBody, gs.tableEvenClass]}>
                                            <TouchableOpacity
                                                style={[ gs.btn ]}
                                                onPress={() => {
                                                        this.props.navigation.navigate('DataEntry', {
                                                            nasabahId: row.id,
                                                            product: product
                                                        });
                                                    }}>
                                                <View>
                                                    <Text style={{ padding: 3, textAlign: "center" }}>Select</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </Col>
                                    </Grid>
                                )
                            })
                        }
                    </View>

                </View>
            </ScrollView>
        )
    }
}

export default SimulateScreen;