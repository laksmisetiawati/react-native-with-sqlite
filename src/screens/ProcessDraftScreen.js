import React, { Component } from 'react';

import {
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import db from '../configs/database';

import gs from '../assets/stylesheets/global';
import eds from '../assets/stylesheets/entrydata';

class ProcessDraftScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            healthy: '',
            reason: '',
            nasabah: [],
            product: [],
            latestInsurace: []
        }
    }

    async componentWillMount() {
        const { navigation } = this.props;
        const nasabahId = navigation.getParam('nasabahId', 0);
        const productId = navigation.getParam('productId', 0);
        const healthy = navigation.getParam('healthy', 0);
        const reason = navigation.getParam('reason', 0);

        const random = Math.floor(Math.random()*90000) + 10000;

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
        });

        console.log("nasabahId: " + nasabahId);

        await db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM product WHERE id=?", 
                [productId],
                (tx, results) => {
                    const row  = results.rows.item(0);
                    this.setState({
                        product : row
                    })
                }
            )
        });

        console.log("productId: " + productId);

        console.log("healthy: " + healthy);

        console.log("reason: " + reason);

        await db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO insurace ("
                    + "nasabah_id, "
                    + "holder_name, "
                    + "holder_dob, "
                    + "holder_identity_no, "
                    + "certificate_no, "
                    + "product_id, "
                    + "product_name, "
                    + "insured_name, "
                    + "insured_dob, "
                    + "benefit, "
                    + "nasabah_health, "
                    + "nasabah_health_reason, "
                    + "status"
                + ") VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", 
                [
                    nasabahId, 
                    this.state.nasabah.name, 
                    this.state.nasabah.dob, 
                    this.state.nasabah.identity_no, 
                    'E-' + random, 
                    productId, 
                    this.state.product.name, 
                    this.state.nasabah.name, 
                    this.state.nasabah.dob, 
                    'Uang Pertanggungan Rp 45.000.000', 
                    healthy, 
                    reason, 
                    '2'
                ],
                (tx, results) => {
                console.log("TEST");
                    this.setState({
                        latestInsurace : results
                    })
                }
            ).catch((error) => {
                console.log("Received error: ", error.message);
                throw error;
            })
        });
    }

    static navigationOptions = {
        header: null,
    }

    render() {
        console.log("nasabah: " + this.state.nasabah.name);
        console.log("product: " + JSON.stringify(this.state.product));
        console.log("latestInsurace: " + this.state.latestInsurace.insertId);
        return (
            <ScrollView style={[ gs.body, gs.flex1 ]}>
                <View style={[ gs.container ]}>

                    <View>
                        <TouchableOpacity
                            style={[
                                gs.btn
                            ]}
                            onPress={() => {
                                this.props.navigation.navigate('Dashboard');
                            }}>
                            <View>
                                <Text style={[eds.entryDataBtnText]}>Back</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        )
    }
}

export default ProcessDraftScreen;