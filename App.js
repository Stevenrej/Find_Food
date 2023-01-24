import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { View, Modal, TouchableHighlight, TouchableWithoutFeedback, Text, Button, StyleSheet, Pressable, Image, ScrollView, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { GOOGLE } from '@env';
import { Rating } from 'react-native-ratings'

const App = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [transport, setTransport] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const styles = StyleSheet.create({
    buttonContainer: {
      backgroundColor: 'white',
      borderRadius: 6,
      padding: 6,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    title: {

      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 43,
      textAlign: 'center',
      backgroundColor: 'green',
      color: 'white',
      fontSize: 36,
      fontFamily: 'Optima-BoldItalic',
    },
    modalView: {
      margin: 20,
      marginTop: 450,
      marginBottom: 50,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'left',
    },
    modalTextTitle: {
      marginBottom: 15,
      textAlign: 'left',
      fontSize: 26,
    },
  });

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      let { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=1500&type=restaurant&key=${GOOGLE}`);
      setTransport(data.results);
      setIsLoading(false);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#228B22" />
          <Text style={styles.modalTextTitle}>Loading Your Next Meal</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>FindFood</Text>
          {location && (
            <MapView
              style={{ flex: 9 }}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {transport && transport.map((item, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: item.geometry.location.lat,
                    longitude: item.geometry.location.lng,
                  }}
                  onPress={() => {
                    setModalVisible(true);
                    setSelectedMarker(item);
                  }}
                />
              ))}
            </MapView>
          )}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalView}>
              <View>
                {selectedMarker && (
                  <View>
                    <Image
                      style={styles.tinyLogo}
                      source={'https://reactnative.dev/img/tiny_logo.png'}
                    />
                    <Text style={styles.modalTextTitle}>{selectedMarker.name}</Text>
                    {console.log(selectedMarker)}
                    {/* <Text>{selectedMarker?.types[0]}</Text> */}
                    <Text style={styles.modalText}>Address: {selectedMarker.vicinity}</Text>
                    <Text style={styles.modalText}>Price: {
                      (() => {
                        switch (selectedMarker.price_level) {
                          case 0:
                            return 'Free';
                          case 1:
                            return '$';
                          case 2:
                            return '$$';
                          case 3:
                            return '$$$';
                          case 4:
                            return '$$$$';
                          default:
                            return 'N/A';
                        }
                      })()
                    }</Text>
                    {/* <Text  style={styles.modalText}>{selectedMarker.opening_hours.open_now ? 'Open!' : 'Closed'}</Text> */}
                    <Rating
                      style={styles.modalText}
                      ratingCount={5}
                      startingValue={selectedMarker.rating}
                      imageSize={20}
                      readonly
                    />
                  </View>
                )}
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Return To Map</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View >
  );
};

export default App;
