import React from 'react';
import {FlatList} from 'react-native'
import {Image} from 'react-native'
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';


export default class EditImage extends React.Component 
{

    render()
    {
        return(
            <Container style={{flex: 1}}>
                <Image  source= {this.props.navigation.getParam('image','')} style={{width: '100%', borderWidth: 5, borderColor: '#000', height:null, flex: 0.7}} resizeMode="contain"  /> 
                <FlatList
                        horizontal
                        data={this.state.data}
                        renderItem={this._renderItem}
                        />
            </Container>
        )
    }
}