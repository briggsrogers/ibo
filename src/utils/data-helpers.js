import axios from "axios";

const AIRTABLE_ROOT = 'https://api.airtable.com/v0/appkTWOL5iNijtSO8/production-db?view=Grid%20view';
const AIRTABLE_CONTENT_ROOT = 'https://api.airtable.com/v0/appkTWOL5iNijtSO8/app-content?view=Grid%20view';
const AIRTABLE_FEATURE_ROOT = 'https://api.airtable.com/v0/appkTWOL5iNijtSO8/featured?view=Grid%20view';


export const getEntries = (onSuccess) => {

  let records = [];

  const fetchBatch = (url, onSuccess) => {

    axios
    .get(url, 
      { 
        headers: {
          "Authorization": "Bearer key7QpnzX5Kw0bc6V"
        } 
      })
    .then(function(response) {
      // handle success
      if (response.status === 200) {

        //Add to all-up records array
        response.data.records.forEach( (item) => { 
          if(isValid(item)) {
            records.push(item); 
          }
        });

        //Has offset?
        if(response.data.offset){
          //Call again
          let url = `${AIRTABLE_ROOT}&offset=${response.data.offset}`;
          fetchBatch(url, onSuccess);
        }
        else{
          //Have all records
          //Filter to approved only
          records = records.filter( (item) => item.fields.Approved === true );
          onSuccess(records);
        }
        
      }

    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .then(function() {
      // always executed
    });
  }

  const isValid = (item) => {
    return true
  }
  
  //First Fetch
  fetchBatch(AIRTABLE_ROOT, onSuccess);
};


export const getContent = (onSuccess) => {
  axios
    .get(AIRTABLE_CONTENT_ROOT, 
      { 
        headers: {
          "Authorization": "Bearer key7QpnzX5Kw0bc6V"
        } 
      })
    .then(function(response) {
      // handle success
      if (response.status === 200) {
        onSuccess(response.data);
      }
    });
}


export const getFeatured = (onSuccess) => {
  axios
    .get(AIRTABLE_FEATURE_ROOT, 
      { 
        headers: {
          "Authorization": "Bearer key7QpnzX5Kw0bc6V"
        } 
      })
    .then(function(response) {
      // handle success
      if (response.status === 200) {
        onSuccess(response.data);
      }
    });
}