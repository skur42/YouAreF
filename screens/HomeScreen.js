import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableHighlight,
  AsyncStorage, } from 'react-native';

import { 
  Container, 
  Header, 
  Title, 
  Content, 
  Footer, 
  FooterTab,  
  Left, 
  Right, 
  Body, 
  Icon, 
  Text,
  Card,
  CardItem,
  List, 
  ListItem, 
  Thumbnail,
  Fab,
  Badge } from 'native-base';

import { Font } from 'expo';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fontawesomeIcon from 'react-native-vector-icons/FontAwesome';
import call from 'react-native-phone-call';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import IconBadge from 'react-native-icon-badge';
import { NavigationActions } from 'react-navigation'



export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  /*componentWillMount() {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Main'})
      ]
    });

    this.props.navigation.dispatch(resetAction);
  }*/
  constructor() {
    super();
    this.state = {
      active: 'true',
      home:{},
      myplans:{}

    };
  }
  componentDidMount = async () => {
    let token = await AsyncStorage.getItem('token');
    
    fetch('http://192.168.43.197/api/public/home',{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'Host': '192.168.43.197'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          home: responseJson.data[0],
          
        }, function() {
          console.log('abcc  ' + this.state.home.name);
        });
      })
      .catch((error) => {
        console.error(error);
      });

    fetch('http://192.168.43.197/api/public/myplans',{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'Host': '192.168.43.197'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          myplans: responseJson.data,
          
        }, function() {
          console.log(this.state.myplans);
        });
      })
      .catch((error) => {
        console.error(error);
      });

      
  }


  render() {
    const { navigate } = this.props.navigation;

    const args = {
      number: '8505960948', // String value with the number to call 
      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call  
    }

    return (
        <Container style={styles.container}>
          <Content>
             <Card style={{backgroundColor:"#fad30a"}}>
                <View style={ styles.notificationActionButtonView }>
                  <Ionicons name="md-notifications" style={styles.notificationButtonIcon} />
                </View>
                <CardItem style={{ alignItems: 'center',justifyContent: 'center',backgroundColor:'#fad30a' }}>
                  <Text style={{ fontSize:30,color:'#000000' }}> Hello, {this.state.home.name} !</Text>
                </CardItem>
                <CardItem style={{alignItems: 'center',justifyContent: 'center',paddingTop:0,backgroundColor:'#fad30a'}}>
                  <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottomColor: 'black',
                    borderBottomWidth: 1.0,
                    width: 250}}/>
                </CardItem>
                <CardItem  style={styles.normalText}>
                  <Body style={{ alignItems:"center",justifyContent:"center"}}>
                    <View style={{flexDirection:'column',justifyContent:'center'}}>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{ fontSize:35,color:'#000000' }}> {this.state.home.amount} </Text>
                        <FontAwesomeIcons name="rupee" size={30} color="#000000" /> 
                      </View>
                        <Text style={{ fontSize:15,color:'#000000' }}> earnings so far</Text>
                    </View>
                  </Body>
                </CardItem>
              </Card>

            <View style={{  flexDirection: 'row', alignSelf:'stretch' ,position:'relative'}}>
              <View style={{ flex:1,height: 80, alignSelf:'stretch', position:'relative' }}>
                <Body style={{ alignItems:"center",justifyContent:"center" }}>
                  <Text style={{fontSize: 30}}> {this.state.home.companies} </Text>
                  <Text  style={styles.smallText}>Companies</Text>
                </Body>
              </View>
              <View style={{ flex:1,height: 80, alignSelf:'stretch',position:'relative'}}>
                <Body style={{ alignItems:"center",justifyContent:"center"}}>
                  <Text style={{fontSize: 30}}> {this.state.home.my_plans} </Text>
                  <Text  style={styles.smallText}>My plans</Text>
                </Body>
              </View>  
              <View style={{ flex:1,height: 80, alignSelf:'stretch',position:'relative'}}>
                <Body style={{ alignItems:"center",justifyContent:"center"}}>
                  <Text style={{fontSize: 30}}> {this.state.home.accepted} </Text>
                  <Text  style={styles.smallText}>Approved</Text>
                </Body>
              </View>
            </View>
          <View>
            <Text style={{padding:16}}> My Plans </Text>
              <List dataArray={this.state.myplans}
                renderRow={(myplans) =>
                  <ListItem onPress={() => navigate('PlansScreen', { id: `${plan.id}`, name: `${plan.name}`})}>
                    <Image style={styles.thumbnailStyle} source={{ uri: 'http://media.corporate-ir.net/media_files/IROL/17/176060/img/logos/amazon_logo_RGB.jpg' }} />
                    <Body>
                      <View style={styles.viewTextStyle}>
                        <Text>{myplans.name}</Text>
                        {
                          myplans.status == 'Accepted' ? (
                            <Badge style={{ backgroundColor: '#388e3c' }}>
                              <Text style={{ color: 'white' }}>{myplans.status}</Text>
                            </Badge>
                            )
                            :
                            (
                            <Badge style={{ backgroundColor: '#ef5350' }}>
                              <Text style={{ color: 'white' }}>{myplans.status}</Text>
                            </Badge>
                            )
                        }
                      </View>
                      <View style={styles.viewTextStyle}>
                        <Text note>{myplans.date}</Text>
                      </View>
                    </Body>
                  </ListItem>
                }>
              </List>
            </View>
          </Content>
          
          <ActionButton buttonColor="rgba(250,211,10,1)" degrees={0} icon={<Ionicons name="md-call" style={styles.floatingActionButtonIcon} /> }>
            <ActionButton.Item buttonColor='#9b59b6' title="Call" onPress={() => call(args).catch(console.error)}>
              <Ionicons name="md-call" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#1abc9c' title="Chat" onPress={() => navigate('ChatScreen')}>
              <Ionicons name="md-chatboxes" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerText :{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#0077b5',
  },
  viewTextStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  normalText :{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#fad30a',
  },
  smallText :{
    fontSize: 12,
    color: '#000000'
  },
  thumbnailStyle: {
    resizeMode: 'contain',
    borderColor: '#ddd',
    borderWidth: 1,
    height: 60,
    width: 60,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  floatingActionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'black',
  },
  notificationButtonIcon: {
    fontSize: 28,
    height: 30,
    color: 'black',
  },
  notificationActionButtonView: {
    height: 50,
    paddingTop: 20,
    alignItems:'flex-end',
    justifyContent: 'space-around',
    right: 20
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
