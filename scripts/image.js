let id = location.search.substring(1);

let tabTitle = document.querySelector("title");
let image = document.querySelector("img");
let title = document.querySelector("h1");
let username = document.getElementById("username");
let category = document.getElementById("category");
let description = document.querySelector("p");


let previousLink = document.getElementById("previous_link");
let nextLink = document.getElementById("next_link") ;


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
    username.textContent =  submission.username;
    category.textContent = submission.category;
    description.innerHTML = linkifyStr(submission.description,{});

    //link to user profile
    username.href = "user.html?" + submission.username; //TODO use URL parameters correctly (this is kind of a hacky solution)
    category.href = "category.html?" + submission.category;
}