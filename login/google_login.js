import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase'

export async function GoogleLoginHandler() {
  try {

    await GoogleSignin.configure({
      webClientId:'749914036258-1k6el7m6ept0pcp0otioafh1q63ulit4.apps.googleusercontent.com'
    });

    const data = await GoogleSignin.signIn();

    const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)

    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

    console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
 
  } catch (e) {

    console.warn(e.message);
  }
}