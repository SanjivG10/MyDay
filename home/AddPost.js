import React from 'react';
import ImagePicker from 'react-native-image-picker';
import { Container, Form, Item, Textarea,Content } from 'native-base';
import {Image,Text} from 'react-native'
import { createStackNavigator, createAppContainer } from "react-navigation";

import AddedImageFeatures from './ImageFeatures'
import EditImage from './EditImageFilters'


class AddPost extends React.Component
{

  static navigationOptions = {
    header: null,
  };


    constructor(props)
    {
      super(props); 
      this.positionText = this.positionText.bind(this); 

      this.state ={
        imageSource: '',
        imageUri: '', 
        error: '',
        positionTextY: 0, 
        positionTextX:0
      }
    }

    positionText(X,Y)
    {
      this.setState({
        positionTextX:X, 
        positionTextY: Y 
      })
    }


    componentDidMount()
    {
        // call this later! Working on draggable text! 
        // this.openImagePicker()
    }

    openImagePicker(){
        ImagePicker.showImagePicker({},  (response) => {
            console.warn('Response = ', response);
            if (response.didCancel) {
              console.warn('User cancelled image picker');
              this.props.navigation.navigate('home')
            } else if (response.error) {
              console.warn('ImagePicker Error: ', response.error);
            } else {
              const source = { uri: response.uri };

              this.setState({
                imageSource: source,
                imageUri: response.path
              });
            }
          });
    }


    render(){
        return(
            <Container style={{flexDirection: 'column', flex:1, marginTop: 8, marginLeft:8, marginRight:8 }} >

              <Image  source= {require('./image1.jpg')} style={{width: '100%', borderWidth: 5, borderColor: '#000', height:null, flex: 0.8 }} resizeMode="contain"  /> 

              <AddedImageFeatures  navigation = {this.props.navigation} />

            </Container>
        )
    }
}


const ImageFeatures = createStackNavigator({
  addPost:{
    screen: AddPost, 
    navigationOptions: {
      header: null,
      headerMode: null,
    }
  },

  editImageFilters: {
    screen: EditImage, 
    navigationOptions: {
      header: null,
      headerMode: null
    }
  }
});

export default createAppContainer(ImageFeatures)


//
// {
//   this.state.imageSource ? 
//       <Image source= { this.state.imageSource } style={{width: null, height:400, marginTop: 20}} resizeMode="cover"  /> 
//   :
//   null
// }



// {
//   this.state.hello ?
//   <DraggableText action={this.positionText} style={{ position: 'absolute',top: this.state.positionTextY, left:this.state.positionTextX }}  />
//   :
//     null
// }