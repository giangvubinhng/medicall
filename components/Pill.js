import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Image } from 'react-native';
import { db } from '../config/Firebase';
import { ListItem } from 'react-native-elements'

class Pill extends Component {
    constructor() {
        super();
        this.firestoreRef = db.collection('prescripts');
        this.state = {
            isLoading: true,
            userArr: []
        };
    }
    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    getCollection = (querySnapshot) => {
        const userArr = [];
        querySnapshot.forEach((res) => {
            const { name, frequency, amount, time } = res.data();
            userArr.push({
                key: res.id,
                res,
                name,
                frequency,
                amount,
                time
            });
        });
        this.setState({
            userArr,
            isLoading: false,
        });
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        return (
            <ScrollView style={styles.container}>
                {
                    this.state.userArr.map((item, i) => {
                        return (
                            <ListItem
                                key={i}
                                chevron
                                bottomDivider
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: 8
                                }}>
                                <Image source={require('../assets/pill2.png')} />
                                <ListItem.Content>
                                    <ListItem.Title style={{ fontWeight: "bold" }}>{`Current Pill: ${item.name}`}</ListItem.Title>
                                    <ListItem.Subtitle>{`Taking ${item.frequency} a week`}</ListItem.Subtitle>
                                    <ListItem.Subtitle>{`${item.amount} times a day`}</ListItem.Subtitle>
                                    <ListItem.Subtitle>{`Time to take: ${item.time}`}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        );
                    })
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 22

    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Pill;