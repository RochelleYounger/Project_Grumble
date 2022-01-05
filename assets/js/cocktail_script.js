fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(function (response) {
        if (response.ok) {

            response.json().then(function (data) {

                var divEl = document.createElement("section");
                divEl.className = "cocktail-section";
                var drinkNameEl = document.createElement("h2");
                drinkNameEl.innerText = data.drinks[0].strDrink;
                divEl.appendChild(drinkNameEl);

                var drinkImg = document.createElement("img");
                drinkImg.src=data.drinks[0].strDrinkThumb;
                divEl.appendChild(drinkImg);
                fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + data.drinks[0].idDrink)
                    .then(function (response2) {
                        if (response2.ok) {

                            response2.json().then(function (data2) {
                                var instructionsEl = document.createElement("h2");
                                instructionsEl.innerText = "Ingredients";
                                divEl.appendChild(instructionsEl);

                                var isNull = false;
                                var incrementedIngredient = 1;

                                while (!isNull) {
                                    var ingredientSearch = "data2.drinks[0].strIngredient" + incrementedIngredient;
                                    if (eval(ingredientSearch)) {
                                        var ingredient = document.createElement("p");
                                        ingredient.innerText = eval(ingredientSearch);
                                        divEl.appendChild(ingredient);
                                        incrementedIngredient += 1;
                                    }
                                    else {
                                        isNull = true;
                                    }

                                }
                                var instructionsTitleEl = document.createElement("h2");
                                instructionsTitleEl.innerText = "Instructions";
                                divEl.appendChild(instructionsTitleEl);

                                var instructionsEl = document.createElement("p");
                                instructionsEl.innerText = data2.drinks[0].strInstructions;
                                divEl.appendChild(instructionsEl);

                                document.querySelector("body").appendChild(divEl);

                            })

                        }

                    })

            })

        }

    })