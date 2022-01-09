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
        var requestUrl = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=a0b4d0a4cdae4c38bf5eaefd861933fc&ingredients=" + input + "&number=1";
      
        fetch(requestUrl).then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                    var sectionEl = document.createElement("section");
                    sectionEl.className = "recipe-section";
                    
                    var recipeSectionTitle = document.createElement("h1");
                    recipeSectionTitle.innerText = ("Recipes")
                    sectionEl.appendChild(recipeSectionTitle);

                    for (var i=0; i < data.length; i++) {
                        console.log(data[i].title)
    
                        var recipeId = data[i].id;
                        var requestUrl = "https://api.spoonacular.com/recipes/" + recipeId +"/information?apiKey=a0b4d0a4cdae4c38bf5eaefd861933fc&includeNutrition=false";
                        function getInfo(requestUrl) {
                            fetch(requestUrl).then(function(response) {
                                if (response.ok) {
                                    response.json().then(function(data) {
                                        console.log(data);

                                    
                                        var recipeCard = document.createElement("div");
                                        recipeCard.className = "card";
                                        recipeCard.setAttribute("id", i)

                                        var recipeNameEl = document.createElement("h2");
                                        recipeNameEl.innerText = data.title;
                                        recipeCard.appendChild(recipeNameEl);
                    
                                        var recipeImg = document.createElement("img");
                                        recipeImg.src=data.image;
                                        recipeCard.appendChild(recipeImg);
                            
                                        // var recipeIngredientsEl = document.createElement("div")
                                        // recipeIngredientsEl.className = "ingredient-div";
                        
                                        // var recipeIngredientsTitle = document.createElement("h3")
                                        // recipeIngredientsTitle.innerText = "Ingredients";
                                        // recipeIngredientsEl.appendChild(recipeIngredientsTitle);
                        
                                        // for (var i=0; i < data.extendedIngredients.length; i++) {
                                        //     var ingredientEl = document.createElement("p");
                                        //     ingredientEl.innerText = data.extendedIngredients[i].name;
                                        //     recipeIngredientsEl.appendChild(ingredientEl);
                                        // }
                        
                                        // recipeCard.appendChild(recipeIngredientsEl);
                        
                                        // var recipeInstructionsEl = document.createElement("div")
                                        // recipeInstructionsEl.className = "card";
                        
                                        // var recipeStepsTitle = document.createElement("h3");
                                        // recipeStepsTitle.innerText = "Instructions";
                                        // recipeInstructionsEl.appendChild(recipeStepsTitle);
                        
                                        // console.log(data.analyzedInstructions)
                        
                                        // for (var i=0; i < data.analyzedInstructions[0].steps.length; i++) {
                                        //     var stepEl = document.createElement("p");
                                        //     stepEl.innerText = "Step " + (i+1) + "   " +  data.analyzedInstructions[0].steps[i].step;
                                        //     recipeInstructionsEl.appendChild(stepEl);
                                        // }
                        
                                        // recipeCard.appendChild(recipeInstructionsEl);
                        
                                        var linkEl = document.createElement("h2");
                                        linkEl.innerText = "Link";
                                        recipeCard.appendChild(linkEl);
                        
                                        var text = document.createElement("p");
                                        text.innerText = "View recipe website ";
                                        recipeCard.appendChild(text);
                        
                                        var span = document.createElement("span");
                                        text.appendChild(span);
                        
                                        var link = document.createElement("a");
                                        link.innerText = "here";
                                        link.setAttribute("href", data.sourceUrl)
                                        link.setAttribute("target", "_blank");
                                        span.appendChild(link);

                                        

                                        sectionEl.appendChild(recipeCard);
                                    
                                        
                                    })
                                }
                            })
                        }
    
                        getInfo(requestUrl);
    
                    }
                    
                    document.querySelector("body").appendChild(sectionEl);
                        

                })
        
            }
        })
    }

    

    


    fetchRecipe(inputEl);

    document.getElementById("ingredient-input").value = "";

    
}


formEl.addEventListener("submit", test);