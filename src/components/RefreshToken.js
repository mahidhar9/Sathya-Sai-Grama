import AsyncStorage from '@react-native-async-storage/async-storage';
import {TOKEN_URL, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN} from "@env";
  

const getAccessFromRefresh = async () => {
  try {
    const response = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        refresh_token: REFRESH_TOKEN,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'refresh_token',
      }).toString(),
    });

    const data = await response.json();
    console.log("data = ",data)

    if (data.access_token) {
      console.log("inner if")
      await AsyncStorage.setItem('access_token', data.access_token);
      return data.access_token.trim();
    } else {
      throw new Error('Failed to refresh token');
    }
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

export {getAccessFromRefresh};