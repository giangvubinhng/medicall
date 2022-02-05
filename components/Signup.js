import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity, Image} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
class Signup extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            reenter: '',
        }
    }

    onTextChange = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }
    check = (pas, repas) =>{
        if(pas === repas){
            this.props.navigation.navigate('Login')
        }
        else{
            Alert.alert('Password do not match. Try again')
        }
    }
      render() {return (
        <View style={styles.container}>
            <View style={styles.front}>

            </View>
            <View style = {styles.body}>
                <Text style={styles.title}>Register</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 30,}}>
                <Text style={styles.text}>Name</Text>
                <TextInput style={styles.input} onChangeText={(val) => this.onTextChange(val, 'name')} value={this.state.name}/>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 30,}}>
                <Text style={styles.text}>Email</Text>
                <TextInput style={styles.input4} onChangeText={(val) => this.onTextChange(val, 'email')} value={this.state.email}/>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 30,}}>
                <Text style={styles.text}>Password</Text>
                <TextInput style={styles.input2} secureTextEntry={true} onChangeText={(val) => this.onTextChange(val, 'password')} value={this.state.password}/>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 30,}}>
                <Text style={styles.text}>Re-enter</Text>
                <TextInput style={styles.input3} secureTextEntry={true} onChangeText={(val) => this.onTextChange(val, 'reenter')} value={this.state.reenter}/>
                </View>
                <TouchableOpacity
                style={styles.button}
                onPress={() => this.check(this.state.password, this.state.reenter)}
                >
                    <Text style={styles.but}>Sign Up</Text>
                </TouchableOpacity>
                <Text style={styles.google}>Sign Up with Google</Text>
            </View>
        </View>
    );
  };
}

  const styles = StyleSheet.create({
    google: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 50,
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
    text: {
        textAlign: 'left',
        fontSize: 24,
        marginRight: 20,
    }, 
    input: {
        height: 34,
        width: 240,
        padding: 10,
        backgroundColor: '#C4C4C4',
        marginLeft: 50,
      }, 
      input4: {
        height: 34,
        width: 240,
        padding: 10,
        backgroundColor: '#C4C4C4',
        marginLeft: 55,
      }, 
      input2: {
        height: 34,
        width: 240,
        padding: 10,
        backgroundColor: '#C4C4C4',
        marginLeft: 10,
      }, 
      input3: {
        height: 34,
        width: 240,
        padding: 10,
        backgroundColor: '#C4C4C4',
        marginLeft: 30,
      }, 
    title: {
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 40,
        marginTop: 20,
    },
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    front: {
        flex: 1,
        backgroundColor: '#8C33FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        flex: 3,
        display: 'flex',
        backgroundColor: '#F6F5F5',
        borderRadius: 50,
        marginTop: 10,
        borderTopLeftRadius: 24,
        position: 'absolute',
        width: 414,
        height: 678,
        left: 0,
        top: 180,

    }
  });
  export default Signup;