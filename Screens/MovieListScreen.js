import React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView} from 'react-native'
//import { FlatList } from 'react-native-gesture-handler'
import { fetchRequest } from '../Functions/fetchRequest.js'

const styles = StyleSheet.create({
    movieCell:{
        flexDirection: 'row',
        width: '100%'
    },
    cellText:{
        flex:1,
        flexWrap: 'wrap'
    },
    textWrapper:{
        flexDirection:'row',
        width: Dimensions.get('screen').width - 50
    },
    movieImage:{
        width: 50,
        height: 50
    }
})

/**
 * Retrieves a json object of movie info from the OMDB api and navigates to a screen that displays the info
 * @param {String} imdbID : A unique id to identify movies in the database
 * @param {Object} navigation : The navigation object which dictates what screens to navigate to
 */
async function fetchMovieInfo(imdbID, navigation){
    let request = await fetchRequest({imdbID:imdbID})
    if (request.Response === 'True'){
        navigation.navigate('MovieInfoScreen', {jsonData: request})
    }else{
        //If for some reason the imdbID does not return a movie
        navigation.navigate('ErrorScreen', {errorMessage: request.Error})
    }
}

/**
 * A row in the movie list. Displays an image of the movie, along with it's title and year
 * @param {String} props.imdbID : A unique id to identify movies in the database
 * @param {Object} props.navigation : The navigation object which dictates what screens to navigate to
 */
const MovieCell = (props) => {
    return(
        <TouchableOpacity 
        style={styles.movieCell}
        onPress={
            async () => {
                try {
                    await fetchMovieInfo(props.imdbID, props.navigation)
                } catch (e){
                    props.navigation.navigate('ErrorScreen', {errorMessage: e})
                }
            }
        }
        >
            <Image source={{uri: props.source}} style={styles.movieImage}/>
            <View>
                <View style={styles.textWrapper} >  
                    <Text style={styles.cellText}>{props.title}</Text>
                </View>
                <Text>{props.year}</Text>
            </View>
        </TouchableOpacity>
    )
}

/**
 * The Screen displayed when a movie is searched for
 * @param {Object} props.navigation.getParam('request') : The response object returned from a search on the OMDB api
 */
class MovieListScreen extends React.Component {
    render(){
        const { navigation } = this.props;
        const data = navigation.getParam('request').Search
        return(
            <ScrollView>
                {navigation.getParam('request').Search.map(movie => <MovieCell source={movie.Poster} title={movie.Title} year={movie.Year} imdbID={movie.imdbID} key={movie.imdbID} navigation={navigation}/>)}
            </ScrollView>
        )
//        {navigation.getParam('request').Search.map(movie => <MovieCell source={movie.Poster} title={movie.Title} year={movie.Year} imdbID={movie.imdbID} navigation={navigation}/>)}
            {/* <FlatList
                renderItem = {({ item }) => (<MovieCell title={item.Title} year={item.Year} source={item.Poster} navigation={navigation} imdbID={item.imdbID}/>)}
                data={data}
                keyExtractor={item => item.imdbID}
            /> */}
    }
}

export default MovieListScreen