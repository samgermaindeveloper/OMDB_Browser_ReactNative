import React from 'react'
import {View, StyleSheet} from 'react-native'
import PageButton from './PageButton.js'

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

/**
 * Returns an array containing every integer between two number
 * @param {Number} start : The smallest number in the range
 * @param {Number} end : The largest number in the range
 */
function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}

/**
 * A function that returns the maximum between some number and 1
 * @param {Number} aNumber : Any number 
 */
function min1(aNumber){
    if (aNumber < 1){
        return 1
    }else{
        return aNumber
    }
}

/**
 * Determines what range the pageNumber buttons at the bottom of the screen will span
 * @param {Number} pageNumber : The current page number
 * @param {Number} totalResults : The total number of results returned from the api
 */
function pageRange(pageNumber, totalResults) {
    let min, max
    let totalPages = Math.ceil(totalResults / 10)
    if (pageNumber + 3 >= totalPages) { 
        max = totalPages
        min = min1(max - 7)
    }else if (pageNumber <= 4){
        min = 1
        max = 8
    }else{
        min = pageNumber - 4
        max = pageNumber + 3
    }
    return range(min,max)
}

/**
 * A collection of page number buttons at the bottom of the screen that let you navigate to different pages of search results
 * @param {Object} props.getArguments : The api get parameters
 * @param {Object} props.navigation : The object controlling navigation 
 */
const PageNavigationBar = (props) => {

    return (
        <View style={styles.container}>
            {pageRange(Number(props.getArguments.pageNumber), props.totalResults).map(pn => {
                let getArguments = {
                    search:props.getArguments.search,
                    pageNumber: String(pn)
                }
                getArguments.pageNumber = String(pn)
                return <PageButton key={pn} navigation={props.navigation} getArguments={getArguments} />
            })
        }
        </View>
    )    
}

export default PageNavigationBar