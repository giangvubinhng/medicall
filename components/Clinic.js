import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Modal, Text, View, FlatList, Button, Image, TouchableOpacity, Linking, Platform, Pressable} from 'react-native';
import locationsService from '../services/locations.service';
import * as Location from 'expo-location'
const Clinic = () => {
	const [errorMsg, setErrorMsg] = useState(null)
	const [location, setLocation] = useState(null)
	const [results, setResults] = useState({
		progress: 'loading',
		list: []
	})
	const [modalVisible, setModalVisible] = useState(false)
	function openMap(label) {
		const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='})
		const latLng = `${location.lat},${location.lng}`
		const url = Platform.select({
			ios: `${scheme}${label}@${latLng}`,
			android: `${scheme}${latLng}(${label})`
		})
		setModalVisible(!modalVisible)
		Linking.openURL(url)
	}

	function openModal(geometry, name) {
		setLocation({
			...geometry,
			name
		})
		setModalVisible(true)
	}
	function closeModal() {
		setLocation(null)
		setModalVisible(!modalVisible)
	}
	async function fetchLocation(phoneLocation) {
		try {
			const lat = phoneLocation.coords.latitude
			const long = phoneLocation.coords.longitude
			const fetchedList = await locationsService.getLocationsList(lat, long)
			if (!fetchedList || fetchedList.length === 0) {
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
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>Open in map?</Text>
						<View style={styles.modalBtn}>
							<Pressable
								style={[styles.button, styles.buttonClose]}
								onPress={() => openMap(location.name)}
							>
								<Text style={styles.textStyle}>Yes</Text>
							</Pressable>
							<Pressable
								style={[styles.button, styles.buttonClose]}
								onPress={() => closeModal()}
							>
								<Text style={styles.textStyle}>No</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>
			<View style={styles.header}>
				{results.progress === 'loading' ? <Text>Loading...</Text> : <Text>Here's what we found...</Text>}
			</View>
			{errorMsg ? <Text>Please share your location with us</Text> : null}
			{results.progress === 'failed' ? <Text>Sorry, no location found</Text> : <FlatList keyExtractor={(item) => item.place_id} data={results.list} renderItem={({item}) => (
				<TouchableOpacity style={styles.item} onPress={() => openModal(item.geometry.location, item.name)}><Image style={styles.image} source={require('../assets/hospital.png')} /><Text style={{fontSize: 14}}> {item.name}</Text></TouchableOpacity>)} />}
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 40,
		paddingHorizontal: 5,
		justifyContent: "center",
		alignItems: "center"
	},
	modalView: {
		marginTop: 100,
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	modalBtn: {
		flexDirection: 'row',
		flexWrap: 'wrap'

	},
	buttonClose: {
		backgroundColor: "#2196F3",
		padding: 10,
		margin: 5
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	},
	header: {
		width: '80%',
		height: 50,
		borderRadius: 20,
		backgroundColor: '#ccb2ff',
		justifyContent: "center",
		alignItems: "center"

	},
	item: {
		marginTop: 25,
		padding: 15,
		flexDirection: 'row',
		flexWrap: 'wrap',
		backgroundColor: '#ffff',
		borderRadius: 10,
	},
	image: {
		width: 30,
		height: 30,
	}

});

export default Clinic;
