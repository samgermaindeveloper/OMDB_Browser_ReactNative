import React from 'react'
import {View,StyleSheet,Text,ScrollView,Image} from 'react-native'

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#C8FEFE'
    },
    poster:{
        width:120,
        height:240
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-around',
        paddingBottom:10,
        paddingTop:10,
        backgroundColor: 'white'
    },
    title:{
        fontWeight:'bold',
        fontSize:30,
        textAlign: 'center',
        backgroundColor: '#24D9E8'
    },
    sideInfo:{
        alignSelf:'center'
    },
    bottomInfo:{
        marginBottom: 0
    },
    ratings:{
        marginTop: 5,
        marginBottom: 5,
        marginLeft: '5%'
    },
    bottomSection:{
        margin:5
    },
    sideSection:{
        margin:3
    },
    rating:{

    },
    ratingsTitle:{
        marginTop:5,
        fontWeight: 'bold',
        marginLeft: '10%'
    }
})

/**
 * Create a <Text> component for each attribute of the movie that looks like "key: value" where key is bolded
 * @param {String} props.k : Describes the attribute
 * @param {String} props.value : Attribute
 * @param {Object} style : StyleSheet styling description
*/
var DisplayedAttribute = (props) => {
    return(
        <Text style={props.style}><Text style={{fontWeight:'bold'}}>{props.k}</Text>:  {props.value}</Text>
    )
}

/**
 * The screen displayed when a movie cell is clicked on. Displays information about the movie
 * @param {object} props.navigation.jsonData: Response object from the OMDB database with key:value pairs that describe attributes about the movie 
 */
class MovieInfoScreen extends React.Component {

    /**
     * Returns True if the key is an attribute displayed beside the poster
     * @param {String} key 
     */
    isSideViewKey(key){
        return key === 'Country' || key === 'Language' || key === 'Runtime' || key === 'Released' || key === 'Rated'  || key === 'Director'
    }

    /**
     * Returns True if the key is an attribute displayed beside the poster or below the poster
     * @param {String} key : Key for the attribute
     */
    isDisplayedAttribute(key){
        return key != 'Year' && key != 'Title' && key != 'Response' && key != 'Ratings' && key != 'Poster'
    }

    render(){
        const { navigation } = this.props;

        let jsonData = navigation.getParam('jsonData')
        let ratings = jsonData['Ratings'].map(rating => Object.keys(rating).map(k => rating[k]).join(": ")) //Ratings is an object with several key,value pairs. This creates an array of strings, where each string is "key: value"
        let sideInfo = []   //Attributes displayed beside the poster
        let info = []   //Attributes displayed below
        //For each key,value pair in the response object, create a <Text> component that looks like "key: value" where key is bolded. Add these components to info and sideInfo
        Object.keys(jsonData).forEach((key) => {
            if(this.isSideViewKey(key)){
                sideInfo.push([key,jsonData[key]])
            }else if (this.isDisplayedAttribute(key)){
                info.push([key,jsonData[key]])
            }
        })
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.title}>{jsonData.Title}</Text>
                <View style={styles.header}>
                    <Image style={styles.poster} source={{uri: jsonData['Poster']}}></Image>
                    <View style={styles.sideInfo}>
                        {sideInfo.map(cell => <DisplayedAttribute key={cell[0]} k={cell[0]} value={cell[1]} style={styles.sideSection} /> )}
                    </View>
                </View>
                <View style={styles.bottomInfo}>
                    {info.map(cell => <DisplayedAttribute key={cell[0]} k={cell[0]} value={cell[1]} style={styles.bottomSection}/>)}
                        <Text style={styles.ratingsTitle}>Ratings</Text>
                        <View style={styles.ratings}>
                            {ratings.map(rating => <Text key={rating} style={styles.rating}>{rating}</Text>)}
                        </View>
                </View>
            </ScrollView>
        )
    }
}

export default MovieInfoScreen