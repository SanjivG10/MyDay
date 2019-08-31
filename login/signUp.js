import React, { Component } from 'react';
import { Container, Icon, Content, Button, Item, Input, Text,Spinner } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import {Image} from 'react-native'
import firebase from 'react-native-firebase';
import RNFetchBlob from 'react-native-fetch-blob'


const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const  styles= {
    buttonStyle:{
    marginBottom:10, 
    justifyContent:'center', 
    alignItems:'center'
    },
    photoPicker: {
        color :'#c5aa6a', 
        marginTop:20, 
        fontSize: 120,
        alignSelf:'center'
    },
    avatarPicked:{
        marginTop:20, 
        fontSize: 120,
        alignSelf:'center', 
        height: 120, 
        width: 120, 
        borderRadius:60
    }
}



export default class SignUp extends Component {

    state = {
        avatarUri: null, 
        error: this.props.error||'',
        email: '',
        password: '',
        re_password: '',
        isLoading: false,
        user : undefined,
        imgPath: ''
    }
    
    static navigationOptions = {
        title: 'SignUp',
        headerStyle: {
            backgroundColor: '#c5aa6a',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
        }
    };


    setEmailText(email)
    {
      this.setState({
        email
      })
    }
  
    setPasswordText(password)
    {
      this.setState({
        password
      })
    }
  
    setRePasswordText(re_password)
    {
      this.setState({
        re_password
      })
    }


    verifyCredentials()
    {
  
        this.setState({
            isLoading: true,
            error: ''
        })
        
        //lets  start verifying now! 
        //first email 


        if (this.state.email.length<=3 )
        {

            this.setState({
                isLoading: false,
                error: 'Email should be at least of 4 character'
            })
        }

        else if (this.state.password.length <=5)
        {
            this.setState({
                isLoading: false,
                error: 'Password must be at least 6 characters long '
            })   
        }

        else if (this.state.password!=this.state.re_password)
        {
            this.setState({
                isLoading: false,
                error: 'Password do not match!'
                })
        }

        else if (!this.state.avatarUri)
        {
            this.setState({
                error:"Please upload a photo!", 
                isLoading: false
            })
        }

        else 
        {
            this.setState({
                isLoading: true,
                error: '',
                })
                
            this.startSigningUp(this.state.email,this.state.password); 
        }
        
    }

    startSigningUp (email,password)
    {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
            ()=> {
           
            const user = firebase.auth().currentUser;
            const userId = user.uid;

            this.setState({
                user
            })

            this.uploadImage(this.state.avatarUri.uri,userId).then((imageURL)=>{
                saveDatabase(userId,imageURL)
            }).catch((error)=>{
                this.props.navigation.navigate('signup',{error:error.message})
                this.setState({
                    error,
                    isLoading: false
                })
            })

            }).catch((error)=>{
                this.props.navigation.navigate('signup',{error:error.message})
                this.setState({
                    error: error.message, 
                    isLoading: false
                })
            })

    }

        uploadImage = (uri, imageName, mime = 'image/jpg') => {
            return new Promise((resolve, reject) => {
                const uploadUri = uri
                let uploadBlob = null
                const imageRef = firebase.storage().ref('posts').child(imageName)
                fs.readFile(uploadUri, 'base64')
                .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64` })
                })
                .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, { contentType: mime })
                })
                .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL()
                })
                .then((url) => {
                resolve(url)
                })
                .catch((error) => {
                    reject(error)
                })
            })
        }



            
    saveDatabase(userId,imageUrl=null)
    {
        firebase.database().ref('users/' + userId).set({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password, 
            userID: userId, 
            imageUrl
            }, (error) => {
              if (error) {
                this.setState({
                  error : error.message,
                  isLoading: false
                })
               
              }
              else {
                this.props.navigation.navigate('home')
              }
            });
    }



    openCamera = ()=> {

        ImagePicker.launchImageLibrary({}, (response) => {
            if (response.didCancel) {
                
            } else if (response.error) {
                this.state.imageError = response.error
                console.log('ImagePicker Error: ', this.state.imageError);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({
                    avatarUri:  {uri: response.uri},
                    imgPath: response.imgPath,
                    error:''
                });
            }
        });

    }

    render() {
        return (

            this.state.isLoading ? 
                <Spinner style={{flex:1, alignSelf: 'center'}} color='blue' />
            :
            <Container>
            <Content style={{margin:20}}>

                <Item>
                    <Icon type="FontAwesome" active name='user' style={{ color :'#c5aa6a'}} />
                    <Input 
                        placeholder='Email' 
                        onChangeText= { (text)=> { this.setEmailText(text) } } 
                        value={this.state.email}/>
                </Item>

                <Item>
                    <Icon type="FontAwesome" active name='key' style={{ color :'#c5aa6a'}} />
                    <Input 
                        secureTextEntry 
                        placeholder='Password'
                        onChangeText= { (text)=> { this.setPasswordText(text) } } 
                        value={this.state.password}
                        />
                </Item>

                <Item>
                    <Icon type="FontAwesome" active name='key' style={{ color :'#c5aa6a'}} />
                    <Input 
                        secureTextEntry 
                        placeholder='Confirm Password'
                        onChangeText= { (text)=> { this.setRePasswordText(text) } } 
                        value={this.state.re_password}
                        />
                </Item>

                <Button bordered success  style={{ justifyContent: 'center', marginTop: 20}} onPress = { ()=> this.verifyCredentials() } >
                    <Text style={{color:'#c5aa6a'}}>Sign Up</Text>
                </Button>

                {
                    !this.state.avatarUri ?
                    <Icon type="FontAwesome" active name='user-circle' style={styles.photoPicker} onPress= { ()=> this.openCamera() } /> :
                    <Image style={styles.avatarPicked}  source= {  this.state.avatarUri }  />

                }

                { 
                    this.state.error ? 
                        <Text style= {{ color: '#ff0000', alignSelf: 'center', marginTop: 30}}>    {this.state.error}  </Text>
                        :
                        null
                }

            </Content>

            <Button transparent onPress={() => this.props.navigation.navigate('login')} style={styles.buttonStyle} >
                <Text style={{color:'#c5aa6a'}}>I already have an account</Text>
            </Button>

            </Container>
        );
    }
}