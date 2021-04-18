import React, {useState} from 'react';
import {SafeAreaView, View, Alert} from 'react-native';
import styles from './styles';
import {Button, TextInput} from 'react-native-paper';
import useAPI from '../../shared/hooks/useAPI';

const LoginScreen = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {login} = useAPI();

  const onLogin = () => {
    login(username, password)
      .then()
      .catch((_) => {
        Alert.alert('error during login', 'Are the credentials valid?');
      });
  };

  return (
    <SafeAreaView style={styles.root}>
      <View />
      <View>
        <TextInput
          style={styles.textInput}
          label="Username"
          value={username}
          // @ts-ignore
          onChange={setUsername}
        />
        <TextInput
          style={styles.textInput}
          label="Password"
          value={password}
          // @ts-ignore
          onChange={setPassword}
        />
      </View>
      <View>
        {/* @ts-ignore */}
        <Button style={styles.loginButton} mode="contained" onPress={onLogin}>
          Login
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
