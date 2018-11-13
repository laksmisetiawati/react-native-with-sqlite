import React, { Component } from 'react';

import {
    Alert,
    ScrollView,
    Picker,
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

import db from '../configs/database';

import gs from '../assets/stylesheets/global';
import eds from '../assets/stylesheets/entrydata';

class DataEntryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            healthy: '',
            reason: '',
            nasabah: []
        }
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const nasabahId = navigation.getParam('nasabahId', 0);
        const product = navigation.getParam('product', 0);

        await db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM nasabah WHERE id=?", 
                [nasabahId],
                (tx, results) => {
                    const row  = results.rows.item(0);
                    this.setState({
                        nasabah : row
                    })
                }
            )
        })
    }

    static navigationOptions = {
        header: null,
    }

    onPressSimulateScreen = () => this.props.navigation.navigate('Simulate');
    onPressDashboardScreen = () => this.props.navigation.navigate('Dashboard');
    // onPressDataEntryNextScreen = () => this.props.navigation.navigate('DataEntryNext');

    handleDraft() {
        const random = Math.floor(Math.random()*90000) + 10000;
        Alert.alert('values:', JSON.stringify(random));
        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO insurace (nasabah_id, holder_name, holder_dob, holder_identity_no, certificate_no, product_id, product_name, insured_name, insured_dob, benefit, nasabah_health, nasabah_health_reason, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", 
                [nasabahId, this.state.nasabah.name, this.state.nasabah.dob, this.state.nasabah.identity_no, 'E-' + random, this.state.product.id, this.state.product.name, this.state.nasabah.name, this.state.nasabah.dob, 'Uang Pertanggungan Rp 45.000.000', this.state.healthy, this.state.reason, '2'],
                (tx, results) => {
                    // this.setState({
                    //     latestInsurace: results
                    // })
                    Alert.alert('draft insurace:', JSON.stringify(results));
                    // console.log("draft insurace: " + results);
                }
            )
        })
        // await () => this.props.navigation.navigate('Dashboard');
    }

    render() {
        const { navigation } = this.props;
        const nasabahId = navigation.getParam('nasabahId', 0);
        const product = navigation.getParam('product', 0);
        
        // nggak bisa dipanggil this.state.products langsung di return()
        const nasabah = this.state.nasabah;

        return (
            <ScrollView style={[gs.flex1]}>
                <View style={[gs.body]}>
                    <View style={[gs.container]}>

                        <View style={{ marginTop: 30}}>
                            <Text style={{ fontSize: 20 }}>
                                Personal Data
                            </Text>
                        </View>
                        <View style={[eds.entryDataDetail]}>
                            <View style={[ gs.flexDirectionRow ]}>
                                <View style={{ width: '20%' }}>
                                    <Text style={{ fontSize: 15, marginBottom:5 }}>Title</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>Full Name</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>Date of Birth</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>Occupation</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>Identity No</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>Citizen</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>Marrital Status</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>Mail Address</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>Kelurahan</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>Kecamatan</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>Kota</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>Provinsi</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>Mobile No</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>Account No</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>Account Name</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>Bank</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>Branch</Text>
                                    <Text style={{ fontSize: 15, marginTop:5 }}>CIF No</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 15, marginBottom:5 }}>{ this.state.nasabah.title }</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>{ this.state.nasabah.name }</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>{ this.state.nasabah.dob }</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>Rp { this.state.nasabah.occupation }</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>{ this.state.nasabah.identity_no }</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>{ this.state.nasabah.citizen }</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>{ this.state.nasabah.marrital_status }</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>{ this.state.nasabah.mail_address }</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>{ this.state.nasabah.kelurahan }</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>{ this.state.nasabah.kecamatan }</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>{ this.state.nasabah.kota }</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>{ this.state.nasabah.provinsi }</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>{ this.state.nasabah.mobile_no }</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>{ this.state.nasabah.account_no }</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>{ this.state.nasabah.account_name }</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>{ this.state.nasabah.bank }</Text>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>{ this.state.nasabah.branch }</Text>
                                    <Text style={{ fontSize: 15, marginTop:5 }}>{ this.state.nasabah.cif_no }</Text>
                                </View> 
                            </View>
                        </View>

                        <View style={{ marginTop: 30}}>
                            <Text style={{ fontSize: 20 }}>
                                Health Question
                            </Text>
                        </View>
                        <View style={[eds.entryDataDetail]}>
                            <View style={{ flexDirection:'row', marginBottom:30 }}>
                                <View style={{ width:'20%' }}>
                                    <Text style={{ fontSize:15, marginTop:8 }}>Are you healthy?</Text>
                                </View>
                                <View style={{ width: '80%' }}>
                                    <View style={[ gs.wrapAddFormDropDown, eds.wrapAddFormDropDown]}>
                                        <Picker name="healthy"
                                            selectedValue={ this.state.healthy }
                                            style={[ gs.dropDown]}
                                            onValueChange={(itemValue, itemIndex) => this.setState({healthy: itemValue})}
                                        >
                                            <Picker.Item label="Please Choose" value="0" />
                                            <Picker.Item label="Yes" value="1" />
                                            <Picker.Item label="No" value="2" />
                                        </Picker>
                                    </View>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={4}
                                        style={[
                                            gs.inputText,
                                            eds.entryDataDetailInputTextArea
                                        ]}
                                        onChangeText={(text) => this.setState({reason: text})}/>
                                </View> 
                            </View>
                        </View>

                        <View style={{
                            borderTopWidth: 3,
                            borderColor: '#333333',
                            paddingTop: 15,
                            paddingBottom: 30,
                            marginBottom: 30,
                        }}>
                            <View style={[ gs.flexDirectionRow ]}>
                                <View style={{ width:'46%'}}></View>
                                <TouchableOpacity
                                    style={[
                                        gs.btn,
                                        eds.entryDataDetailBtn
                                    ]}
                                    onPress={this.onPressSimulateScreen}>
                                    <View>
                                        <Text style={[eds.entryDataBtnText]}>Cancel</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        gs.btn,
                                        eds.entryDataDetailBtn
                                    ]}
                                    onPress={ this.handleDraft }>
                                    <View>
                                        <Text style={[eds.entryDataBtnText]}>Save as Draft</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        gs.btn,
                                        eds.entryDataDetailBtn
                                    ]}
                                    onPress={() => {
                                        this.props.navigation.navigate('DataEntryNext', {
                                            healthy: this.state.healthy,
                                            reason: this.state.reason,
                                            nasabahId: nasabahId,
                                            product: product,
                                        });
                                    }}>
                                    <View>
                                        <Text style={[eds.entryDataBtnText]}>Next</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default DataEntryScreen;