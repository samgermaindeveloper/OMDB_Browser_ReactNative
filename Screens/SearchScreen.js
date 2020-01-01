import React from 'react'
import {View, KeyboardAvoidingView,Text,TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import {fetchRequest} from '../Functions/fetchRequest.js'

const styles = StyleSheet.create({
    outerContainer: {
        flex:1,
        backgroundColor: '#C8FEFE',
        justifyContent: 'center'
    },
    innerContainer:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchButton: {
      marginTop: 20,
      backgroundColor: '#24D9E8',
      borderRadius: 5,
      padding: 5
    },
    searchField: {
      backgroundColor: '#FFF',
      textAlign: 'center',
      width: 200,
      borderRadius: 5,
      margin: 20,
      height: 30
    },
    searchTitle:{
        fontWeight: 'bold',
        fontSize: 20,
        textAlign:'center'
    }
  });

/**
 * Sends a request to search the OMDB api for a string. Navigates to a screen displaying the movies that match the search if the search is valid.
 * @param {Object} getArguments : The key,value pairs to append to the search api url
 * @param {Object} navigation : The navigation object which dictates what screens to navigate to
 */
async function search(getArguments,navigation){
    let request = await fetchRequest(getArguments)
    if (request.Response === "True"){
        navigation.navigate('MovieListScreen', {request: request, getArguments: getArguments})
    }else{
        //If the search returned no results, navigate to the error screen
        navigation.navigate('ErrorScreen', {errorMessage: request.Error})            
    }
}

/**
 * A button that when clicked searches the OMDB database for movies that match the string in the search box
 * @param {Object} getArguments : The key,value pairs to append to the search api url
 * @param {Object} navigation : The navigation object which dictates what screens to navigate to
 */
const SearchButton = props => (
    <TouchableOpacity 
        style={styles.searchButton} 
        onPress={
                async () => {
                    try{
                        await search(props.getArguments, props.navigation)
                    }catch (e){
                        props.navigation.navigate('ErrorScreen',{errorMessage: e})
                    }
                }
            }
        >
            <Text>Search</Text>
    </TouchableOpacity>
)

/**
 * The inital screen of the app. Is meant for entering terms to search the OMDB database for movies.
 */
class SearchScreen extends React.Component {

    state = {search:"", pageNumber:"1"}

    render(){
        getArguments = {
            search: this.state.search,
            pageNumber: this.state.pageNumber
        }
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.outerContainer}>
                <View style={styles.innerContainer}>
                    <Text style={styles.searchTitle}>Search for a Movie in the OMDB Database</Text>
                    <TextInput style={styles.searchField} onChangeText={text => this.setState({search:text})} ></TextInput>
                    <SearchButton navigation = {this.props.navigation} getArguments={getArguments}/>
                </View>
            </KeyboardAvoidingView>
        )
    }
    
}

export default SearchScreen