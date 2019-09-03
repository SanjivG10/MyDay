import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon} from 'native-base';


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

  
const styles = {
    decekSwiperStyle: {
      alignSelf: 'center'
    }
  }

  export default class TrendingTab extends React.Component {
    render() {
        return (
          <Container>
            <View>
              <DeckSwiper
                style= {styles.decekSwiperStyle}
                dataSource={cards}
                renderItem={item =>
                  <Card >
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
                    <CardItem cardBody>
                      <Image style={{ height: 400, flex: 1 }} source={item.image} />
                    </CardItem>
                  </Card>
                }
              />
    
            </View>
          </Container>
        );
      }
  }