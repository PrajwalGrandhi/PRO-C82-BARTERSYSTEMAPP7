import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Alert,Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import { createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';
import db from '../config';

export default class SideDrawer extends React.Component{
    render(){
        return(
            <View>
                <View>
            <DrawerItems {...this.props}/>
            <TouchableOpacity onPress={()=>{
                this.props.navigation.navigate('LoginScreen');
                firebase.auth().signOut();
        }}>
                <Text>LOG OUT</Text>
            </TouchableOpacity>
                </View>
                
            </View>
        );
    }
}