import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';

const timeConvert = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
}
const Home = ({ navigation }) => {
    const [items, setItems] = useState({});

    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModalVisibility = () => {
        setModalVisible(!isModalVisible);
    };

    const loadItems = (day) => {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeConvert(time);
                if (!items[strTime]) {
                    items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        items[strTime].push({
                            name: 'Item for ' + strTime + ' #' + j,
                            height: Math.max(50, Math.floor(Math.random() * 150)),
                        });
                    }
                }
            }
            const newItems = {};
            Object.keys(items).forEach((key) => {
                newItems[key] = items[key];
            });
            setItems(newItems);
        }, 1000);
    };
    const renderItem = (item) => {
        return (
            <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
                <Card>
                    <Card.Content>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                            <Avatar.Text label="J" />
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    };
    return (

        <View style={{ flex: 1 }}>
            <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                selected={timeConvert(new Date())}
                renderItem={renderItem}
                theme={{
                    dotColor: "#8c33ff",
                    selectedDayBackgroundColor: "#8c33ff",
                    agendaDayTextColor: "#8c33ff",
                    agendaDayNumColor: "#8c33ff",
                    agendaTodayColor: '#4F44B6',
                    backgroundColor: '#F1F1F8',
                }}
            />
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('AddPill')}
                style={styles.touchableOpacityStyle}>
                <MaterialCommunityIcons name="plus-circle" size={50} color={"#8c33ff"} />
            </TouchableOpacity>


        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 8,
        bottom: 8,
        borderRadius: 30,
        elevation: 8
    },
});

export default Home;