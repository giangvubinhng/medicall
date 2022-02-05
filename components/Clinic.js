import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import locationsService from '../services/locations.service';
import * as Location from 'expo-location'
const Clinic = () => {
	const [location, setLocation] = useState(null)
	const [errorMsg, setErrorMsg] = useState(null)
	const [results, setResults] = useState([])
	async function fetchLocation(location) {
		try {
			const lat = location.coords.latitude
			const long = location.coords.longitude
			const fetchedList = await locationsService.getLocationsList(lat, long)
			setResults(fetchedList)
		}
		catch (e) {
			console.log("error")
		}

	}
	useEffect(() => {
		(async () => {
			try {

				let {status} = await Location.requestForegroundPermissionsAsync()
				if (status !== 'granted') {
					setErrorMsg('Permission to access location was denied')
					return
				}
				let currLocation = await Location.getCurrentPositionAsync()
				setLocation(currLocation)
				fetchLocation(currLocation)
			}
			catch (e) {
				console.log("error is" + e)
			}
		})()

	}, [])
	return (
		<View style={styles.container}>
			<Text>Locations</Text>
			{errorMsg ? <Text>Please share your location with us</Text> : null}
			{location ? (<FlatList data={results} renderItem={({item}) => <Text>{item.name}</Text>} keyExtractor={(item, index) => index.toString()} />) : (<Text>No hospital found in the area</Text>)}
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Clinic;
