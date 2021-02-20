var submissionArr = [];  //TODO change submissionsArr to a map (maybe)
var categoriesMap = new Map();
var userMap = new Map();
var idMap = new Map();
var AA;

var announcmentsText = "nothing to see here"

const sheetID = "1fDiPcoEeUrMZASy5Gtp_uDZ9hDa7J9GVyzHRskv_tm4";
const sheetRange = "C2:L"

getData = new Promise((resolve) => {
     get_access_token_using_saved_refresh_token().then(accessToken => {
         getFile(accessToken);
         return getSheet(accessToken)
     }).then(sheet => {
         organiseData(sheet)
         resolve();
     });
})

function get_access_token_using_saved_refresh_token() {
    // from the oauth playground
    const refresh_token = DRIVEAPI_REFRESH_TOKEN;
    // from the API console
    const client_id = "422399080155-beqjm3ep6hosnhoduk88o753neuh88u0.apps.googleusercontent.com";
    // from the API console
    const client_secret = CDCAPI_CLIENT_SECRET;
    // from https://developers.google.com/identity/protocols/OAuth2WebServer#offline
    const refresh_url = "https://www.googleapis.com/oauth2/v4/token";

    const post_body = `grant_type=refresh_token&client_id=${encodeURIComponent(client_id)}&client_secret=${encodeURIComponent(client_secret)}&refresh_token=${encodeURIComponent(refresh_token)}`;

    let refresh_request = {
        body: post_body,
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    }

    // post to the refresh endpoint, parse the json response and use the access token to call files.list
    return fetch(refresh_url, refresh_request).then( response => {
        return(response.json());
    }).then( response_json =>  {
        return response_json.access_token;
    });
}


function getSheet (access_token) {
    const sheetUrl = "https://sheets.googleapis.com/v4/spreadsheets/"+sheetID+"/values/"+ sheetRange;
    let sheetRequest = {
        method: "GET",
        headers: new Headers({
            Authorization: "Bearer " + access_token
        })
    }
    return fetch(sheetUrl, sheetRequest).then( response => {
        return(response.json());
    }).then( sheetJSON =>  {
        console.log(sheetJSON);
        return sheetJSON.values;
    });
}

let imageID =  "1qcPa8PZQmRJSz5DxG97jyEwCYGM7s5UY"

function getFile (access_token) {

    let parameters  = new URLSearchParams( {
        fields: 'webContentLink'
    })


    const fileUrl = "https://www.googleapis.com/drive/v3/files/" + imageID + '?' + parameters.toString();
    let fileRequest = {
        method: "GET",
        headers: new Headers({
            Authorization: "Bearer " + access_token
        }),
    }
    fetch(fileUrl, fileRequest).then( response => {
        return(response.json());
    }).then( file =>  {
        AA= file.webContentLink;
        console.log(file.webContentLink);
        console.log()
    });
}




function organiseData(data) {
    announcmentsText = data[0][0];
    for (let a = 1; a < data.length; a++){
         let subAsArr = data[a];
         let sub = new submission();
         submissionArr.push(sub);

        //define display name push display name to map
        sub.displayName = subAsArr[0];
        if (!userMap.has(sub.displayName)) {
            userMap.set(sub.displayName, []);
        }
        userMap.get(sub.displayName).push(sub);

        //define submission title
        sub.title = subAsArr[1];

        //define submission description
        sub.description = subAsArr[2];

        //define submission category and push to submission map
        sub.category = subAsArr[3];
        if (!categoriesMap.has(sub.category)) {
            categoriesMap.set(sub.category, []);
        }
        let categoryArray = categoriesMap.get(sub.category);
        sub.categoryPos = categoryArray.length;
        categoryArray.push(sub);

        //define submission image
        sub.image = subAsArr[5];

        //define submission thumbnail
        sub.thumbnail = subAsArr[6];

        //define submission ID and push to id map
        sub.id = subAsArr[9];
        idMap.set(sub.id, sub);
    }
}


class submission{
    constructor() {
        this.timestamp;
        this.displayName;
        this.title;
        this.description = "";
        this.category;
        this.image;
        this.id;
        this.thumbnail;
        this.categoryPos;
    }
}

