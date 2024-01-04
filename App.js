/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */



/* Ref Video: https://www.youtube.com/watch?v=nZlSgvKd0w4  */


//import liraries
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType, RewardedAd, RewardedAdEventType} from 'react-native-google-mobile-ads';



const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const adUnitId2 = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';


const adUnitId3 = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';



const interstitial = InterstitialAd.createForAdRequest(adUnitId2, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});





const rewarded = RewardedAd.createForAdRequest(adUnitId3, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});





// create a component
const App = () => {




  const [loaded, setLoaded] = useState(false);
  const [loaded3, setLoaded3] = useState(false);

  
  
  
  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  
  
  
  
  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded3(true);
    });
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
      },
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  // No advert ready to show yet
  if (!loaded3) {
    return null;
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // No advert ready to show yet
  if (!loaded) {
    return null;
  }



  
  
  
  
  
  return (
    <View style={styles.container}>
      <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
    
    
    
    
    <TouchableOpacity style={{
      width:'80%',
      height:50,
      borderWidth:1,
      alignSelf:'center',
      marginTop:100,
      justifyContent:'center',
      alignItems:'center'
    }}
    onPress={()=>{interstitial.show();}}
    >

      <Text>Show Interstitial Ads</Text>
    </TouchableOpacity>




    <TouchableOpacity style={{
      width:'80%',
      height:50,
      borderWidth:1,
      alignSelf:'center',
      marginTop:100,
      justifyContent:'center',
      alignItems:'center'
    }}
    onPress={()=>{rewarded.show();}}
    >

      <Text>Show Rewarded Ads</Text>
    </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default App;