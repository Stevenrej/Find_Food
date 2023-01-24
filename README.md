# README

This is a React Native application that utilizes the react-native-maps library to display a map on the screen. The user's current location is determined using the expo-location library, and markers are displayed on the map to represent nearby locations. The location data for these markers is retrieved from an API using the axios library.

The user can press on a marker to see more details about the location in a modal. The modal includes the name of the location, the type of location and the opening status of the location.

To run the application:

Clone the repository
Run npm install to install the dependencies
Create a .env file in the root directory and add the following line: GOOGLE=YOUR_API_KEY, where YOUR_API_KEY is your Google Places API key
Run expo start to start the development server
Use the Expo app on your mobile device to scan the QR code and run the application on your device

## Dependencies:

expo
react-native-maps
expo-location
axios
dotenv

## Note

 The API key for the Google Places API is required to run this application. You can obtain a key by following the instructions at [GoogleMaps API](https://developers.google.com/maps/gmp-get-started#create-project). Please make sure to keep your API key secure and do not share it with anyone.

The application also uses the useState, useEffect and useRef hooks to handle component state and animation respectively. StyleSheet is also used for styling the components.

[Expo Link](https://expo.dev/@stevenrej/expo-test?serviceType=classic&distribution=expo-go)
