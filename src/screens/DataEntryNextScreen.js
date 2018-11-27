import React, { Component } from 'react';
import {
    Platform,
    Animated,
    ScrollView,
    Picker,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    StyleSheet
} from 'react-native';

import {
    Col,
    Row,
    Grid
} from "react-native-easy-grid";

import db from '../configs/database';

import gs from '../assets/stylesheets/global';
import ds from '../assets/stylesheets/dashboard';
import eds from '../assets/stylesheets/entrydata';
import ecs from '../assets/stylesheets/ecertificate';

class DataEntryNextScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            occupationClass: '',
            industrySector: '',
            annualIncome: '',
            otherIncome: '',
            premium: '',
            paymentFrequency: '',
            formBeneficiary: [],
            fullName: '',
            dob: '',
            gender: '',
            relationship: '',
            percentage: ''
        }
        this.index = 0;
        this.animatedValue = new Animated.Value(0);
    }

    static navigationOptions = {
        header: null
    }

    onPressSimulateScreen = () => this.props.navigation.navigate('Simulate');
    onPressDashboardScreen = () => this.props.navigation.navigate('Dashboard');
    // onPressECertificateScreen = () => this.props.navigation.navigate('ECertificate');

    handleFormSubmission = () => this.props.navigation.navigate('ECertificate');
        
    async componentDidMount() {
        // await this.setState({
        //     formBeneficiary: [
        //         {
        //             key: '1',
        //             fullName: 'Ricardo Guilizzan',
        //             dob: '1990/10/10',
        //             gender: 'Male',
        //             relationship: 'Son',
        //             percentage: '50'
        //         },
        //         {
        //             key: '2',
        //             fullName: 'Yohana Botton',
        //             dob: '1990/10/10',
        //             gender: 'Female',
        //             relationship: 'Daughter',
        //             percentage: '50'
        //         }
        //     ]
        // })
    }

    addNewForm = () => {
        const keyBenefit = this.state.formBeneficiary.length + 1;
        this.setState(prevState => ({
            formBeneficiary: [...prevState.formBeneficiary, {
                    key: keyBenefit.toString(),
                    fullName: this.state.fullName,
                    dob: this.state.dob,
                    gender: this.state.gender,
                    relationship: this.state.relationship,
                    percentage: this.state.percentage
                }]
        }))
    };

    onNumValidation(text) {
        let newText = '';
        let numbers = '0123456789';

        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                alert("please enter numbers only");
            }
        }
        this.setState({ percentage: newText });
    }

    removeForm(key) {
        const updateBeneficiary = this.state.formBeneficiary.filter(
            formBeneficiary => {
                return formBeneficiary.key !== key;
            }
        )
        this.setState({
            formBeneficiary: [...updateBeneficiary]
        })
    };

    render() {
        const { navigation } = this.props;
        const nasabahId = navigation.getParam('nasabahId', 0);
        const product = navigation.getParam('product', 0);
        const healthy = navigation.getParam('healthy', null);
        const reason = navigation.getParam('reason', null);

        // console.log(this.state.formBeneficiary[0]);
        // const test = this.state.formBeneficiary[0];
        // if(this.state.formBeneficiary[0]) {
        //     console.log(this.state.formBeneficiary[0].fullName);
        // }

        const formBeneficiary = this.state.formBeneficiary;

        return (
            <ScrollView style={[gs.flex1]}>
                <View style={[gs.body]}>
                    <View style={[gs.container]}>

                        <View style={{ marginTop: 30}}>
                            <Text style={{ fontSize: 20 }}>
                                Insurance Data
                            </Text>
                        </View>
                        <View style={[eds.entryDataDetail]}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '20%' }}>
                                    <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>Occupation Class</Text>
                                    <Text style={{ fontSize: 15, marginTop:18, marginBottom:5 }}>Industry Sector</Text>
                                    <Text style={{ fontSize: 15, marginTop:18, marginBottom:5 }}>Annual Income</Text>
                                    <Text style={{ fontSize: 15, marginTop:18, marginBottom:5 }}>Other Income</Text>
                                    <Text style={{ fontSize: 15, marginTop:18, marginBottom:5 }}>Premium</Text>
                                    <Text style={{ fontSize: 15, marginTop:18 }}>Payment Frequecy</Text>
                                </View>
                                <View style={{ width: '80%' }}>
                                    <View style={{ fontSize: 15, marginBottom:5 }}>
                                        <View style={[ gs.wrapAddFormDropDown, eds.wrapAddFormDropDown]}>
                                            <Picker selectedValue={ this.state.occupationClass }
                                                style={[ gs.dropDown]}
                                                onValueChange={(itemValue, itemIndex) => this.setState({occupationClass: itemValue})}
                                            >
                                                <Picker.Item label="Please Choose" value="0" />
                                                <Picker.Item label="Low Risk" value="Low Risk" />
                                            </Picker>
                                        </View>
                                    </View>
                                    <View style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>
                                        <View style={[ gs.wrapAddFormDropDown, eds.wrapAddFormDropDown]}>
                                            <Picker selectedValue={ this.state.industrySector }
                                                style={[ gs.dropDown]}
                                                onValueChange={(industrySector) => this.setState({industrySector: industrySector})}
                                            >
                                                <Picker.Item label="Please Choose" value="0" />
                                                <Picker.Item label="Pertanian" value="Pertanian" />
                                            </Picker>
                                        </View>
                                    </View>
                                    <View style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>
                                        <TextInput style={[
                                                gs.inputText
                                            ]}
                                            onChangeText={(annualIncome) => this.setState({annualIncome: annualIncome})}/>
                                    </View>
                                    <View style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>
                                        <TextInput
                                            style={[
                                                gs.inputText
                                            ]}
                                            onChangeText={(otherIncome) => this.setState({otherIncome: otherIncome})}/>
                                    </View>
                                    <View style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>
                                        <TextInput
                                            style={[
                                                gs.inputText
                                            ]} editable={false} defaultValue="75.000"
                                            onChangeText={(premium) => this.setState({premium: premium})}/>
                                    </View>
                                    <View style={{ fontSize: 15, marginTop:5 }}>
                                        <View style={[ gs.wrapAddFormDropDown, eds.wrapAddFormDropDown]}>
                                            <Picker selectedValue={ this.state.paymentFrequency }
                                                style={[ gs.dropDown]}
                                                onValueChange={(paymentFrequency) => this.setState({paymentFrequency: paymentFrequency})}
                                            >
                                                <Picker.Item label="Please Choose" value="0" />
                                                <Picker.Item label="Monthly" value="Monthly" />
                                                <Picker.Item label="Yearly" value="Yearly" />
                                            </Picker>
                                        </View>
                                    </View>
                                </View> 
                            </View>
                        </View>

                        {
                            // this.state.formBeneficiary[0] ? (
                            //     <View><Text>Test</Text></View>
                            // ) : (
                            //     <View><Text>Test 2</Text></View>
                            // )
                        }

                        <View style={{ marginTop: 30}}>
                            <Text style={[ ecs.header1]}>
                                Beneficiary Detail
                            </Text>
                        </View>
                        <View style={{ marginLeft:'2%', width:'95%' }}>
                            <Grid>
                                <Col style={[gs.tableHeader]}>
                                    <Text style={[gs.textCenter]}>No</Text>
                                </Col>
                                <Col style={[gs.tableHeader]}>
                                    <Text style={[gs.textCenter]}>Name</Text>
                                </Col>
                                <Col style={[gs.tableHeader]}>
                                    <Text style={[gs.textCenter]}>Relationship</Text>
                                </Col>
                                <Col style={[gs.tableHeader]}>
                                    <Text style={[gs.textCenter]}>Percentage</Text>
                                </Col>
                                <Col style={[gs.tableHeader]}>
                                    <Text style={[gs.textCenter]}>&nbsp;</Text>
                                </Col>
                            </Grid>
                            {
                                formBeneficiary.map((row, index) => {
                                    return (
                                        <Grid key={index}>
                                            <Col style={[gs.tableBody, gs.tableEvenClass]}>
                                                <Text style={[gs.textCenter]}>{ index+1} </Text>
                                            </Col>
                                            <Col style={[gs.tableBody, gs.tableEvenClass]}>
                                                <Text style={[gs.textCenter]}>{ row.fullName }</Text>
                                            </Col>
                                            <Col style={[gs.tableBody, gs.tableEvenClass]}>
                                                <Text style={[gs.textCenter]}>{ row.relationship }</Text>
                                            </Col>
                                            <Col style={[gs.tableBody, gs.tableEvenClass]}>
                                                <Text style={[gs.textCenter]}>{ row.percentage }%</Text>
                                            </Col>
                                            <Col style={[gs.tableBody, gs.tableEvenClass]}>

                                                <TextInput style={{ 
                                                        overflow: 'hidden', 
                                                        position: 'absolute', 
                                                        top: -1000
                                                    }} editable={false} defaultValue={ row.key } />
                                                <TextInput style={{ 
                                                        overflow: 'hidden', 
                                                        position: 'absolute', 
                                                        top: -1000
                                                    }} editable={false} defaultValue={ row.name } />
                                                <TextInput style={{ 
                                                        overflow: 'hidden', 
                                                        position: 'absolute', 
                                                        top: -1000
                                                    }} editable={false} defaultValue={ row.gender } />
                                                <TextInput style={{ 
                                                        overflow: 'hidden', 
                                                        position: 'absolute', 
                                                        top: -1000
                                                    }} editable={false} defaultValue={ row.dob } />
                                                <TextInput style={{ 
                                                        overflow: 'hidden', 
                                                        position: 'absolute', 
                                                        top: -1000
                                                    }} editable={false} defaultValue={ row.relationship } />
                                                <TextInput style={{ 
                                                        overflow: 'hidden', 
                                                        position: 'absolute', 
                                                        top: -1000
                                                    }} editable={false} defaultValue={ row.percentage } />

                                                <TouchableOpacity
                                                    style={[
                                                        gs.btn
                                                    ]}
                                                    onPress={ this.onPressSimulateScreen }>
                                                    <View>
                                                        <Text style={[gs.textCenter]}>Edit</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[
                                                        gs.btn
                                                    ]}
                                                    onPress={ (e) => this.removeForm(row.key) }>
                                                    <View>
                                                        <Text style={[gs.textCenter]}>Delete</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </Col>
                                        </Grid>
                                    )
                                })
                            }
                        </View>

                        <View style={{ marginTop: 40, marginBottom: 50, flexDirection: 'row' }}>
                            <View style={{ width: '20%' }}>
                                <Text style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>Full Name</Text>
                                <Text style={{ fontSize: 15, marginTop:18, marginBottom:5 }}>Date of Birth</Text>
                                <Text style={{ fontSize: 15, marginTop:18, marginBottom:5 }}>Gender</Text>
                                <Text style={{ fontSize: 15, marginTop:18, marginBottom:5 }}>Relationship</Text>
                                <Text style={{ fontSize: 15, marginTop:18 }}>Percentage</Text>
                            </View>

                            <View style={{ width: '80%' }}>
                                <View style={{ fontSize: 15, marginBottom:5 }}>
                                    <TextInput style={[
                                            gs.inputText
                                        ]}
                                        onChangeText={(fullName) => this.setState({fullName: fullName})}/>
                                </View>
                                <View style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>
                                    <TextInput style={[
                                            gs.inputText
                                        ]}
                                        onChangeText={(dob) => this.setState({dob: dob})}/>
                                </View>
                                <View style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>
                                    <View style={[ gs.wrapAddFormDropDown, eds.wrapAddFormDropDown]}>
                                        <Picker selectedValue={ this.state.gender }
                                            style={[ gs.dropDown]}
                                            onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})}
                                        >
                                            <Picker.Item label="Please Choose" value="0" />
                                            <Picker.Item label="Male" value="Male" />
                                            <Picker.Item label="Woman" value="Woman" />
                                        </Picker>
                                    </View>
                                </View>
                                <View style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>
                                    <TextInput
                                        style={[
                                            gs.inputText
                                        ]}
                                        onChangeText={(relationship) => this.setState({relationship: relationship})}/>
                                </View>
                                <View style={{ fontSize: 15, marginTop:5, marginBottom:5 }}>
                                    <TextInput
                                        style={[
                                            gs.inputText
                                        ]}
                                        onChangeText={(percentage) => this.onNumValidation(percentage)}/>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '80%'}}></View>
                                    <TouchableOpacity
                                        style={[
                                            gs.btn,
                                            eds.entryDataDetailBtn
                                        ]}
                                        onPress={ this.addNewForm }>
                                        <View>
                                            <Text style={[eds.entryDataBtnText]}>Add</Text>
                                        </View>
                                    </TouchableOpacity>
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
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '46%'}}></View>
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
                                    onPress={this.onPressDashboardScreen}>
                                    <View>
                                        <Text style={[eds.entryDataBtnText]}>Save as Draft</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        gs.btn,
                                        eds.entryDataDetailBtn
                                    ]}
                                    onPress={ () => {
                                        this.props.navigation.navigate('ECertificate', {
                                            occupationClass: this.state.occupationClass,
                                            industrySector: this.state.industrySector,
                                            annualIncome: this.state.annualIncome,
                                            otherIncome: this.state.otherIncome,
                                            paymentFrequency: this.state.paymentFrequency,
                                            formBeneficiary: this.state.formBeneficiary,
                                            healthy: healthy,
                                            reason: reason,
                                            nasabahId: nasabahId,
                                            product: product
                                        });
                                    } }>
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

export default DataEntryNextScreen;