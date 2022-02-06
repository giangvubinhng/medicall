import config from "../config/config";
import axios from "axios";
const locationsService = {

	getLocationsList: async (lat, long) => {
		const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
		const location = `location=${lat},${long}`;
		const radius = '&radius=10000';
		const type = '&keyword=hospital'
		const openNow = '&opennow'
		const key = `&key=${config.API_KEY}`
		const hospitalSearchUrl = url + location + radius + type + openNow + key
		try {
			const res = await axios.get(hospitalSearchUrl)
			return res.data.results
		}
		catch (e) {
			console.log("error occured: " + e)
		}
	}
}

export default locationsService

