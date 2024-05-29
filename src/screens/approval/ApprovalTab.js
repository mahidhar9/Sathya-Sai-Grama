import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Pending from './Pending';
import Approved from './Approved';
import Denied from './Denied';
import HeaderWithSearch from './HeaderWithSearch';
import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VerifyDetails from './VerifyDetails';

const Tab = createMaterialTopTabNavigator();
const PendingStack = createNativeStackNavigator();


const PendingStackScreens = () =>{

    return(
        <PendingStack.Navigator screenOptions={{ headerShown: false }}>
            <PendingStack.Screen name="Pending" component={Pending}/>
            <PendingStack.Screen name="VerifyDetails" component={VerifyDetails} />
        </PendingStack.Navigator>
    )
}

function ApprovalTab() {
    const [search, setSearch] = useState('');
    return (
        <>
            <HeaderWithSearch search={search} setSearch={setSearch} />
            <Tab.Navigator>
                <Tab.Screen name="PendingStackScreens" component={PendingStackScreens} options={{title: "Pending"}}/>
                <Tab.Screen name="Approved" component={Approved} />
                <Tab.Screen name="Denied" component={Denied} />
            </Tab.Navigator>
        </>

    );
}

export default ApprovalTab