README
This is a React Native application that displays a map with nearby restaurants using the Google Places API. The user's current location is determined using the Expo Location API and the nearby restaurants are displayed on the map as markers.

The user can press on a marker to see more details about the restaurant in a modal. The modal includes the name of the restaurant, the type of cuisine and the opening status of the restaurant.

How to run the application
Clone the repository
Run npm install to install the dependencies
Create a .env file in the root directory and add the following line: GOOGLE=YOUR_API_KEY where YOUR_API_KEY is your Google Places API key
Run expo start to start the development server
Use the Expo app on your mobile device to scan the QR code and run the application on your device
Dependencies
expo
react-native-maps
expo-location
axios
dotenv
Note
The API key for the Google Places API is required to run this application. You can obtain a key by following the instructions here: https://developers.google.com/maps/gmp-get-started#create-project

Please make sure to keep your API key secure and do not share it with anyone.
