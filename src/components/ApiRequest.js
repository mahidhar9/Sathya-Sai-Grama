import {BASE_APP_URL, APP_OWNER_NAME, APP_LINK_NAME} from "@env";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Alert } from "react-native";

const {accessToken} = useContext(UserContext)

export const getData = async (reportName, criteria, value) =>{
  try {
    const url = `${BASE_APP_URL}/${APP_OWNER_NAME}/${APP_LINK_NAME}/report/${reportName}?criteria=${criteria}==${value}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Zoho-oauthtoken ${access_token}`
      },
      params: { 
        criteria:`${criteria}=="${value}"`
      }
    });
    return response.json();
  }
  catch(err){
    Alert.alert("Error: ", err)
    console.log(err)
  }
}

export const postData = () =>{

}