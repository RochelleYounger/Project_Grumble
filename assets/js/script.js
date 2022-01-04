fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
.then(function(response){
    if(response.ok){
        
        response.json().then(function(data){

            var drinkNameEl = document.createElement("h2");
            drinkNameEl.innerText = data.drinks[0].strDrink;
            document.querySelector("body").appendChild(drinkNameEl);

            var drinkImg = document.createElement("div");
            drinkImg.innerHTML = "<img src=" + data.drinks[0].strDrinkThumb + " width = '200px' height ='200px'>";
            document.querySelector("body").appendChild(drinkImg);
            console.log(data.drinks[0].idDrink);
            fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + data.drinks[0].idDrink)
            .then(function(response2){
                if(response2.ok){
                    
                    response2.json().then(function(data2){
                        var instructionsEl = document.createElement("h2");
                        instructionsEl.innerText = "Ingredients";
                        document.querySelector("body").appendChild(instructionsEl);

                        var isNull = false;
                        var incrementedIngredient = 1;

                        while(!isNull){
                            var ingredientSearch = "data2.drinks[0].strIngredient" + incrementedIngredient;
                            if(eval(ingredientSearch)){
                                var ingredient = document.createElement("p");
                                ingredient.innerText = eval(ingredientSearch);
                                document.querySelector("body").appendChild(ingredient);
                                incrementedIngredient += 1;
                            }
                            else{
                                isNull=true;
                            }
                            
                        }
                        var instructionsTitleEl = document.createElement("h2");
                        instructionsTitleEl.innerText = "Instructions";
                        document.querySelector("body").appendChild(instructionsTitleEl);
                        
                        var instructionsEl = document.createElement("p");
                        instructionsEl.innerText = data2.drinks[0].strInstructions;
                        document.querySelector("body").appendChild(instructionsEl);
                        
                    })

                }

            })

        })

    }

})