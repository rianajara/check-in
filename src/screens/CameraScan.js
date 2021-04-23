import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QRCode from 'react-native-qrcode-svg';
import { UserContext } from '../context/UserContext.js';
import { useContext } from 'react';
import Firebase from '../components/Firebase';

const db = Firebase.firestore();
db.settings({ timestampsInSnapshots: true });

const CameraScan= (props) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const image = require('../images/image.png');
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const { currentUser, setCurrentUser } = useContext(UserContext);


    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

      const addAttendee= () => { 
        db.collection('OrgEvents')
            .doc(currentUser['hostOrg'])
            .collection('Events')
            .doc(title)
            .collection('Attendees')
            .doc({data})
            .set(
                {
                      'Attendees': ""
                    },
                { merge: true }
            )
      };
    
      const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        // alert(`${data}`);
        console.warn({data});
      };
    
      if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }
    
    return ( 
        <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned, addAttendee}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    barCodeView: {
      width: '100%', 
      height: '50%', 
      marginBottom: 40
    },
  });

export default CameraScan;