import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, LogBox } from 'react-native';
import TimePicker from "react-native-24h-timepicker";
import DropDownPicker from 'react-native-dropdown-picker';
import { db } from '../../config/Firebase';
class AddPill extends Component {
    constructor() {
        super();
        this.dbRef = db.collection('prescripts');
        this.state = {
            name: '',
            frequency: '',
            amount: '',
            time: "",
            isLoading: false
        };
    }
    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }
    storeUser() {
        if (this.state.name === '') {
            alert('Fill at least your name!')
        } else {
            this.setState({
                isLoading: true,
            });
            this.dbRef.add({
                name: this.state.name,
                frequency: this.state.frequency,
                amount: this.state.amount,
                time: this.state.time,
            }).then((res) => {
                this.setState({
                    name: '',
                    frequency: '',
                    amount: '',
                    time: "",
                    isLoading: false,
                });
                this.props.navigation.navigate('Base')
            })
                .catch((err) => {
                    console.error("Error found: ", err);
                    this.setState({
                        isLoading: false,
                    });
                });
        }
    }
    onCancel() {
        this.TimePicker.close();
    }

    onConfirm(hour, minute) {
        this.setState({ time: `${hour}:${minute}` });
        this.TimePicker.close();
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Med Info'}
                        value={this.state.name}
                        onChangeText={(val) => this.inputValueUpdate(val, 'name')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        placeholder={'Frequency'}
                        value={this.state.email}
                        onChangeText={(val) => this.inputValueUpdate(val, 'frequency')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Amount'}
                        value={this.state.mobile}
                        onChangeText={(val) => this.inputValueUpdate(val, 'amount')}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => this.TimePicker.open()}
                        style={styles.timer}
                    >
                        <Text style={styles.buttext}>Time :</Text>
                    </TouchableOpacity>
                    <Text style={styles.text}>{this.state.time}</Text>
                </View>
                <TimePicker
                    ref={ref => {
                        this.TimePicker = ref;
                    }}
                    onCancel={() => this.onCancel()}
                    onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.storeUser()}
                >
                    <Text style={{ fontWeight: "bold" }}>Add Pill</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
        backgroundColor: '#fff',
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        position: 'relative',
        justifyContent: 'center',
        borderRadius: 20,
        alignItems: "center",
        backgroundColor: "#CCB2FF",
        padding: 10,
        width: 200,
        marginTop: 30,
        marginLeft: 50,
    },
    timer: {
        position: 'relative',
        justifyContent: 'center',
        marginTop: 0,
        marginLeft: 0,
        backgroundColor: "#CCB2FF",
        borderRadius: 30,
        width: 80,
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        justifyContent: 'center',
        marginLeft: 60
    },

    buttext: {
        fontSize: 18,
        justifyContent: 'center',
    }

})
export default AddPill;