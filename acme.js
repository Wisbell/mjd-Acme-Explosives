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
            products = productsList.products
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
