//Global variables
var pageContentEl = document.querySelector("body");
var homePageEl = document.querySelector("#page-1");
var ingredientInput = document.querySelector("#ingredient-input");
var ingredientsColumn = document.querySelector("#ingredients-column");
var pastRecipeContainer = document.querySelector(".past-recipes-container");

var ingredientsArray = [];

//Load Recipe Data on home page
function loadSearchedRecipes(){
    var pastRecipes = JSON.parse(localStorage.getItem("pastRecipeResults"));
    
    if(pastRecipes){
        var recipesSectionEl = document.createElement("article");
        recipesSectionEl.id="past-recipe-section";
        recipesSectionEl.classList.add("columns","is-multiline");

        for(var i = 0; i < pastRecipes.length; i++){
            var instructionsUrl = pastRecipes[i].instructions;
            var recipeContainer = document.createElement("a");
            recipeContainer.href= instructionsUrl;
            recipeContainer.target = "_blank";
            recipeContainer.classList.add("column","is-4","recipe-container");
            recipeContainer.innerHTML = "<div class='inner-recipe-container'><h2>" + pastRecipes[i].name + "</h2><img src=" + pastRecipes[i].image +"></div>";
            console.log(recipesSectionEl);
            recipesSectionEl.appendChild(recipeContainer); 
        }

        pastRecipeContainer.appendChild(recipesSectionEl);
    }
    else{
        return;
    }
}
loadSearchedRecipes();

//Save Recipe Data
function saveSearchedRecipes(recipeResults){
    localStorage.setItem("pastRecipeResults",JSON.stringify(recipeResults));
}

//process recipe based on inputed ingredients
function processRecipes(checkedIngredients){
    homePageEl.style.display = "none";
    
    var recipesPageEl = document.createElement("section");
    recipesPageEl.id = "page-2";
    recipesPageEl.className = "container";
    recipesPageEl.innerHTML = "<h2 id='recipe-page-title'> Here's are some recipes we found for you!</h2>"

    var recipesSectionEl = document.createElement("article");
    recipesSectionEl.id="recipe-section";
    recipesSectionEl.classList.add("columns","is-multiline");
    

    recipesPageEl.appendChild(recipesSectionEl);


    var cocktailSectionEl = document.createElement("article");
    cocktailSectionEl.id = "cocktail-section"
    cocktailSectionEl.classList.add("columns","is-multiline","is-vcentered");
    recipesPageEl.appendChild(cocktailSectionEl);

    var BackSectionEl = document.createElement("article");
    BackSectionEl.id="back-section"
    recipesPageEl.appendChild(BackSectionEl);

    pageContentEl.appendChild(recipesPageEl);

    var IngredientList = "";
    if(checkedIngredients.length <= 1){
        IngredientList = checkedIngredients[0];
    }
    else{
        for(var i =0; i < checkedIngredients.length; i++){
            if(i === 0){
                IngredientList = checkedIngredients[i];
            }
            else{
                IngredientList += ",+" + checkedIngredients[i];
            }
           
        }
    }

    var requestUrl = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=fa4bfefbedf24cb08b5c47730b102420&ingredients=" + IngredientList + "&number=4";
     fetch(requestUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var tempArray = [];
                for(var i = 0; i < data.length; i++){
                    
                
                    var recipeId = data[i].id;
                    var requestUrl = "https://api.spoonacular.com/recipes/" + recipeId +"/information?apiKey=fa4bfefbedf24cb08b5c47730b102420&includeNutrition=false";
                    async function getInstruction(){
                            await fetch(requestUrl).then(function(response) {
                            if (response.ok) {
                                response.json().then(function(data) {
                                    var recipeUrl = data.sourceUrl;
                                    var recipeContainer = document.createElement("a");
                                    recipeContainer.href= recipeUrl;
                                    recipeContainer.target = "_blank";
                                    recipeContainer.classList.add("column","is-4","recipe-container");
                                    recipeContainer.innerHTML = "<div class='inner-recipe-container'><h2>" + data.title + "</h2><img src=" +data.image +"></div>";
                                    recipesSectionEl.appendChild(recipeContainer);
                                    
                                    var tempObj = {
                                        name:data.title,
                                        image:data.image,
                                        instructions:recipeUrl
                                    };

                                    tempArray.push(tempObj);
                                    saveSearchedRecipes(tempArray);
                                })
                            }
                        })
                    }
                    getInstruction();
                }
                
            })
        }
    })
    
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(function (response2) {
        if (response2.ok) {

            response2.json().then(function (data2) {

                var cocktailTitleContainer = document.createElement("div");
                cocktailTitleContainer.classList.add("column","is-12");
                cocktailTitleContainer.innerHTML = "<h2 id='cocktail-title'> Looking for a drink to go with your meal? Try this!</h2>"
                cocktailSectionEl.appendChild(cocktailTitleContainer);

                var cocktailContainer = document.createElement("div");
                cocktailContainer.classList.add("column","is-6");
                cocktailContainer.innerHTML = "<h2 class='cocktail-subtitle'>" + data2.drinks[0].strDrink + "</h2><img src=" +data2.drinks[0].strDrinkThumb+">";
                cocktailSectionEl.appendChild(cocktailContainer);

                fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + data2.drinks[0].idDrink)
                    .then(function (response3) {
                        if (response3.ok) {

                            response3.json().then(function (data3) {
                                var cocktailInfoContainer = document.createElement("div");
                                cocktailInfoContainer.classList.add("column","is-6");
                                cocktailInfoContainer.innerHTML+="<h2 class='cocktail-subtitle'>Ingredients</h2>"

                                var isNull = false;
                                var incrementedIngredient = 1;

                                while (!isNull) {
                                    var ingredientSearch = "data3.drinks[0].strIngredient" + incrementedIngredient;
                                    if (eval(ingredientSearch)) {
                                        cocktailInfoContainer.innerHTML += "<p>- "+eval(ingredientSearch)+"</p>";
                                        incrementedIngredient += 1;
                                    }
                                    else {
                                        isNull = true;
                                    }

                                }

                                cocktailInfoContainer.innerHTML += "<h2 class='cocktail-subtitle'>Instructions</h2>"
                                cocktailInfoContainer.innerHTML += "<p>" + data2.drinks[0].strInstructions + "</p>";

                                cocktailSectionEl.appendChild(cocktailInfoContainer);

                            })

                        }

                    })

            })

        }

    })

    var backButtonEl = document.createElement("a");
        backButtonEl.classList.add("button", "is-white", "is-inverted", "back-button");
        backButtonEl.innerText = "Back";
        BackSectionEl.appendChild(backButtonEl);
        
}

