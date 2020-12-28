var submissionArr = [];  //TODO change submissionsArr to a map (maybe)
var categoriesMap = new Map();
var userMap = new Map();
var idMap = new Map();


var announcmentsText = "nothing to see here"



//JSON link: https://spreadsheets.google.com/feeds/cells/1fDiPcoEeUrMZASy5Gtp_uDZ9hDa7J9GVyzHRskv_tm4/4/public/full?alt=json
const url = "https://spreadsheets.google.com/feeds/cells/1fDiPcoEeUrMZASy5Gtp_uDZ9hDa7J9GVyzHRskv_tm4/1/public/full?alt=json"

var getData =  function getData(){
    return fetch(url).then(res => res.json())
        .then((data) => {
            organiseData(data);
        })
        .catch(err => {
            throw err
        });
};



function organiseData(data) {


    console.log(data)
    let cellArr = data.feed.entry;


    let maxRow = Number(data.feed.gs$rowCount.$t);
    let maxCol = 7;
    let rCount = 0;
    let sub; // each individual user submission

    //may create blacklist or whitelist system .

    //Sorts cells by their submissions (which im super confused as to why it isn't already like that but whatever)

    for (let i = 12; i < cellArr.length; i++) {
        let cell = cellArr[i];

        if (sub == null) {
            sub = new submission();
        }

        //IMPORTANT! This program relies on the assumption that for every submission there is an ID at col 9
        switch (Number(cell.gs$cell.col)) {
            case 1:
                sub.timestamp = cell.gs$cell.$t;
                break;
            case 3:
                sub.displayName = cell.gs$cell.$t;
                if (!userMap.has(sub.displayName)) {
                    userMap.set(sub.displayName, []);
                }
                userMap.get(sub.displayName).push(sub);


                break;
            case 4:
                sub.title = cell.gs$cell.$t;
                break;
            case 5:
                sub.description = cell.gs$cell.$t;
                break;
            case 6:
                sub.category = cell.gs$cell.$t;
                if (!categoriesMap.has(sub.category)) {
                    categoriesMap.set(sub.category, []);
                }
                categoriesMap.get(sub.category).push(sub);
                break;
            case 8:
                sub.image = cell.gs$cell.$t;
                break;
            case 9:
                sub.thumbnail = cell.gs$cell.$t;
                break;
            case 12:
                sub.id = cell.gs$cell.$t;
                idMap.set(sub.id, sub);

                //submission stored into submission array then reset for new user submission
                submissionArr[cell.gs$cell.row - 2] = sub;
                sub = null;
                break;
            case 21:
                if (Number(cell.gs$cell.row) === 2){
                    announcmentsText = cell.gs$cell.$t;
                }
                break;
        }
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
    }
}

