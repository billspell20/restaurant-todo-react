import MobileStoreButton from 'react-mobile-store-button';
import React from "react";

const iOSUrl = 'https://apps.apple.com/us/app/restaurant-passport-to-do-list/id1591105796';
const androidUrl = 'https://play.google.com/store/apps/details?id=williamspell.restaurant_flutter';

function StoreIcons() {
  return (
    <div id="storediv">
                <MobileStoreButton
                  store="ios"
                  url={iOSUrl}
                  linkProps={{ title: 'iOS Store Button' }}
                  style={{height: '130px', width: '275px', marginTop: '0px', display: 'inline-block',  position: 'bottom'}}
                />
                <MobileStoreButton
                  store="android"
                  url={androidUrl}
                  linkProps={{ title: 'Google Play Button' }}
                  style={{height: '150px', width: '310px', display: 'inline-block'}}
                />
    </div>
  );
}

export default StoreIcons; 