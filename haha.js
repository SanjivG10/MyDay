this.state ={
    pan: new Animated.ValueXY()
  }


_panResponder = PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: (evt, gestureState) => {
        // starting point! 
        
    },
    onPanResponderMove: (evt, gestureState) => {

        Animated.event([
        null, { dx: this.state.pan.x, dy: this.state.pan.y }
        ])

    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
        
    },
    onPanResponderTerminate: (evt, gestureState) => {
        
    },
    onShouldBlockNativeResponder: (evt, gestureState) => {
        
        return true;
    }
});  


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

            <Image  source= {require('./image1.jpg')} style={{width: '100%', borderWidth: 5, borderColor: '#000', height:null, flex: 0.8 }} resizeMode="contain"  /> 

            <AddedImageFeatures openEmoji={this.selectEmoji}  navigation = {this.props.navigation} image={require('./image1.jpg')} />

            {
            this.state.emojiSelected ? 
            <EmojiSelector chooseEmoji ={this.chooseEmoji}  closeEmoji={this.closeEmoji} modalVisible = {this.state.emojiSelected}  />
            :
            null
            }

            {
            this.state.image ? 
                <Animated.Image {...this._panResponder.panHandlers} source={this.state.image} style={[customImageStyle,panStyle]}  
                />
            :
            null
            }

        </Container>
    )
}