//Global variables
var pageContentEl = document.querySelector("body");
var homePageEl = document.querySelector("#page-1");
var ingredientInput = document.querySelector("#ingredient-input");
var ingredientsColumn = document.querySelector("#ingredients-column");

var ingredientsArray = [];
//process recipe based on inputed ingredients
function processRecipes(){
    homePageEl.style.display = "none";

    var recipesPageEl = document.createElement("section");
    recipesPageEl.id = "page-2";
    var backButtonEl = document.createElement("a");
    backButtonEl.classList.add("button", "is-white", "is-inverted", "back-button");
    backButtonEl.innerText = "Back";

    recipesPageEl.appendChild(backButtonEl);
    pageContentEl.appendChild(recipesPageEl);
}

//Process user pressing back button
function processBack(){
    homePageEl.style.display = "block";
    document.querySelector("#page-2").remove();
}

function processAddingIngredient(){
    if(!ingredientInput.value || ingredientInput.value === "Enter Ingredients Here"){
        return;
    }
    else{

        for(var i = 0; i < ingredientsArray.length; i++){
            if(ingredientsArray[i].toLowerCase() === ingredientInput.value.toLowerCase()){
                ingredientInput.value = "";
                return;
            }
        }

        if(document.querySelector("#ingredient-section") === null){
            var ingredientListSection = document.createElement("section");
            ingredientListSection.id = "ingredient-section";
            ingredientsColumn.appendChild(ingredientListSection);
        }
        

        var newIngredientCheckbox = document.createElement("input");
        newIngredientCheckbox.type = "checkbox";
        newIngredientCheckbox.id = ingredientInput.value;
        newIngredientCheckbox.name = ingredientInput.value;
        newIngredientCheckbox.checked = true;

        var newIngredientCheckboxLabel = document.createElement("label");
        newIngredientCheckboxLabel.htmlFor = ingredientInput.value;
        newIngredientCheckboxLabel.innerText = ingredientInput.value;

        ingredientsArray.push(ingredientInput.value);
        ingredientInput.value = "";

        document.querySelector("#ingredient-section").appendChild(newIngredientCheckbox);
        document.querySelector("#ingredient-section").appendChild(newIngredientCheckboxLabel);
        
        
        if(document.querySelector("#find-recipes-button") === null){
            console.log(document.querySelector("#find-recipes-button"));
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
        for(var i = 0; i < ingredientsArray.length; i++){
            if(ingredientsArray[i].checked === true){
                atleastOneIngredient = true;
            }
        }

        if(atleastOneIngredient){
            processRecipes();
        }
        
    }

    else if(clickedEl.matches(".back-button")){
        processBack();
    }

}

pageContentEl.addEventListener("click", clickHandler);