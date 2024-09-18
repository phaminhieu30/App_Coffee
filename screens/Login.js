import React, { useState ,useEffect} from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { colors, icons, images } from "../constants"
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const App = ({navigation}) => {

    const [selectedTab,setSelectedTab] = useState('signin');
    const changeTab = (tab) => {
        setSelectedTab(tab);}
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userCredential, setuserCredential] = useState();
    const loginfire = () => {
        auth().signInWithEmailAndPassword(email, password)
            .then((res) => {
                navigation.navigate("TabNavigator",{name: email.split("@")[0]})
            })
            .catch((error) => {
                console.log(error)
            });
            
    }
    const handleRegister=()=>{
        navigation.navigate("Register", { email: email })
    }
    useEffect(()=>{
        GoogleSignin.configure({
            webClientId: '767447950358-fjm7ksu2qmi04v7565ghue4g5f0un2m7.apps.googleusercontent.com'
        })
    },[])
    let isSigningIn = false;

    async function onGoogleButtonPress() {
        try {
            if (isSigningIn) {
                throw new Error('Sign-in process is already in progress');
            }
            isSigningIn = true;
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            
            // Get the user's ID token
            const { idToken,user } = await GoogleSignin.signIn();
            console.log(idToken)
            console.log(user)
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
          
            // Sign-in the user with the credential
            setuserCredential(await auth().signInWithCredential(googleCredential));
            navigation.navigate("TabNavigator", { name: user.email })
            isSigningIn = false;
            
            // Return the user credential
            return userCredential;
        } catch (error) {
            // Handle error
            console.error('Google sign-in error:', error);
            isSigningIn = false;

        }
    }

    const forgot = () => {
      auth().sendPasswordResetEmail( email)
        .then(() => {
          Alert.alert("Password reset email sent!");
        })
        .catch((error) => {
          Alert.alert("Error", error.message);
        });
    };
  return (
    <View style={styles.container}>
      <Image source={images.background} style={styles.image} />

      <View style={styles.form}>
        <View style={{flexDirection:'row',justifyContent:'space-between',height:"20%"}}>
            <TouchableOpacity  style={selectedTab === 'signin' ? styles.activeTabButton : styles.unActiveTabButton}
                >
                <Text style={styles.title}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity style={selectedTab === 'signup' ? styles.activeTabButton : styles.unActiveTabButton} 
            onPress={(handleRegister)}>
                <Text style={styles.title}>Đăng ký</Text>
            </TouchableOpacity>
        </View>
        <View style ={styles.inputContainer}> 
            <Image source ={icons.email} style={styles.icon} resizeMode='contain'/>
            <TextInput
            style={styles.input}
            placeholder="Email Adress"
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

        <TouchableOpacity style={styles.button} onPress={loginfire}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPasswordButton} onPress={(forgot)}>
          <Text style={styles.forgotPasswordText}>Quên mật khẩu</Text>
        </TouchableOpacity>
        <View style={styles.or}>
            <View style={{borderBottomWidth:2,width:115}}/>
            <Text style={styles.fontOr}>hoặc</Text>
            <View style={{borderBottomWidth:2,width:115}}/>
        </View>
        <TouchableOpacity style={styles.forgotPasswordButton} onPress={(onGoogleButtonPress)}>
            <Image source={icons.gg} style={{height: 40, width: 40}} resizeMode='contain'/>
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
  inputContainer:{
    flexDirection:'row',
    alignItems:'center',
    borderBottomWidth: 2,
    borderColor: colors.primary,
    marginBottom:10,
  },
  fontOr:{
    fontSize: 18,
    marginHorizontal: 15
  },
  icon:{

    width:35,
    height:35
},

  image: {
    flex:0.4,
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  form: {
    flex:0.6,
    marginTop: 20,
    width: 300,
  },
  or:{
    marginTop:10,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
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
    padding:10,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
    fontSize : 20
  },
  button: {
    marginTop:20,
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
    alignSelf:'center',
    justifyContent: 'center',
    alignItems: 'center',
    width:150
  },
  buttonText: {
    color: colors.item,
    fontSize: 22,
    fontWeight: '500'
  },
  forgotPasswordButton: {
    marginTop: 15,
    marginBottom: 5,
    alignSelf:'center'

  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 16
  },
})

export default App