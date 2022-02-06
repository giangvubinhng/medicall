import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Button} from 'react-native';
import locationsService from '../services/locations.service';
import * as Location from 'expo-location'
const Clinic = () => {
	const [errorMsg, setErrorMsg] = useState(null)
	const [results, setResults] = useState({
		progress: 'loading',
		list: []
	})
	async function fetchLocation(phoneLocation) {
		try {
			const lat = phoneLocation.coords.latitude
			const long = phoneLocation.coords.longitude
			const fetchedList = await locationsService.getLocationsList(lat, long)
			if (!fetchedList) {
				console.log("error fetching cooridnates")
				setResults({
					progress: 'failed',
					list: []
				})
				return;
			}
			setResults({
				progress: 'fetched',
				list: fetchedList
			})
		}
		catch (e) {
			console.log(e)
		}


	}
	async function getHospitalsAsync() {
		try {

			let {status} = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied')
				return
			}
			let currLocation = await Location.getCurrentPositionAsync()
			if (!currLocation) {
				console.log("error fetching")
				return
			}
			fetchLocation(currLocation)

		}
		catch (e) {
			console.log("error is" + e)
		}

	}
	useEffect(() => {
		getHospitalsAsync()
	}, [])
	return (
		<View style={styles.container}>
			<Text>Locations</Text>
			{errorMsg ? <Text>Please share your location with us</Text> : null}
			{results.progress === 'loading' ? (<Text>Loading...</Text>) : (<FlatList data={results.list} renderItem={({item}) => <Text>{item.name}</Text>} keyExtractor={(item, index) => index.toString()} />)}
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
