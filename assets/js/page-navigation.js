var pageContentEl = document.querySelector("body");
var homePageEl = document.querySelector("#page-1");

function buttonHandler(event){

    var buttonEl = event.target;

    if(buttonEl.matches("#input-submit")){
        homePageEl.style.display = "none";

        var recipesPageEl = document.createElement("section");
        recipesPageEl.id = "page-2";
        var backButtonEl = document.createElement("a");
        backButtonEl.classList.add("button", "is-white", "is-inverted", "back-button");
        backButtonEl.innerText = "Back";

        recipesPageEl.appendChild(backButtonEl);
        pageContentEl.appendChild(recipesPageEl);
    }

    else if(buttonEl.matches(".back-button")){
        homePageEl.style.display = "block";
        document.querySelector("#page-2").remove();
    }

}

pageContentEl.addEventListener("click", buttonHandler);