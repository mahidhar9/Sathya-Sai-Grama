import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_URL = 'https://accounts.zoho.com/oauth/v2/token';
const CLIENT_ID = '1000.L90R6QHR1SIG41EGBF8COE9QM7SSIN';
const CLIENT_SECRET = 'b3a9ec4aa1af7cac901782395b72cb76950f5cfccc';
const REDIRECT_URI = 'https://sathyasaigramaashram.zoho.com/callback';
const REFRESH_TOKEN =
  '1000.21e80e617d50f33333851dcfb688d979.87f71644a2b0db8d139792c1b532183f';

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
        redirect_uri: REDIRECT_URI,
        grant_type: 'refresh_token',
      }).toString(),
    });

    const data = await response.json();

    if (data.access_token) {
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