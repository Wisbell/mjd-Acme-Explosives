console.log("Acme.js loaded")

// These variables will store the json info
var categories;
var types;
var products;


// First promise
var categoriesPromise = new Promise(function(resolve, reject){
    var categoriesRequest = new XMLHttpRequest()
    categoriesRequest.addEventListener("load", function(){
        var categoriesList = JSON.parse(categoriesRequest.responseText).categories
        resolve(categoriesList)
    })
    categoriesRequest.open("GET", "categories.json")
    categoriesRequest.send()
})


categoriesPromise
    .then(
        function(categoriesList){
            categories = categoriesList
            console.log("categories list promise resolved", categories)
            return typesPromise
    })
    .then(
        function(typesList){
            types = typesList.types
            console.log("types list promise resolved", types)
            return productsPromise
        })
    .then(
        function(productsList){
            products = productsList.products[0]
            console.log("products list promise resolved", products)
            return consoleLogJSON()
        })




// Types and Products Promises

var typesPromise = new Promise(function(resolve, reject){
    var typesRequest = new XMLHttpRequest()
    typesRequest.addEventListener("load", function(){
        var typesList = JSON.parse(typesRequest.responseText)
        resolve(typesList)
    })
    typesRequest.open("GET", "types.json")
    typesRequest.send()
})


var productsPromise = new Promise(function(resolve, reject){
    var productsRequest = new XMLHttpRequest()
    productsRequest.addEventListener("load", function(){
        var productsList = JSON.parse(productsRequest.responseText)
        resolve(productsList)
    })
    productsRequest.open("GET", "products.json")
    productsRequest.send()
})

// Check input of select box
// Load Products into DOM?

function consoleLogJSON () {
    console.log("Ready to load into DOM - Call the function you need to load")
    // console.log(categories)
    // console.log(types)
    // console.log(products)
}


function clearAddCategoryDiv () {
    console.log("clearAddCategoryDiv function called")

    $(".addCategory").empty()
}

function getTypeName(currentProductTypeNumber) {
    switch(currentProductTypeNumber) {
        case 0:
            return types[0].name;
        case 1:
            return types[1].name;
        case 2:
            return types[2].name;
        case 3:
            return types[3].name;
        case 4:
            return types[4].name;
        case 5:
            return types[5].name;
        default:
            console.log("I think there is an error with the type number")
    }
}

function addFireworksCategoryToDOM () {
    console.log("addFireworksCategoryToDOM function called")

    clearAddCategoryDiv()

    // Add Category Name
    $(".addCategory").append(`<div class="row fireworksRow">
                                <div class="col-md-12"><h1 class="fireworksHeader">${categories[0].name}</h1></div>
                              </div>`)

    // Add Products

    for (var key in products) {

        if(products[key].type <= 2){
            var currentTypeName = getTypeName(products[key].type)

            $(".fireworksRow").append(`<div class="product fireworkProduct col-md-3">
                                            <p>Product Name: ${products[key].name}</p>
                                            <p>Type: ${currentTypeName}</p>
                                            <p>Category: ${categories[0].name}</p>
                                        </div>`)
        }
    }
}

function addExplosivesCategoryToDOM () {
    console.log("addExplosivesCategoryToDOM function called")

    clearAddCategoryDiv()

    // Add Category Name
    $(".addCategory").append(`<div class="row explosivesRow">
                                <div class="col-md-12"><h1 class="explosivesHeader">${categories[1].name}</h1></div>
                              </div>`)

    // Add Products

    for (var key in products) {

        var currentTypeName = getTypeName(products[key].type)

        if(products[key].type >= 3){
            $(".explosivesRow").append(`<div class="product explosivesProduct col-md-3">
                                            <p>Product Name: ${products[key].name}</p>
                                            <p>Type: ${currentTypeName}</p>
                                            <p>Category: ${categories[1].name}</p>
                                        </div>`)
        }
    }
}



// Event Listeners

$("#fireworksDropdown").click(addFireworksCategoryToDOM)

$("#explosivesDropdown").click(addExplosivesCategoryToDOM)

/*
Once all data is loaded, you need to display the products in a Bootstrap grid.
Each product must display the string name of its product type, and product category.
Not the integer id value.
*/
