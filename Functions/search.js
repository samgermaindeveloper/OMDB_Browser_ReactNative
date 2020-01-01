import React from 'react'
import fetchRequest from '../Functions/fetchRequest.js'

/**
 * Sends a request to search the OMDB api for a string. Navigates to a screen displaying the movies that match the search if the search is valid.
 * @param {Object} getArguments : The key,value pairs to append to the search api url
 * @param {Object} navigation : The navigation object which dictates what screens to navigate to
 */
export async function search(getArguments,navigation){
    let request = await fetchRequest(getArguments)
    if (request.Response === "True"){
        navigation.navigate('MovieListScreen', {request: request})
    }else{
        //If the search returned no results, navigate to the error screen
        navigation.navigate('ErrorScreen', {errorMessage: request.Error})            
    }
}

