import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon} from 'native-base';


const cards = [
    {
      text: 'Sanjiv Gautam',
      name: 'Dhulikhel',
      image: require('./image1.jpg'),
    },
    {
      text: 'Indira Gautam',
      name: 'Nepal',
      image: require('./image1.jpg'),
    },
    {
      text: 'Sandhya Gautam',
      name: 'Banepa',
      image: require('./image1.jpg'),
    }
  ];

  


  export default class FriendTab extends React.Component {
    render() {
        return (
          <Container>
            <View>
              <DeckSwiper
                dataSource={cards}
                renderItem={item =>
                  <Card style={{flex:1}}>
                    <CardItem>
                      <Left>
                        <Thumbnail source={item.image} />
                        <Body>
                          <Text>{item.text}</Text>
                          <Text note>@SanjivGautam</Text>
                        </Body>
                      </Left>
                    </CardItem>
                    <CardItem>
                      <Icon name="heart" style={{ color: '#ED4A6A' }} />
                      <Text>{item.name}</Text>
                    </CardItem>

                    <CardItem cardBody style={{flex:1}}>
                      <Image style={{flex: 1, height:400}} source={item.image} resizeMode="cover" />
                    </CardItem>
                  </Card>
                }
              />


    
            </View>
          </Container>
        );
      }
  }