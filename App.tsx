import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateInvoice from './components/invoice/createInvoice'; // Import your CreateInvoice component
import Wasooli from './components/invoice/wasooli'; // Import your CreateInvoice component
import CustomerLedger from './components/reports/CustomerLedger'; // Import your CreateInvoice component

// Import icon library (MaterialIcons, FontAwesome, etc.)
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { StyleSheet } from 'react-native';


// Create a Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: { fontSize: 14 },
          tabBarStyle: {
            paddingBottom: 5,
            height: 60,
            backgroundColor: '#fff',
          },
        }}
      >
        <Tab.Screen
          name="Create Invoice"
          component={CreateInvoice}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="assignment" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Orders"
          component={CreateInvoice}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="list" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Bills"
          component={Wasooli}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="list-alt" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="CustomerLedger"
          component={CustomerLedger}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="list-alt" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// Optional: Add global styles if needed
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    height: 60,
    paddingBottom: 5,
  },
});

export default App;
