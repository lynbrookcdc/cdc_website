let spreadsheetID = "1plC41QK-fXTR5ElyIUAFEZb3HBhQE64mNA7vWKFbmkY";

const categoriesMap = new Map();
const userMap = new Map();
const idMap = new Map();

var announcementsText = "";



function getData() {
    // 2. Initialize the JavaScript client library.
    return new Promise((resolve, reject) => {
        gapi.load('client', function () {
            gapi.client.init({
                'apiKey': API_KEY,
                // Your API key will be automatically added to the Discovery Document URLs.
                'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
            }).then(getAnnouncementsSubmissions)
                .then(function (response) {
                    announcementsText = response.result.valueRanges[0].values[0][0];
                    sortEntries(response.result.valueRanges[1].values);
                    resolve();
                }, function (reason) {
                    console.log(reason);
                    console.log('Error: ' + reason.result.error.message);
                    reject();
                });
        })
    });
}

function getAnnouncementsSubmissions(){
        // 3. Initialize and make the API request.
        return gapi.client.sheets.spreadsheets.values.batchGet({
            spreadsheetId: spreadsheetID,
            ranges: ['Backend!A2' , 'C2:L']
        })
}

function sortEntries(submissionArr){
    for(let i = 0; i < submissionArr.length; i++){
        let id;
        let image;
        let thumb;
        if (submissionArr[i][8] == ""){
            image = submissionArr[i][5];
            thumb = submissionArr[i][5];
            id = submissionArr[i][9];
        }
        else{
            image = submissionArr[i][6];
            thumb = submissionArr[i][7];
            id = submissionArr[i][8];
        }



        let submission = {
            username: submissionArr[i][0],
            title: submissionArr[i][1],
            description: submissionArr[i][2],
            category: submissionArr[i][3],
            image: image,
            thumb: thumb,
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
}