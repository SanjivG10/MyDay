import React from 'react';
import {FlatList,TouchableOpacity} from 'react-native'
import { Container, Card, CardItem, Body, Text } from 'native-base';
import {Image} from 'react-native'



export default class AddedImageFeatures extends React.Component {

    state = {
        data: [
            {
                features:'Add Text', 
                source: require('./../icons/addText.png'), 
                id:'text'
            },
            {
                features:'Fire', 
                source: require('./../icons/fire.png'), 
                id:'fire'

            },
            {
                features:'Emoji ', 
                source: require('./../icons/emoji.png'), 
                id:'emoji'

            },
            {
                features:'Edit',
                source: require('./../icons/edit.png'), 
                id: 'edit'
            }
        ]
    }

    _onPressItem = (id)=>{
        if (id=="edit")
        {
            this.props.navigation.push('editImageFilters'); 
        }
    }

    _renderItem =  ({item}) => 
        {
            return (
                <Card>
                    <TouchableOpacity onPress=  { ()=> this. _onPressItem(item.id) }   >
                        <Text style={{alignSelf: 'center', margin:2 }}>{item.features}</Text>
                        
                        <CardItem>
                            <Body>
                                <Image  source= {item.source}  style={{height: 80, width: 80, height:80}} />
                            </Body>
                        </CardItem>

                    </TouchableOpacity>
                </Card>
            )
        }
            

    render()
    {
        return(
                <Container style={{flex:0.2}}>
                    <FlatList
                        horizontal
                        data={this.state.data}
                        renderItem={this._renderItem}
                        />
                </Container>
                
        )
    }

}

