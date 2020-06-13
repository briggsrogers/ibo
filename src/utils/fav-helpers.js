export const toggleFavourite = (item) => {
    const myStorage = window.localStorage;
    const KEY = 'favourites';
    let result = false;

    let favourites = myStorage.getItem(KEY);

    // If no favs created yet
    if( !favourites ){
        favourites = '[]'; 
    }
    
    let array = JSON.parse(favourites);

    if( array.indexOf(item) > -1 ){
        //Remove all
        for(var i = array.length - 1; i >= 0; i--) {
            if(array[i] === item) {
                array.splice(i, 1);
            }
        }

        result = false;
    }

    else{
        result = true;
        array.push(item);
    }
    // Store
    window.localStorage.setItem(KEY, JSON.stringify(array));

    return result;
}

export const getFavourites = () => {
    const KEY = 'favourites';
    let favourites = window.localStorage.getItem(KEY);
    return favourites;
}

export const isFavourite = (item) => {
    const KEY = 'favourites';
    let favourites = window.localStorage.getItem(KEY);
    
    // If no favs created yet
    if( !favourites ){
        favourites = '[]'; 
    }
    
    let array = JSON.parse(favourites);

    return array.indexOf(item) > -1;
}