import React from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Alert,Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import {Card} from 'react-native-elements';
export default class RequestDetailsScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            details:this.props.navigation.getParam('details'),
            userid:this.props.navigation.getParam('details')['emailid'],
            useremail:'',
            username:'',
            useraddress:'',
            itemname:this.props.navigation.getParam('details')['itemname'],
            itemdesc:this.props.navigation.getParam('details')['itemdescription'],
            donorid:firebase.auth().currentUser.email,
        };
    }

    componentDidMount(){
this.getUserDetails()
    }

    getUserDetails=()=>{
db.collection('UserDetails').where('emailid','==',this.state.userid).get().then(
    snapshot=>{snapshot.forEach(doc=>{
        this.setState({
            useremail:doc.data().emailid,
            username:doc.data().fullname,
            useraddress:doc.data().address,
        })
    })}
)
    }

    updateTransaction=()=>{
        db.collection('Trades').add({
        itemname:this.state.bookname,
        donorid:this.state.donorid,
        userid:this.state.userid,
        status:"donor interested",
        
        })
            }

            // addNotification=()=>{
            //     db.collection('Notifications').add({
            //         userid:this.state.userid,
            //         donorid:this.state.donorid,
            //         itemname:this.state.itemname,
            //         date:firebase.firestore.FieldValue.serverTimestamp()
            //     })
            // }

    render(){
        return(
            <View>
            <Card>
            <Text>{"Item Name: "+this.state.itemname} </Text>
            </Card>

            <Card>
            <Text>{"Item Description: "+this.state.itemdesc} </Text>
            </Card>

            <Card>
            <Text>{"EmailID: "+this.state.useremail}</Text>
            </Card>

              <Card>
                  <Text>{"Address: "+this.state.useraddress}</Text>
              </Card>
              <View>
              
              {    
                  (this.state.userid!=this.state.donorid)?
                          (
                              
                                <View>
                                <TouchableOpacity onPress={()=>{
                                    this.updateTransaction();
                                  //   this.addNotification()
                                    this.props.navigation.navigate('HomeScreen')
                                    }}>
                                    <Text>Donate</Text>
                                </TouchableOpacity>
                                </View>
                              
                          ):null
             }
              </View>
      </View>
        );
    }
}