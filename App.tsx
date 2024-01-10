import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import "expo-dev-client";
import auth from "@react-native-firebase/auth";

import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { useState } from "react";

export default function App() {
  GoogleSignin.configure({
    webClientId:
      "51089710087-mkoc20fq14a9j1b6eeg1bf41opg8263l.apps.googleusercontent.com",
  });

  const [userDetails, setUserDetails] = useState<any>();

  const onSignIn = async () => {
    const userDetails = await GoogleSignin.signIn();
    const credentials = auth.GoogleAuthProvider.credential(userDetails.idToken);
    const user = await auth().signInWithCredential(credentials);
    if (user) {
      setUserDetails(user);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      setUserDetails(undefined);
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      {!userDetails ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <GoogleSigninButton onPress={onSignIn} />
        </View>
      ) : (
        <TouchableOpacity
          style={{
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red",
            width: "80%",
            marginHorizontal: "10%",
            borderRadius: 20,
          }}
          onPress={signOut}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "800" }}>
            Sign out
          </Text>
        </TouchableOpacity>
      )}

      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
});
