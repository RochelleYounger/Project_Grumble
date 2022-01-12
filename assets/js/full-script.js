//Global variables
var pageContentEl = document.querySelector("body");
var homePageEl = document.querySelector("#page-1");
var ingredientInput = document.querySelector("#ingredient-input");
var ingredientsColumn = document.querySelector("#ingredients-column");
var pastRecipeColumn = document.querySelector("#past-recipes-column");

var ingredientsArray = [];

//Load Recipe Data on home page
function loadSearchedRecipes(){
    var pastRecipes = JSON.parse(localStorage.getItem("pastRecipeResults"));
    if(pastRecipes){
        for(var i = 0; i < pastRecipes.length; i++){
            var recipeContainer = document.createElement("div");
            recipeContainer.id = "recipe-container";
            recipeContainer.innerHTML = "<h2>" + pastRecipes[i].name + "</h2><a><img src=" + pastRecipes[i].image +"></a>";     
        }
        if(recipeContainer){
            pastRecipeColumn.appendChild(recipeContainer);
        }
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

    var recipesSectionEl = document.createElement("article");
    recipesSectionEl.id="recipe-section";
    recipesSectionEl.classList.add("row","columns","is-multiline");

    recipesPageEl.appendChild(recipesSectionEl);


    var cocktailSectionEl = document.createElement("article");
    cocktailSectionEl.id = "cocktail-section"
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

    var requestUrl = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=db254b5cd61744d39a2deebd9c361444&ingredients=" + IngredientList + "&number=1";
    fetch(requestUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var tempArray = [];
                for(var i = 0; i < data.length; i++){
                    var recipeContainer = document.createElement("div");
                    recipeContainer.classList.add("column","is-4");
                    recipeContainer.innerHTML = "<h2>" + data[i].title + "</h2><a><img src=" +data[i].image +"></a>";
                    recipesSectionEl.appendChild(recipeContainer);
                    
                    var tempObj = {
                        name:data[i].title,
                        image:data[i].image
                    };
                    
                    tempArray.push(tempObj);
                    
                    
                    console.log(data[i]);
                
                    var recipeId = data[i].id;
                    console.log(recipeId);
                    var requestUrl = "https://api.spoonacular.com/recipes/" + recipeId +"/information?apiKey=948e50c68fc14d59b9b4ff776f8fa614&includeNutrition=false";
                    function getRecipeInfo() {
                        fetch(requestUrl).then(function(response) {
                            if (response.ok) {
                                response.json().then(function(data) {
                                    console.log(data);
        
                                    
                                    console.log(data);
                                    var recipeUrl = data.sourceUrl;
                                    var recipeContainer = document.createElement("div");
                                    recipeContainer.innerHTML = "<h2>" + data.title + "</h2><a href="  + recipeUrl +" target=_blank><img src=" +data.image +"></a>";
                                    recipesSectionEl.appendChild(recipeContainer);
        
                                    
                                })
                            }
                        })
                    }
                }
                saveSearchedRecipes(tempArray);
                getRecipeInfo(data);
            })
        }
    })
    
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(function (response2) {
        if (response2.ok) {

            response2.json().then(function (data2) {

                var cocktailContainer = document.createElement("div");
                cocktailContainer.innerHTML = "<h2>" + data2.drinks[0].strDrink + "</h2><a><img src=" +data2.drinks[0].strDrinkThumb+"></a>";

                fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + data2.drinks[0].idDrink)
                    .then(function (response3) {
                        if (response3.ok) {

                            response3.json().then(function (data3) {
                                cocktailContainer.innerHTML+="<h2>Ingredients</h2>"

                                var isNull = false;
                                var incrementedIngredient = 1;

                                while (!isNull) {
                                    var ingredientSearch = "data3.drinks[0].strIngredient" + incrementedIngredient;
                                    if (eval(ingredientSearch)) {
                                        cocktailContainer.innerHTML += "<p>"+eval(ingredientSearch)+"</p>";
                                        incrementedIngredient += 1;
                                    }
                                    else {
                                        isNull = true;
                                    }

                                }

                                cocktailContainer.innerHTML += "<h2>Instructions</h2>"
                                cocktailContainer.innerHTML += "<p>" + data2.drinks[0].strInstructions + "</p>";

                                cocktailSectionEl.appendChild(cocktailContainer);



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
        newIngredientCheckboxLabel.htmlFor = ingredientInput.value;
        newIngredientCheckboxLabel.innerText = ingredientInput.value;
        
        if(ingredientsArray.length === 0){
            ingredientsArray[0] = ingredientInput.value;
        }
        else{
            ingredientsArray.push(ingredientInput.value);
        }
        
        ingredientInput.value = "Enter Ingredients Here";

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

    var clickedEl = event.target;

    if(clickedEl.matches("#ingredient-input")){
        clickedEl.value = "";
    }

    else if(clickedEl.matches("#add-ingredient-button")){
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