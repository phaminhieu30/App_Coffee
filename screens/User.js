import React, { useEffect, useState,useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { colors, icons } from '../constants';
import { setDoc, where, query, doc, collection, getDoc, getDocs } from 'firebase/firestore';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const User = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [name, setName] = useState(route.params.name);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [initialName, setInitialName] = useState(name);
  const [initialPhone, setInitialPhone] = useState(phone);
  const [initialAddress, setInitialAddress] = useState(address);

  const validateInput = (input, type) => {
    if (input.trim() === '') {
      Alert.alert('Lỗi', `${type} không được để trống.`);
      return false;
    }
    if (type === 'Số điện thoại' && (!/^\d{10}$/.test(input))) {
      Alert.alert('Lỗi', 'Số điện thoại phải là dãy số có 10 chữ số.');
      return false;
    }
    return true;
  };

  const handleBlur = (value, type, setValue, setInitialValue, setEditing) => {
    if (validateInput(value, type)) {
      setEditing(false);
    } else {
      setValue(setInitialValue);
      setEditing(false);
    }
  };

  const Line = () => {
    return <View style={styles.line} />
  }
  
    const getUser = async () => {
      const docRef = doc(db, "User", `${route.params.name}`);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data())
      if (docSnap.exists()) {
        setName((docSnap.data().name))
        setAddress(docSnap.data().address)
        setPhone(docSnap.data().phone)
      }
    }

  useFocusEffect(
    useCallback(() => {
        getUser()
    }, [])
)
useEffect(()=>{
  const change = async () => {
    const user = doc(db, "User", `${route.params.name}`)
    
    const data = {
      name: name,
      phone: phone,
      address: address
    }
    if (data.phone!=""&&data.address!="")
      {
    await setDoc(user, data)
      }
  }
  change()
},[name,phone,address])
  const signout =()=>{
    navigation.navigate("Login")
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Tài khoản</Text>
      </View>
      <View style={styles.profile}>
        <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlOfwZuuiTfXa2z0_HBPR1AtJbgKYTaDN1Rxjw5HkL2A&s' }}
          style={styles.profileImage} />
        <Text style={styles.profileName}>{name}</Text>
      </View>
      <View style={styles.details}>
        <View>
          <View style={styles.sectionHeader}>
            <Image source={icons.account} style={styles.sectionIcon} tintColor={colors.primary} />
            <Text style={styles.sectionHeaderText}>Thông tin tài khoản</Text>
          </View>

          <View style={styles.sectionContent}>
            <TouchableOpacity style={styles.sectionRow} onPress={() => { setIsEditingName(true); setInitialName(name) }}>
              {isEditingName ? (
                <TextInput
                  style={styles.textInput}
                  value={name}
                  onChangeText={setName}
                  onBlur={() => handleBlur(name, 'Tên', setName, initialName, setIsEditingName)}
                  autoFocus
                />
              ) : (
                <Text style={styles.sectionText}>Tên: {name}</Text>
              )}
              <Image source={icons.edit} style={styles.editIcon}  />
            </TouchableOpacity>
            <Line />
            <TouchableOpacity style={styles.sectionRow} onPress={() => { setIsEditingPhone(true); setInitialPhone(phone); }}>
              {isEditingPhone ? (
                <TextInput
                  style={styles.textInput}
                  value={phone}
                  onChangeText={setPhone}
                  onBlur={() => handleBlur(phone, 'Số điện thoại', setPhone, initialPhone, setIsEditingPhone)}
                  keyboardType="phone-pad"
                  autoFocus
                />
              ) : (
                <Text style={styles.sectionText}>Số điện thoại: {phone}</Text>
              )}
              <Image source={icons.edit} style={styles.editIcon} />
            </TouchableOpacity>
            <Line />
            <TouchableOpacity style={styles.sectionRow} onPress={() => { setIsEditingAddress(true); setInitialAddress(address); }}>
              {isEditingAddress ? (
                <TextInput
                  style={[styles.textInput, styles.sectionAddressInput]}
                  value={address}
                  onChangeText={setAddress}
                  onBlur={() => handleBlur(address, 'Địa chỉ', setAddress, initialAddress, setIsEditingAddress)}
                  autoFocus
                />
              ) : (
                <Text style={[styles.sectionText, styles.sectionAddress]}>Địa chỉ nhận hàng: {address}</Text>
              )}
              <Image source={icons.edit} style={styles.editIcon} />
            </TouchableOpacity>
            <Line />
          </View>
        </View>

        <TouchableOpacity style={styles.sectionRow}>
          <Image source={icons.orderHistory} style={styles.sectionIcon} tintColor={colors.primary} />
          <Text style={styles.sectionHeaderText}>Lịch sử mua hàng</Text>
        </TouchableOpacity>
        <Line />
        <TouchableOpacity style={styles.sectionRow} onPress={(signout)}>
          <Image source={icons.logout} style={styles.sectionIcon} tintColor={colors.primary} />
          <Text style={styles.sectionHeaderText}>Đăng xuất</Text>
        </TouchableOpacity>
        <Line />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: '7%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: 'black',
    marginTop: 5,
  },
  profile: {
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 15,
    color: colors.primary,
  },
  details: {
    marginHorizontal: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15,
  },
  sectionIcon: {
    width: 26,
    height: 26,
    marginEnd: 10,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.primary,
  },
  sectionContent: {
    marginHorizontal: 10,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionText: {
    marginEnd: 10,
    fontSize: 16,
    color: colors.black,
  },
  sectionAddress: {
    width: '85%',
  },
  sectionAddressInput: {
    width: '75%',
  },
  editIcon: {
    height: 24,
    width: 24,
  },
  line: {
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    marginVertical: 15,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
});

export default User;
