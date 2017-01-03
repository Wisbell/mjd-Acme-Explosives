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
    console.log(categories)
    console.log(types)
    console.log(products)
}


function clearAddCategoryDiv () {
    console.log("clearAddCategoryDiv function called")
}

function addFireworksCategoryToDOM () {
    console.log("addFireworksCategoryToDOM function called")

    clearAddCategoryDiv()

    // Add Category Name
    $(".addCategory").append(`<div class="row categoryName">
                                <div class="col-md-12">${categories[0].name}</div>
                              </div>`)

    // Add Types/Products
    for (var i = 0; i < types.length; i++) {

        //var currentType = types[i].category

        if (types[i].category != categories[0].id) {
            break;
        }

        // Add current Type Name
        $(".addCategory").append(`<div class="row typeName">
                                    <div class="col-md-12">${types[i].name}</div>
                                </div>`)

        // Add Products of current type

        for (var key in products) {
            console.log("key", key)
            console.log("object of current key", products[key])
            console.log("current product type number", products[key].type)
            console.log("current type id", types[i].id)

            if (products[key].type != types[i].id) {
                console.log("break")
                break;
            }

            $(".addCategory").append(`<div class="row productName">
                                        <div class="col-md-4">${key.name}</div>
                                    </div>`)
        }

    }
}

function addExplosivesCategoryToDOM () {
    console.log("addExplosivesCategoryToDOM function called")

    clearAddCategoryDiv()
}



// Event Listeners

$("#fireworksDropdown").click(addFireworksCategoryToDOM)

$("#explosivesDropdown").click(addExplosivesCategoryToDOM)

/*
Once all data is loaded, you need to display the products in a Bootstrap grid.
Each product must display the string name of its product type, and product category.
Not the integer id value.
*/
