import React from 'react';
import {
    FlatList,
    Image,
    Modal,
    TouchableOpacity
  } from 'react-native';


  const styles ={
    emojiViewer:{
        alignItems: 'center'
    }
  }

export default class EmojiSelector extends React.Component 
{


    state = {
        dataSource: [
            {
                src: require('./../icons/emojis/1.png'),
                id:1
            }, 
            {
                src: require('./../icons/emojis/2.png'),
                id:2
            },
            {
                src: require('./../icons/emojis/3.png'),
                id:3
            },
            {
                src: require('./../icons/emojis/4.png'),
                id:4
            },
            {
                src: require('./../icons/emojis/5.png'),
                id:5
            },
            {
                src: require('./../icons/emojis/6.png'),
                id:6
            },
            {
                src: require('./../icons/emojis/7.png'), 
                id:7
            },
            {
                src: require('./../icons/emojis/8.png'),
                id:8
            },
            {
                src: require('./../icons/emojis/9.png'),
                id:9
            },
            {
                src: require('./../icons/emojis/10.png'),
                id:10
            },
            {
                src: require('./../icons/emojis/11.png'),
                id:11
            },
            {
                src: require('./../icons/emojis/12.png'),
                id:12
            },
            {
                src: require('./../icons/emojis/13.png'),
                id:13
            },
            {
                src: require('./../icons/emojis/14.png'),
                id:14
            },
            {
                src: require('./../icons/emojis/15.png'),
                id:15
            },
            {
                src: require('./../icons/emojis/16.png'),
                id:16
            },
            {
                src: require('./../icons/emojis/17.png'),
                id:17
            },
            {
                src: require('./../icons/emojis/18.png'),
                id:18
            },
            {
                src: require('./../icons/emojis/19.png'),
                id:19
            },
            {
                src: require('./../icons/emojis/20.png'),
                id:20
            },
            {
                src: require('./../icons/emojis/21.png'),
                id:21
            },
            {
                src: require('./../icons/emojis/22.png'),
                id:22
            },
            {
                src: require('./../icons/emojis/23.png'),
                id:23
            },
            {
                src: require('./../icons/emojis/24.png'),
                id:24
            },
            {
                src: require('./../icons/emojis/25.png'),
                id:25
            },
            {
                src: require('./../icons/emojis/26.png'),
                id:26
            },
            {
                src: require('./../icons/emojis/27.png'),
                id:27
            },
            {
                src: require('./../icons/emojis/28.png'),
                id:28
            },
            {
                src: require('./../icons/emojis/29.png'),
                id:29
            },
            {
                src: require('./../icons/emojis/30.png'),
                id:30
            },
            {
                src: require('./../icons/emojis/31.png'),
                id:31
            },
            {
                src: require('./../icons/emojis/32.png'),
                id:32
            },
            {
                src: require('./../icons/emojis/33.png'),
                id:33
            },
            {
                src: require('./../icons/emojis/34.png'),
                id:34
            },
            {
                src: require('./../icons/emojis/35.png'),
                id:35
            },
            {
                src: require('./../icons/emojis/36.png'),
                id:36
            }
        ],

        modalVisible : this.props.modalVisible || false,
        currentEmojiSelected: null

    }



      chooseEmoji(image)
      {
          return image;
      }


    _onPressItem = (item,event)=>{  
              
        
        this.props.closeEmoji(); 

        this.setState({
           
            modalVisible: false
        })

        this.props.chooseEmoji(item.src,event)
    }



    render()
    {
        return(
            <Modal
            animationType="slide"
            transparent
            visible={this.state.modalVisible}
            onRequestClose={() => {
                this.setState({
                    modalVisible: false
                })

                this.props.closeEmoji();  
              }}
            >

                <FlatList
                    contentContainerStyle= {styles.emojiViewer}
                    data={this.state.dataSource}
                    renderItem={({ item }) => (
                        <TouchableOpacity onLongPress={(event)=> this. _onPressItem(item,event)}  onPress=  { (event)=> this. _onPressItem(item,event) }   >
                            <Image style={{height: 64, width: 64, alignSelf:'center',margin:20}}  source={ item.src } />
                        </TouchableOpacity>
                    )}
                    numColumns={3}
                    />
            </Modal>

        )
    }
}