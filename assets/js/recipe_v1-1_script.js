var formEl = document.querySelector("#recipe-search");
var ingredientListEl = document.getElementById("ingredient-list");
// console.log(ingredientListEl)
var ingredientInput = document.getElementById("ingredient-input");

var inputBtn = document.getElementById("search-submit");
// console.log(inputBtn);
// console.log(formEl);

// console.log(ingredientInput);


var ingredientHandler = function(event) {
    event.preventDefault();
    
    if (!ingredientInput.value) {
        ingredientInput.style.setProperty("--c", "red");
        ingredientInput.placeholder = "Field cannot be empty.";
        return false;
    } else {
        ingredientInput.style.setProperty("--c", "grey");
        // if(event.target.id)
        var ingredientName = ingredientInput.value.toLowerCase().trim();
        // console.log(ingredientName);

        var ingredientListItem = document.createElement("li");
    
        var ingredientCard = document.createElement("div");
        ingredientCard.setAttribute("id", ingredientName/* + "-card"*/);
        ingredientCard.setAttribute("data-role", "card");
        ingredientCard.setAttribute("class", "item");
    
        var ingredientLabel = document.createElement("label");
        ingredientLabel.innerHTML = ingredientName;
        ingredientLabel.setAttribute("id", ingredientName/* + "-label"*/);
        ingredientLabel.setAttribute("data-role", "label");
        ingredientLabel.setAttribute("class", "item-child");
        // ingredientLabel.setAttribute("class", "?");
        ingredientCard.appendChild(ingredientLabel);
    
        var ingredientCheck = document.createElement("input");
        ingredientCheck.setAttribute("type", "checkbox");
        ingredientCheck.setAttribute("for", ingredientName)
        ingredientCheck.setAttribute("id", ingredientName/* + "-item-checkbox"*/);
        ingredientCheck.setAttribute("data-role", "item-checkbox");
        ingredientCheck.setAttribute("class", "item-child");
        // ingredientCheck.setAttribute("class", "?");
        ingredientCard.appendChild(ingredientCheck);
        // console.log(ingredientCard);
    
        var ingredientDelete = document.createElement("button");
        ingredientDelete.setAttribute("id", ingredientName/* + "-delete"*/);
        ingredientDelete.setAttribute("data-role", "delete");
        ingredientDelete.setAttribute("class", "item-child");
        ingredientDelete.innerHTML = "x";
        ingredientCard.appendChild(ingredientDelete);

        ingredientListItem.appendChild(ingredientCard);
    
        ingredientListEl.appendChild(ingredientListItem);
    
        ingredientInput.value = "";
    }
};

var ingredientItemHandler = function(event) {
    var target = event.target;
    var targetId = event.target.getAttribute("id");
    var targetDataRole = event.target.getAttribute("data-role");
    console.log(targetDataRole);
    // console.log(targetId);
    // if(targetDataRole = "item-checkbox") {
    //     console.log("checking");
    // }
    if (target.matches("li.item button[id='" + targetId + "']")) {
        console.log("deleting");
        var ingredientSelected = document.querySelector("li[id='" + targetId + "']");
        ingredientSelected.remove();
    } else if (target.matches("li.item label[id='" + targetId + "']") || target.matches("li.item label[id='" + targetId + "']")) {}
};


var key = "948e50c68fc14d59b9b4ff776f8fa614";

var recipe = function (event) {
    event.preventDefault();
    var inputEl = document.getElementById("ingredient-input").value.toLowerCase();
    inputEl = inputEl.split(/[ ]+/).filter(function(v){return v!==''}).join(',+')

    if (!inputEl) {
        var inputEl = document.getElementById("ingredient-input");
        inputEl.style.setProperty("--c", "red");
        inputEl.placeholder = "Field cannot be empty.";
        return false;
    }
    console.log(inputEl);

    function fetchRecipe (input) {
        var requestUrl = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=db254b5cd61744d39a2deebd9c361444&ingredients=" + input + "&number=1";
        var inputEl = document.getElementById("ingredient-input");
        inputEl.placeholder = "Enter Ingredient Here";
        inputEl.style.setProperty("--c", "grey");
      
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

                    var recipeId = data[0].id;
                    var requestUrl = "https://api.spoonacular.com/recipes/" + recipeId +"/information?apiKey=948e50c68fc14d59b9b4ff776f8fa614&includeNutrition=false"

                    function getInfo() {
                        fetch(requestUrl).then(function(response) {
                            if (response.ok) {
                                response.json().then(function(data) {
                                    console.log(data);
                                    var recipeIngredientsEl = document.createElement("h2")
                                    recipeIngredientsEl.innerText = "Ingredients"
                                    divEl.appendChild(recipeIngredientsEl);

                                    for (i=0; i < data.extendedIngredients.length; i++) {
                                        ingredientEl = document.createElement("p");
                                        ingredientEl.innerText = data.extendedIngredients[i].name;
                                        divEl.appendChild(ingredientEl);
                                    }
                                    var recipeStepsEl = document.createElement("h2");
                                    recipeStepsEl.innerText = "Instructions";
                                    divEl.appendChild(recipeStepsEl);

                                    var stepsEl = document.createElement("p");
                                    stepsEl.innerText = data.instructions;
                                    divEl.appendChild(stepsEl);
                                })
                            }
                        })
                    }

                    getInfo();

                    document.querySelector("body").appendChild(divEl);

                })
        
            }
        })
    }

    fetchRecipe(inputEl);

    document.getElementById("ingredient-input").value = "";
}


formEl.addEventListener("submit", ingredientHandler);

ingredientListEl.addEventListener("click", ingredientItemHandler);