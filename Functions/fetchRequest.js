/**
 * Sends a request to the OMDB api to look for movies that match the keys in params
 * @param {dict} params: With keys title, imdbId, or search
 */
export const fetchRequest = async (params) => {
    let url = "http://omdbapi.com/?apikey=5db86775"
    if (params.search){
        url = url + "&s=" + params.search
        if (params.pageNumber){
            url = url + "&page=" + params.pageNumber
        }
    }else if (params.title){
         url = url + "&t=" + params.title
    }else if (params.imdbID){
        url = url + "&i=" + params.imdbID
    }

    const response = await fetch(url)
    const result = await response.json()
    return result
}