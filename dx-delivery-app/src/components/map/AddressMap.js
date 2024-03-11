import React, {useRef, useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useTheme} from '@hooks';
import styles from './styles';
import LocationPinImage from '../common/OriginLocationPin';

const AddressMap = ({
  regionData,
  markerData,
  loading,
  originMarker,
  destinationMarker,
  customStyles,
}) => {
  const {colors} = useTheme();
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current && originMarker && destinationMarker) {
      const markers = [originMarker, destinationMarker];
      mapRef.current.fitToCoordinates(markers, {
        edgePadding: styles.edgePadding,
        animated: true,
      });
    }
  }, [destinationMarker, originMarker]);

  return (
    <View style={[styles.mapContainer, customStyles]}>
      {loading && (
        <ActivityIndicator
          size="large"
          color={colors.status.loading.main}
          style={styles.loadingStyle}
        />
      )}
      <MapView
        ref={mapRef}
        style={styles.map}
        zoomTapEnabled
        region={regionData}
        zoomControlEnabled
      >
        {!!originMarker && (
          <Marker coordinate={originMarker} identifier={originMarker._id}>
            <LocationPinImage type={'origin'} />
          </Marker>
        )}
        {!!destinationMarker && (
          <Marker
            coordinate={destinationMarker}
            identifier={destinationMarker._id}
          >
            <LocationPinImage type={'destination'} />
          </Marker>
        )}
      </MapView>
    </View>
  );
};

export default AddressMap;
