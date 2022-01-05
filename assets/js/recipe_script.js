var formEl = document.querySelector("#recipe-search");

var inputBtn = document.getElementById("input-submit");
// console.log(inputBtn);
console.log(formEl);
console.log(document.getElementById("ingredient-input"));


var key = "948e50c68fc14d59b9b4ff776f8fa614";




var test = function (event) {
    event.preventDefault();
    var inputEl = document.getElementById("ingredient-input").value.toLowerCase();
    inputEl = inputEl.split(/[ ]+/).filter(function(v){return v!==''}).join(',+')

    if (!inputEl) {
        alert("Empty");
        return false;
    }
    console.log(inputEl);

    function fetchData (input) {
        var requestUrl = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=db254b5cd61744d39a2deebd9c361444&ingredients=" + input + "&number=1";
      
        fetch(requestUrl).then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    console.log(data[0].title)
                    var divEl = document.createElement("section");
                    divEl.className = "recipe-section";
                    var recipeNameEl = document.createElement("h2");
                    recipeNameEl.innerText = data[0].title;
                    divEl.appendChild(recipeNameEl);

                    var recipeImg = document.createElement("img");
                    recipeImg.src=data[0].image;
                    divEl.appendChild(recipeImg);

                    document.querySelector("body").appendChild(divEl);

                })
        
            }
        })    
    }

    fetchData(inputEl);

    document.getElementById("ingredient-input").value = "";

    
}


formEl.addEventListener("submit", test);