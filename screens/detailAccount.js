import { setDoc, doc } from 'firebase/firestore';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { colors } from "../constants";  // Make sure you have a colors file for consistent styling
import CustomAlert from '../CustomAlert';

export default function Account({ route }) {
  const [addressInput, setAddress] = useState('');
  const [phoneInput, setPhone] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigation();
  
  const handleUpdate = async () => {
    const user = doc(db, "User", `${route.params.name}`);
    const data = {
      name: route.params.name,
      address: addressInput,
      phone: phoneInput
    };

    await setDoc(user, data);
    setModalVisible(true);  // Show the custom modal
    console.log("update shipping success");
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    navigate.goBack();  // Navigate back after closing the modal
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin khách hàng</Text>
      <TextInput
        style={styles.input}
        placeholder="Địa chỉ"
        value={addressInput}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={phoneInput}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Mua Hàng</Text>
      </TouchableOpacity>
      <CustomAlert
        visible={modalVisible}
        onClose={handleCloseModal}
        message={`Đơn hàng đã được xử lý gửi tới! Địa chỉ: ${addressInput}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.primary,
  },
  input: {
    height: 40,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.lightGray,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
