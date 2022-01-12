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

    function fetchRecipe (input) {
        var requestUrl = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=db254b5cd61744d39a2deebd9c361444&ingredients=" + input + "&number=9";
      
        fetch(requestUrl).then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data[i]);
                    for (var i=0; i<data.length; i++) {
                        var recipeSectionEl = document.createElement("section");
                        recipeSectionEl.className = "recipe-section";
    
                        var recipeId = data[i].id;
                        var requestUrl = "https://api.spoonacular.com/recipes/" + recipeId +"/information?apiKey=948e50c68fc14d59b9b4ff776f8fa614&includeNutrition=false"
    
                        function getInfo() {
                            fetch(requestUrl).then(function(response) {
                                if (response.ok) {
                                    response.json().then(function(data) {
                                        console.log(data);
                                        // console.log(data.analyzedInstructions);
                                        // console.log(data.analyzedInstructions[0].steps);

                                        var recipeCardEl = document.createElement("div");
                                        recipeCardEl.classList.add("recipe-card");
                                        recipeSectionEl.appendChild(recipeCardEl);

                                        var recipeNameEl = document.createElement("h1");
                                        recipeNameEl.innerText = data.title;
                                        recipeCardEl.appendChild(recipeNameEl);

                                        
                                        var recipeImg = document.createElement("img");
                                        recipeImg.src = data.image;
                                        recipeCardEl.appendChild(recipeImg);
                    
                                        // var recipeIngredientsEl = document.createElement("h2")
                                        // recipeIngredientsEl.innerText = "Ingredients"
                                        // recipeCardEl.appendChild(recipeIngredientsEl);
    
                                        // for (var i=0; i < data.extendedIngredients.length; i++) {
                                        //     var ingredientEl = document.createElement("p");
                                        //     ingredientEl.innerText = data.extendedIngredients[i].name;
                                        //     recipeCardEl.appendChild(ingredientEl);
                                        // }
                                        // var recipeStepsEl = document.createElement("h2");
                                        // recipeStepsEl.innerText = "Instructions";
                                        // recipeCardEl.appendChild(recipeStepsEl);
    
                                        // for (var i=0; i < data.analyzedInstructions[0].steps.length; i++) {
                                        //     var stepEl = document.createElement("p");
                                        //     stepEl.innerText = "Step " + (i+1) + "   " +  data.analyzedInstructions[0].steps[i].step;
                                        //     recipeCardEl.appendChild(stepEl);
                                        // }
    
                                        var linkEl = document.createElement("h2");
                                        linkEl.innerText = "Link";
                                        recipeCardEl.appendChild(linkEl);
    
                                        var text = document.createElement("p");
                                        text.innerText = "View recipe website ";
                                        recipeCardEl.appendChild(text);
    
                                        var span = document.createElement("span");
                                        recipeCardEl.appendChild(span);
    
                                        var link = document.createElement("a");
                                        link.innerText = "here";
                                        link.setAttribute("href", data.sourceUrl)
                                        link.setAttribute("target", "_blank");
                                        span.appendChild(link);
    
                                        
                                    })
                                }
                            })
                        }
    
                        getInfo();
    
                        document.querySelector("body").appendChild(recipeSectionEl);
                    }
                   

                })
        
            }
        })
    }

    

    


    fetchRecipe(inputEl);

    document.getElementById("ingredient-input").value = "";

    
}


formEl.addEventListener("submit", test);