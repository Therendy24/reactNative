import React , {Component} from 'react';
import {View,FlatList,Text} from 'react-native';
import {Tile} from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable'

//----------------------------------------------------------

const mapStateToProps = state => {
    return{
      campsites: state.campsites
    
    }
}

//----------------------------------------------------------


// function Directory (props){
class Directory extends Component{

// ----------------------------------

static navigationOptions = {
    title:'Directory'
};


// ----------------------------------

    render(){
        // --------------------------------- //to navigate to the campsite info 
         const {navigate} = this.props.navigation;
         // ---------------------------------
       
//----------------------------------------------------------------------
         const renderDirectoryItem = ({item}) => {
        return (
            <Animatable.View animation='fadeInRightBig' duration={2000}>
                <Tile
                    title={item.name}
                    caption={item.description}
                    featured
                    // onPress = {() => props.onPress(item.id)}
            
                    // --------------------------------- pass information and camspite info will (getparams)
                    onPress = {() => navigate('CampsiteInfo',{campsiteId:item.id})}
                    // ---------------------------------
                    
                    imageSrc= {{uri: baseUrl + item.image}}
                    />
            </Animatable.View>
        )
        };
//----------------------------------------------------------------------
        
                               //for the UI
    if (this.props.campsites.isLoading){
        return <Loading/>;
    } 
    if (this.props.campsites.errMess){
        <View>
            <Text>{this.props.campsites.errMess}</Text>
        </View>
    }
        return(
            // <FlatList data={props.campsites} FlatList takes a few items , better for a large list 
            <FlatList data= {this.props.campsites.campsites}
            renderItem={renderDirectoryItem}
            keyExtractor={item =>item.id.toString()} />  //a number to a string because it only takes a string 
        )
//----------------------------------------------------------------------

    }
}
export default connect(mapStateToProps)(Directory);

