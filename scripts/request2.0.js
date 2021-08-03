var oldSpreadsheetID = '1fDiPcoEeUrMZASy5Gtp_uDZ9hDa7J9GVyzHRskv_tm4';
var spreadsheetID = "1plC41QK-fXTR5ElyIUAFEZb3HBhQE64mNA7vWKFbmkY";

var categoriesMap = new Map();
var userMap = new Map();
var idMap = new Map();





function start() {
    // 2. Initialize the JavaScript client library.
    gapi.client.init({
        'apiKey': API_KEY,
        // Your API key will be automatically added to the Discovery Document URLs.
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(getSubmissions)
        .then(function (response) {
            console.log(response)
            sortEntries(response.result.values);
        }, function (reason) {
            console.log(reason);
            console.log('Error: ' + reason.result.error.message);
        });
};

function getSubmissions(){
        // 3. Initialize and make the API request.
        return gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetID,
            range: 'C2:L'
        })
}

function sortEntries(submissionArr){
    for(let i = submissionArr.length - 1; i >= 0; i--){
        let id;
        if (submissionArr[i][8] == ""){
            id = submissionArr[i][9];
        }
        else{
            id = submissionArr[i][8];
        }



        let submission = {
            username: submissionArr[i][0],
            title: submissionArr[i][1],
            description: submissionArr[i][2],
            category: submissionArr[i][3],
            src: submissionArr[i][5],
            imgur: submissionArr[i][6],
            thumb: submissionArr[i][7],
            id: id
        }





        if (categoriesMap.has(submission.category)){
            let arr  = categoriesMap.get(submission.category)
            arr.push(submission)
            categoriesMap.set(submission.category, arr);
        }
        else{
            categoriesMap.set(submission.category, [submission]);
        }

        if(userMap.has(submission.username)) {
            let arr = userMap.get(submission.username)
            arr.push(submission)
            userMap.set(submission.username, arr);
        }
        else{
            userMap.set(submission.username, [submission]);
        }


        idMap.set(submission.id, submission);
    }
    console.log(categoriesMap);
    console.log(userMap);
    console.log(idMap);
}





// 1. Load the JavaScript client library.
gapi.load('client', start);
