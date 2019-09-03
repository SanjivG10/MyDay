import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase'

export async function GoogleLoginHandler() {
  try {

    await GoogleSignin.configure();

    const data = await GoogleSignin.signIn();

    const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)

    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

    console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
 
  } catch (e) {

    console.warn(e.message);
  }
}