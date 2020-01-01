import React from 'react'
import {Button} from 'react-native'
import {fetchRequest} from '../Functions/fetchRequest.js'

/**
 * Sends a request to search the OMDB api for a string. Navigates to a screen displaying the movies that match the search if the search is valid.
 * @param {Object} getArguments : The key,value pairs to append to the search api url
 * @param {Object} navigation : The navigation object which dictates what screens to navigate to
 */
async function changePage(getArguments,navigation){
    let request = await fetchRequest(getArguments)
    if (request.Response === "True"){
        navigation.navigate('MovieListScreen', {request: request, getArguments: getArguments}, )
    }else{
        //If the search returned no results, navigate to the error screen
        navigation.navigate('ErrorScreen', {errorMessage: request.Error})            
    }
}

/**
 * Navigates to a page of search results by sending a fetch request to the OMDB API
 * @param {Number} props.pageNumber : The pageNumber to navigate to 
 */
const PageButton = (props) => {
    return(
        <Button
        title={props.getArguments.pageNumber}
        onPress={
            async () => {
                try{
                    await changePage(props.getArguments, props.navigation)
                }catch (e){
                    props.navigation.navigate('ErrorScreen',{errorMessage: e})
                }
            }
        }
        >
        </Button>
        
    )
}

export default PageButton