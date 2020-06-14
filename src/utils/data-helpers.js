import axios from "axios";

const AIRTABLE_ROOT = 'https://api.airtable.com/v0/appkTWOL5iNijtSO8/Imported%20table?view=Grid%20view'

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