//Process user pressing back button
function processBack(){
    homePageEl.style.display = "block";
    document.querySelector("#page-2").remove();
    document.querySelector("#ingredient-section").remove();
    document.querySelector("#find-recipes-button").remove();

    if(document.querySelector("#recipe-container")){
        document.querySelector("#recipe-container").remove();
    }
    if(document.querySelector("#past-recipe-section")){
        document.querySelector("#past-recipe-section").remove();
    }

    ingredientInput.value = "Enter Ingredients Here";
    ingredientsArray = [];
    loadSearchedRecipes();
}

//Process adding ingredients
function processAddingIngredient(){
    
    if(!ingredientInput.value || ingredientInput.value === "Enter Ingredients Here"){
        return;
    }
    else{
        
        if(document.querySelector("#ingredient-section") === null){
            var ingredientListSection = document.createElement("section");
            ingredientListSection.id = "ingredient-section";
            ingredientsColumn.appendChild(ingredientListSection);
        }
        
        var newIngredientCheckbox = document.createElement("input");
        newIngredientCheckbox.className = "ingredient-checkbox";
        newIngredientCheckbox.type = "checkbox";
        newIngredientCheckbox.id = ingredientInput.value;
        newIngredientCheckbox.name = ingredientInput.value;
        newIngredientCheckbox.checked = true;

        var newIngredientCheckboxLabel = document.createElement("label");
        newIngredientCheckboxLabel.className = "ingredient-label";
        newIngredientCheckboxLabel.htmlFor = ingredientInput.value;
        newIngredientCheckboxLabel.innerText = ingredientInput.value;
        
        if(ingredientsArray.length === 0){
            ingredientsArray[0] = ingredientInput.value;
        }
        else{
            ingredientsArray.push(ingredientInput.value);
        }
        
        ingredientInput.value = "";

        document.querySelector("#ingredient-section").appendChild(newIngredientCheckbox);
        document.querySelector("#ingredient-section").appendChild(newIngredientCheckboxLabel);
        
        
        if(document.querySelector("#find-recipes-button") === null){

            var findRecipeButton = document.createElement("a");
            findRecipeButton.classList.add("button", "is-white", "is-inverted");
            findRecipeButton.id="find-recipes-button";
            findRecipeButton.innerText = "Find Recipes";

            ingredientsColumn.appendChild(findRecipeButton);
        }

    }
}

//Process user clicks
function clickHandler(event){

    event.preventDefault();
    var clickedEl = event.target;

    if(clickedEl.matches("#ingredient-input")){
        clickedEl.value = "";
    }

    else if(clickedEl.matches("#add-ingredient-button") || clickedEl.matches("#recipe-search")){
        
        processAddingIngredient();
    }

    else if(clickedEl.matches("#find-recipes-button")){
        
        var atleastOneIngredient = false;
        var listOfIngredientCheckboxesEl = document.querySelectorAll(".ingredient-checkbox");
        var checkedIngredients = [];
        for(var v = 0; v < listOfIngredientCheckboxesEl.length; v++){
            if(listOfIngredientCheckboxesEl[v].checked === true){
                atleastOneIngredient = true;
                checkedIngredients.push(listOfIngredientCheckboxesEl[v].name);
            }
        }

        if(atleastOneIngredient){
            processRecipes(checkedIngredients);
        }
        
    }

    else if(clickedEl.matches(".back-button")){
        processBack();
    }

}

pageContentEl.addEventListener("click", clickHandler);
pageContentEl.addEventListener("submit",clickHandler);