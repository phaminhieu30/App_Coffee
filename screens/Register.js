import React, { useState } from "react";
import { colors, icons, images } from "../constants"
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity,Alert } from 'react-native';
import auth from '@react-native-firebase/auth'
import { setDoc,doc, collection } from "firebase/firestore";
export default function Register({ navigation, route }) {
  const [selectedTab,setSelectedTab] = useState('signup');
  const [email, setEmail] = useState('');
  const [Confirm, setConfirm] = useState('');
  const [password, setPassword] = useState('');
  const changeTab = (tab) => {
    setSelectedTab(tab);}
  const login_page =()=>{
    navigation.navigate("Login",email.split("@")[0])

  }
  const register_firebase = () => {
    if(password==Confirm)
      {
    auth().createUserWithEmailAndPassword(email,password)
      .then(async () => {
        const user = doc(db,"User",`${email.split("@")[0]}`)
        const account = {
          name : email,
          phone : null,
          address : null
        }
        await setDoc(user,account)
        console.log("Add user succesfull")
        Alert.alert('Alert Title', `Đăng ký thành công ${email}`, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'OK', onPress: () => navigation.navigate("Login") },
        ]);
      })
      .catch(function (error) {
        console.error(error);
      });
      
  }
  else
  { Alert.alert('Alert Title', `Password Wrong`, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    { text: 'OK', onPress: () => navigation.navigate("Register") },
  ]);}
  }

  return (
    <View style={styles.container}>
      <Image source={images.background} style={styles.image} />

      <View style={styles.form}>
        <View style={{flexDirection:'row',justifyContent:'space-between',height:"20%"}}>
            <TouchableOpacity  style={selectedTab === 'signin' ? styles.activeTabButton : styles.unActiveTabButton}
                    onPress={(login_page)} >
                <Text style={styles.title}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity style={selectedTab === 'signup' ? styles.activeTabButton : styles.unActiveTabButton} 
            onPress={()=>{}}>
                <Text style={styles.title}>Đăng ký</Text>
            </TouchableOpacity>
        </View>
        <View style ={styles.inputContainer}> 
            <Image source ={icons.email} style={styles.icon} resizeMode='contain'/>
            <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(email) => { setEmail(email) }}            value={email}
            />
        </View>
        <View style ={styles.inputContainer}> 
        <Image source ={icons.pass} style={styles.icon} resizeMode='contain'/>

        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}value={password}
        />
        </View>
        <View style ={styles.inputContainer}> 
        <Image source ={icons.pass} style={styles.icon} resizeMode='contain'/>

        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu"
          secureTextEntry={true}
            onChangeText={(confirm)=>setConfirm(confirm)}  value={Confirm==password?password:Confirm}
        />
        </View>

        <TouchableOpacity style={styles.button} onPress={(register_firebase)}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>

      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.item,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: colors.primary,
    marginBottom: 10,
  },
  icon: {
    width: 35,
    height: 35,
  },
  image: {
    flex: 0.4,
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  form: {
    flex: 0.6,
    marginTop: 20,
    width: 300,
  },
  unActiveTabButton: {
    width: '48%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabButton: {
    width: '48%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: colors.primary,
  },
  title: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '600',
  },
  input: {
    padding: 10,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
    fontSize: 20,
  },
  button: {
    marginTop: 30,
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
  },
  buttonText: {
    color: colors.item,
    fontSize: 22,
    fontWeight: '500',
  },
  forgotPasswordButton: {
    marginTop: 15,
    marginBottom: 5,
    alignSelf: 'center',
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 15,
  },
});
