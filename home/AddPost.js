import React from 'react';
import ImagePicker from 'react-native-image-picker';
import { Container } from 'native-base';
import {Image , PanResponder,Animated} from 'react-native'
import { createStackNavigator, createAppContainer } from "react-navigation";

import AddedImageFeatures from './ImageFeatures'
import EditImage from './EditImageFilters'
import EmojiSelector from  './EmojiSelector'

class AddPost extends React.Component
{

  
    constructor(props)
    {
      super(props); 

      this.state ={
        imageSource: '',
        imageUri: '', 
        error: '',
        positionTextY: 0, 
        positionTextX:0, 
        image: null, 
        pan: new Animated.ValueXY()
      }

      this.selectEmoji = this.selectEmoji.bind(this)
      this.closeEmoji = this.closeEmoji.bind(this)
      this.chooseEmoji = this.chooseEmoji.bind(this)
      this.selectedCurrentEmoji= this.selectedCurrentEmoji.bind(this)
    }


    componentDidMount()
    {

      this._val = { x:0, y:0 }
      this.state.pan.addListener((value) => this._val = value);

      this._panResponder = PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
  
        onPanResponderGrant: (evt, gestureState) => {
          // starting point! 
          this.state.pan.setOffset({
            x: this._val.x, 
            y: this._val.y
          })

          this.state.pan.setValue({x:0,y:0})

          
        },
        onPanResponderMove: Animated.event([
            null, { dx: this.state.pan.x, dy: this.state.pan.y }
          ])
        ,
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
         this.state.pan.flattenOffset(); 
        },
        onPanResponderTerminate: (evt, gestureState) => {
          
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          
          return true;
        },
      });
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

    selectEmoji() {

      this.setState({
        emojiSelected: !this.state.emojiSelected
      })
    }

    chooseEmoji(image,event)
    {
      this.setState({
        image
      })
    }

    selectedCurrentEmoji(X,Y){
      this.setState({
        positionX: X, 
        positionY:Y
      })
    }

    closeEmoji(){
      this.setState({
        emojiSelected: false
      })
    }



    render(){
        const panStyle = {
          transform: this.state.pan.getTranslateTransform()
        }

        const customImageStyle ={
          height: 64, 
          width:64, 
          position: 'absolute'
        }
        
        return(
            <Container style={{flexDirection: 'column', flex:1, marginTop: 8, marginLeft:8, marginRight:8, flex:1}} >

              <Image   source= {require('./image1.jpg')} style={{width: '100%', borderWidth: 5, borderColor: '#000', height:null, flex: 0.8 }} resizeMode="contain"  /> 

              <AddedImageFeatures openEmoji={this.selectEmoji}  navigation = {this.props.navigation} image={require('./image1.jpg')} />

              {
                this.state.emojiSelected ? 
                <EmojiSelector chooseEmoji ={this.chooseEmoji}  closeEmoji={this.closeEmoji} modalVisible = {this.state.emojiSelected}  />
                :
                null
              }

              {
                this.state.image ? 
                <Animated.Image {...this._panResponder.panHandlers} source={this.state.image} style={[panStyle,customImageStyle]}  
                />
                :
                null
              }

            </Container>
        )
    }
}

const ImageFeatures = createStackNavigator({
  addPost:{
    screen: AddPost, 
    navigationOptions: {
      header: null,
      headerMode: null
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