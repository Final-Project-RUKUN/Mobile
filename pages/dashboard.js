import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';
import Home from './home';
import Icon from 'react-native-vector-icons/Entypo';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MyTransaction from './myTransaction';
import Suggestion from './suggestion';

const Tab = createMaterialBottomTabNavigator();


const Dashboard = ({route, navgation}) => {

  return (
    <Tab.Navigator barStyle={{ backgroundColor: '#3c5cac' }}>
      <Tab.Screen name="Home" component={Home} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
          
        }}
        />
      <Tab.Screen name="VillageTransaction" component={MyTransaction} 
        options={{
          tabBarLabel: 'Transactions',
          tabBarIcon: ({ color }) => (
            <Icon name="credit" color={color} size={26} />
          ),
          
        }}
      />
      <Tab.Screen name="Suggestion" component={Suggestion} 
        options={{
          tabBarLabel: 'Information',
          tabBarIcon: ({ color }) => (
            <Icon name="info" color={color} size={26} />
          ),
          
        }}
        />
      <Tab.Screen name="Settings" component={Home} 
        options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color }) => (
            <Icon name="chat" color={color} size={26} />
            ),
            
        }}
        listeners={({navigation})=>({
            tabPress: event =>{
                event.preventDefault();
                console.log("fadhoo");
                navigation.navigate("Chat")
            }
        })}
      />
    </Tab.Navigator>
  );
};

export default Dashboard;