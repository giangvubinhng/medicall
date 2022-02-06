import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import {auth} from '../config/fbConfig'
class More extends Component {
    handleSignout = async () => {
        await auth.signOut()
          .then(() => {
            console.log("Signed Out");
            this.props.navigation.navigate('Login');
          })
          .catch((error) => {
            console.error(error);
          });
      };

    render(){return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleSignout()}
                >
                <Text style={styles.but}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    but: {
        fontSize: 20,
    },
    button: {
        position: 'relative',
        justifyContent: 'center',
        borderRadius: 20,
        alignItems: "center",
        backgroundColor: "#CCB2FF",
        padding: 10,
        width: 200,
        marginTop: 20,
        marginLeft: 100,
    },
});

export default More;