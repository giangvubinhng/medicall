import React, { Component} from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity, Image} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {auth} from '../config/fbConfig'
class Login extends Component {   
    constructor() {
        super();
        this.state = { 
          email: '', 
          password: '',
          isLoading: false
        }
      }
    onTextChange = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }
    Login = (email, password) =>{
        if(password === "" || email === ""){
            Alert.alert('form has not completed yet. Please fill the form');
        }
        else if(password.length < 6){
            Alert.alert('Password should have 6 characters long.');
        }
        else{
            this.setState({isLoading: true,});
            auth.signInWithEmailAndPassword(this.state.email,this.state.password).then((res) =>{
                console.log(res);
                console.log('Login Sucessfully');
                this.setState({email: '',password: '',isLoading:false});
                this.props.navigation.navigate('Base');
            }).catch(error =>  Alert.alert('Wrong information. Please try again'))
        }
    }
    render(){
    return (
        <View style={styles.container}>
            <View style={styles.front}>

            </View>
            <View style={styles.body}>
                <Image source={require('../assets/Logo_v2.png')} style={styles.image}/>
                <Text style={styles.title}>Login</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 30,}}>
                <Text style={styles.text}>Email</Text>
                <TextInput style={styles.input} onChangeText={(val) => this.onTextChange(val, 'email')} value={this.state.email}/>
                    
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.text}>Password</Text>
                <TextInput secureTextEntry={true} style={styles.input1} onChangeText={(val) => this.onTextChange(val, 'password')} maxLength={20} value={this.state.password}/>
                </View>
                <TouchableOpacity
                style={styles.button}
                onPress={() => this.Login(this.state.email, this.state.password)}
                >
                    <Text style={styles.but}>Log in</Text>
                </TouchableOpacity>
                <Text style={styles.signup}>Don't have account</Text>
                <Text style={styles.signin} onPress={() => this.props.navigation.navigate('Signup')}>Sign up</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20,}}>
                <Image source={require('../assets/google.png')} style={styles.image2}/>
                <Text style={styles.google}>Log In with Google</Text>
                </View>
            </View>
        </View>
    );
};
}

const styles = StyleSheet.create({
    image:{
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 15,

    },
    image2: {
        marginLeft: 22
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
        marginTop: 40,
        marginLeft: 100,
    },
    google: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 30,
        marginLeft: 30
    },
    signin:{
        fontSize: 24,
        textAlign: 'center',
        marginTop: 20,
        color: '#8C33FF',
    },
    signup: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 18,
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 40,
        marginTop: 20,
    },
    input: {
        height: 34,
        width: 240,
        padding: 10,
        backgroundColor: '#C4C4C4',
        marginLeft: 50,
      }, 
      input1: {
        height: 40,
        width: 240,
        marginLeft: 4,
        padding: 10,
        backgroundColor: '#C4C4C4',
      }, 
    text: {
        textAlign: 'left',
        fontSize: 24,
        marginRight: 20,
        marginLeft: 5,
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
        borderRadius: 64,
        marginTop: 10,
        borderTopLeftRadius: 30,
        position: 'absolute',
        width: 414,
        height: 678,
        left: 0,
        top: 182,
    }
});

export default Login;