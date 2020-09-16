let id = location.search.substring(1);
let tabTitle = document.querySelector("title");
let image = document.querySelector("img");
let title = document.getElementById("title");
let name = document.getElementById("name");
let category = document.getElementById("category");
let description = document.getElementById("description");


getData().then(() => {
        let submission = idMap.get(id);
        fillInfo(submission);
    }
)


function fillInfo(submission) {


    //fill in all the text
    image.src = submission.image;
    tabTitle.textContent = submission.title;
    title.textContent = submission.title;
    name.textContent =  "By: " + submission.displayName;
    category.textContent = "Category: " + submission.category;
    //Im pretty sure this is bad practice...
    description.innerHTML = submission.description.replace(new RegExp('\r?\n','g'), '<br />');


    //link to user profile
    let link = document.getElementById("name_link");
    link.href = "user.html?" + submission.displayName;
}