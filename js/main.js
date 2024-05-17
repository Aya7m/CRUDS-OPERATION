
var productNameInput = document.getElementById('productName');
var productCatagoryInput = document.getElementById('ProductCatag');
var productPriceInput = document.getElementById('productPrice');
var productDisccrapionInput = document.getElementById('productDisc');
var submet = document.getElementById("submet");
var moode = "create";
var tmp;
var productList = [];


if (localStorage.getItem('products')) {
    productList = JSON.parse(localStorage.getItem('products'))
    displayProduct()
}




function addProduct() {

    if (validateProductName() == true && validCatagory() == true && validatePrice() == true && validateDisc() == true) {


        var product = {
            name: productNameInput.value,
            catagory: productCatagoryInput.value,
            price: productPriceInput.value,
            discription: productDisccrapionInput.value,
        }
        if (moode === "create") {
            productList.push(product)
        }
        else {
            productList[tmp] = product;
            submet.innerHTML = "create"
        }

        localStorage.setItem('products', JSON.stringify(productList))
        displayProduct()

        clearInput()





    }
}
function displayProduct() {

    var cartona = '';
    for (var i = 0; i < productList.length; i++) {
        cartona += `
        
        <tr>
        <td>${i}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].catagory}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].discription}</td>
        <td><button onclick="deletProduct(${i})" class="btn btn-danger">delete</button></td>
        <td><button onclick="update(${i})" class="btn btn-warning">update</button></td>
      </tr>
        
        `
    }
    document.getElementById('bodyId').innerHTML = cartona;
}


function deletProduct(index) {
    // console.log(index);
    productList.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(productList))
    displayProduct()
}

function search(value) {
    var cartona = '';

    for (var i = 0; i < productList.length; i++)
        if (productList[i].name.toLowerCase().includes(value.toLowerCase())) {
            productList[i].newName = productList[i].name.toLowerCase().replace(value.toLowerCase(), `<span class="text-danger">${value}</span>`);

            cartona += `
            
            <tr>
            <td>${i}</td>
            <td>${productList[i].newName ? productList[i].newName : productList[i].name}</td>
            <td>${productList[i].catagory}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].discription}</td>
            <td><button onclick="deletProduct(${i})" class="btn btn-danger">delete</button></td>
            <td><button  class="btn btn-warning">update</button></td>
          </tr>
            
            `


        }

    document.getElementById('bodyId').innerHTML = cartona;
}

function clearInput() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCatagoryInput.value = "";
    productDisccrapionInput.value = "";

}

function update(index) {
    // console.log(index);
    productNameInput.value = productList[index].name;
    productCatagoryInput.value = productList[index].catagory;
    productPriceInput.value = productList[index].price;
    productDisccrapionInput.value = productList[index].discription;

    submet.innerHTML = "update"
    moode = "update";
    tmp = index;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}






function validateProductName() {
    var regex = /^[A-Z][a-z]{3,8}$/;
    if (regex.test(productNameInput.value) == true) {

        productNameInput.style.border = 'none';
        document.getElementById('wrongName').classList.add('d-none');
        return true;
    }
    else {
        productNameInput.style.border = '5px solid red'
        document.getElementById('wrongName').classList.remove('d-none');
        return false;
    }
}

function validCatagory() {
    var regex = /^Mobile|mobile|Tv|tv|Labtop|labtop$/;
    if (regex.test(productCatagoryInput.value) == true) {
        productCatagoryInput.style.border = 'none';
        document.getElementById('wrongCatag').classList.add('d-none');
        return true
    }
    else {
        productCatagoryInput.style.border = "5px solid red";
        document.getElementById('wrongCatag').classList.remove('d-none');
        return false
    }
}

function validatePrice() {
    var regex = /^([0-9]{4}|10000)$/;
    if (regex.test(productPriceInput.value) == true) {
        productPriceInput.style.border = 'none';
        document.getElementById('wrongPrice').classList.add('d-none');
        return true
    }
    else {
        productPriceInput.style.border = "5px solid red";
        document.getElementById('wrongPrice').classList.remove('d-none');
        return false
    }

}


function validateDisc() {
    var regex = /^[A-Za-z]{50,}$/;
    if (regex.test(productDisccrapionInput.value) == true) {
        productDisccrapionInput.style.border = 'none';
        document.getElementById('wrongDisc').classList.add('d-none');
        return true
    }
    else {
        productDisccrapionInput.style.border = "5px solid red";
        document.getElementById('wrongDisc').classList.remove('d-none');
        return false
    }

}