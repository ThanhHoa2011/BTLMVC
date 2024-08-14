const addproduct = document.querySelector('#add-pd');
const addclose = document.querySelector('.add-close');
const editclose = document.querySelector('.edit-close');
let closepay = document.querySelector('.pay-close');
// console.log(addproduct)

// Đóng/Mở form Thêm sản phẩm
addproduct.addEventListener("click", function () {
    document.querySelector('.add-pd').style.display = "flex";
})

addclose.addEventListener("click", function () {
    document.querySelector('.add-pd').style.display = "none";
})

// Đóng/Mở và hiển thị thông tin lên form Sủa sản phẩm
var selectedProduct = {};

function editProduct(productId, productName, imagePath, quantity, price, classify, detail) {

    selectedProduct = {
        id: productId,
        name: productName,
        image: imagePath,
        quantity: quantity,
        price: price,
        classify: classify,
        detail: detail
    };

    // Hiển thị form edit-pro và điền thông tin sản phẩm được chọn vào form
    document.querySelector('.edit-pd').style.display = "flex";
    document.getElementById("up-pd-id").value = selectedProduct.id;
    document.getElementById("up-pd-name").value = selectedProduct.name;
    document.getElementById("img-old").value = selectedProduct.image;
    document.getElementById("up-pd-quantity").value = selectedProduct.quantity;
    document.getElementById("up-pd-price").value = selectedProduct.price;
    document.getElementById("up-pd-classify").value = selectedProduct.classify;
    document.getElementById("up-pd-detail").value = selectedProduct.detail;
}

editclose.addEventListener("click", function () {
    document.querySelector('.edit-pd').style.display = "none";
});

// Hiển thị thông tin của Adminitrator
var InformationAdmin = {};

function inforAdmin(email, name, address, sdt) {

    InformationAdmin = {
        email: email,
        name: name,
        address: address,
        sdt: sdt,
    };

    // Hiển thị form edit-pro và điền thông tin sản phẩm được chọn vào form
    document.getElementById("adm-name").value = InformationAdmin.name;
    document.getElementById("adm-email").value = InformationAdmin.email;
    document.getElementById("adm-address").value = InformationAdmin.address;
    document.getElementById("adm-sdt").value = InformationAdmin.sdt;
}

// Hiển thị thông tin
var InformationOrder = {};

function orderInfo(name, address, sdt) {

    InformationOrder = {
        name: name,
        address: address,
        sdt: sdt,
    };

    // 
    document.querySelector('.pay-box').style.display = "flex";
    document.getElementById("info-name").value = InformationAdmin.name;
    document.getElementById("info-address").value = InformationAdmin.address;
    document.getElementById("info-sdt").value = InformationAdmin.sdt;
}

//Đóng form địa chỉ
closepay.addEventListener('click', function () {
    document.querySelector('.pay-box').style.display = "none";
});