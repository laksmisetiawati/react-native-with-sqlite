import React, { Component } from 'react';
import {
    Alert,
    ScrollView,
    Keyboard,
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
import ecs from '../assets/stylesheets/ecertificate';

class ECertificateScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nasabah: [],
            product: [],
            latestInsurace: [],
            getInsurace: [],
            getBeneficiaries: []
        }
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const occupationClass = navigation.getParam('occupationClass', null);
        const industrySector = navigation.getParam('industrySector', null);
        const annualIncome = navigation.getParam('annualIncome', null);
        const otherIncome = navigation.getParam('otherIncome', null);
        // const premium = navigation.getParam('premium', null);
        const paymentFrequency = navigation.getParam('paymentFrequency', null);
        const formBeneficiary = navigation.getParam('formBeneficiary', null);
        const healthy = navigation.getParam('healthy', null);
        const reason = navigation.getParam('reason', null);
        const nasabahId = navigation.getParam('nasabahId', null);
        const product = navigation.getParam('product', null);

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

        await db.transaction((tx) => {
            tx.executeSql(
                "SELECT name, id FROM product WHERE id=?", 
                [product],
                (tx, results) => {
                    const row  = results.rows.item(0);
                    this.setState({
                        product : row
                    })
                }
            )
        })

        const  today = new Date();
        const  year = today.getFullYear();
        const  month = today.getMonth() + 1;
        const  date = today.getDate();
        if(date.length == 1) {
            date = "0" + date;
        }
        const current_date = year + "/" + month + "/" + date;

        const random = Math.floor(Math.random()*90000) + 10000;

        await db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO insurace (nasabah_id, holder_name, holder_dob, holder_identity_no, certificate_no, product_id, product_name, submit_date, insured_name, insured_dob , benefit, nasabah_health, nasabah_health_reason, occupation_class, industry_sector , annual_income, other_income, payment_frequency, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", 
                [nasabahId, this.state.nasabah.name, this.state.nasabah.dob, this.state.nasabah.identity_no, 'E-' + random, this.state.product.id, this.state.product.name, current_date, this.state.nasabah.name, this.state.nasabah.dob, 'Uang Pertanggungan Rp 45.000.000', healthy, reason, occupationClass, industrySector, annualIncome, otherIncome, paymentFrequency, '1'],
                (tx, results) => {
                    this.setState({
                        latestInsurace : results
                    })
                }
            )
        })

        await db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM insurace WHERE id=?", 
                [this.state.latestInsurace.insertId],
                (tx, results) => {
                    const row  = results.rows.item(0);
                    this.setState({
                        getInsurace : row
                    })
                }
            )
        })

        if(formBeneficiary) {
            for(x=0; x<=formBeneficiary.length; x++){
                await db.transaction((tx) => {
                    tx.executeSql(
                        "INSERT INTO beneficiary (insured_id, name, relationship, dob, gender, percentage) VALUES (?,?,?,?,?,?)", 
                        [this.state.latestInsurace.insertId, formBeneficiary[x].fullName, formBeneficiary[x].relationship, formBeneficiary[x].dob, formBeneficiary[x].gender, formBeneficiary[x].percentage],
                        (tx, results) => {
                            this.setState({
                                resultBeneficiary : results
                            })
                        }
                    )
                })
            }
        
            await db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM beneficiary WHERE insured_id=?", 
                    [this.state.latestInsurace.insertId],
                    (tx, results) => {
                        const len = results.rows.length;
                        const rows = [];
                        for (let i = 0; i < len; i++) {
                            rows[i] = results.rows.item(i);
                        }
                        this.setState({
                            getBeneficiaries : rows
                        })
                    }
                )
            })
        }
    }

    static navigationOptions = {
        header: null
    }

    onPressDashboardScreen = () => this.props.navigation.navigate('Dashboard');

    render() {
        // nggak bisa dipanggil this.state.products langsung di return()
        const getInsurace = this.state.getInsurace;
        const getBeneficiaries = this.state.getBeneficiaries;

        return (
            <ScrollView style={[gs.flex1]}>
                <View style={[gs.body]}>
                    <View style={[gs.container]}>

                        <View style={{ marginTop: 30}}>
                            <View style={[ecs.certificate]}>

                                <View style={{ marginBottom: 20 }}>
                                    <Text style={{ fontSize: 25, textAlign: 'center' }}>
                                        Certificate
                                    </Text>
                                </View>

                                <View>
                                    <Text style={[ ecs.header1]}>
                                        Certificate Holder
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '25%' }}>
                                        <Text style={{
                                            fontSize: 15,
                                            marginLeft:15,
                                            marginBottom:5
                                        }}>
                                            Name
                                        </Text>
                                        <Text style={{ 
                                            fontSize: 15, 
                                            marginTop:5,
                                            marginLeft:15,
                                            marginBottom:5
                                        }}>
                                            Date of Birth
                                        </Text>
                                        <Text style={{ 
                                            fontSize: 15, 
                                            marginTop:5,
                                            marginLeft:15,
                                            marginBottom:5
                                        }}>
                                            Identity No
                                        </Text>
                                        <Text style={{ 
                                            fontSize: 15, 
                                            marginTop:5,
                                            marginLeft:15,
                                            marginBottom:5
                                        }}>
                                            Certificate No
                                        </Text>
                                        <Text style={{ 
                                            fontSize: 15, 
                                            marginTop:5,
                                            marginLeft:15,
                                            marginBottom:5
                                        }}>
                                            Product Name
                                        </Text>
                                        <Text style={{ 
                                            fontSize: 15, 
                                            marginTop:5,
                                            marginLeft:15
                                        }}>
                                            Submit Date
                                        </Text>
                                    </View>
                                    <View style={{ width: '70%'}}>
                                        <Text style={{
                                            fontSize: 15,
                                            marginLeft:15,
                                            marginBottom:5
                                        }}>
                                            { getInsurace.holder_name }
                                        </Text>
                                        <Text style={{ 
                                            fontSize: 15, 
                                            marginTop:5,
                                            marginLeft:15,
                                            marginBottom:5
                                        }}>
                                            { getInsurace.holder_dob }
                                        </Text>
                                        <Text style={{ 
                                            fontSize: 15, 
                                            marginTop:5,
                                            marginLeft:15,
                                            marginBottom:5
                                        }}>
                                            { getInsurace.holder_identity_no }
                                        </Text>
                                        <Text style={{ 
                                            fontSize: 15, 
                                            marginTop:5,
                                            marginLeft:15,
                                            marginBottom:5
                                        }}>
                                            { getInsurace.certificate_no }
                                        </Text>
                                        <Text style={{ 
                                            fontSize: 15, 
                                            marginTop:5,
                                            marginLeft:15,
                                            marginBottom:5
                                        }}>
                                            { getInsurace.product_name }
                                        </Text>
                                        <Text style={{ 
                                            fontSize: 15, 
                                            marginTop:5,
                                            marginLeft:15
                                        }}>
                                            { getInsurace.submit_date }
                                        </Text>
                                    </View> 
                                </View>

                                <View style={{ marginTop:40 }}>
                                    <Text style={[ ecs.header1]}>
                                        Insured Person
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '25%' }}>
                                        <Text style={{
                                            fontSize: 15,
                                            marginLeft:15,
                                            marginBottom:5
                                        }}>
                                            Name
                                        </Text>
                                        <Text style={{ 
                                            fontSize: 15, 
                                            marginTop:5,
                                            marginLeft:15,
                                            marginBottom:5
                                        }}>
                                            Date of Birth
                                        </Text>
                                    </View>
                                    <View style={{ width: '70%'}}>
                                        <Text style={{
                                            fontSize: 15,
                                            marginLeft:15,
                                            marginBottom:5
                                        }}>
                                            { getInsurace.holder_dob }
                                        </Text>
                                        <Text style={{ 
                                            fontSize: 15, 
                                            marginTop:5,
                                            marginLeft:15,
                                            marginBottom:5
                                        }}>
                                            { getInsurace.holder_name }
                                        </Text>
                                    </View> 
                                </View>

                                <View style={{ marginTop:40 }}>
                                    <Text style={[ ecs.header1 ]}>
                                        Beneficiary
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
                                    </Grid>
                
                                    {
                                        getBeneficiaries.map((row, i) => {
                                            <Grid>
                                                <Col style={[gs.tableBody, gs.tableEvenClass]}>
                                                    <Text style={[gs.textCenter]}>{ i }</Text>
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
                                            </Grid>
                                        })
                                    }
                                </View>

                            </View>
                        </View>

                        <View style={{ marginTop: 30}}>
                            <Text style={{ fontSize: 20 }}>
                                Benefit
                            </Text>
                        </View>

                        <View style={[ecs.certificate]}>
                            <View style={{ marginBottom: 30 }}>
                                <Text style={{
                                    fontSize: 15,
                                    marginBottom:5
                                }}>
                                    - Uang pertanggungan Rp. 45.000.000
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '82%'}}></View>
                                <TouchableOpacity
                                    style={[
                                        gs.btn,
                                        ecs.certificateBtn
                                    ]}
                                    onPress={this.onPressDashboardScreen}>
                                    <View>
                                        <Text style={[ecs.entryDataBtnText]}>Back</Text>
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

export default ECertificateScreen;