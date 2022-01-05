var recipeEl = document.getElementById("recipeSearch");
console.log(recipeEl);

// var ID = "5d56b0b0";
var key = "948e50c68fc14d59b9b4ff776f8fa614";



var fetchData = function() {
    // var baseURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=chicken&number=2?apiKey=948e50c68fc14d59b9b4ff776f8fa614";
    // var response = fetch("https://api.spoonacular.com/recipes/complexSearch?query=pasta&maxFat=25&number=2?apiKey=948e50c68fc14d59b9b4ff776f8fa614");
    var response = fetch("https://api.spoonacular.com/recipes/parseIngredients?apiKey=948e50c68fc14d59b9b4ff776f8fa614&ingredientList={recipe}");
    var data = response.json;
    console.log(data);

};

// recipeEl.addEventListener("click", fetchData());

