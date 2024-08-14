let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function () {
    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active")) {
        sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else
        sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
}

const addproduct = document.querySelector('#add-pd');
const addclose = document.querySelector('.add-close');
const editclose = document.querySelector('.edit-close');
// console.log(addproduct)

addproduct.addEventListener("click", function () {
    document.querySelector('.add-pd').style.display = "flex";
})

addclose.addEventListener("click", function () {
    document.querySelector('.add-pd').style.display = "none";
})

var selectedProduct = {};

function editProduct(productId, productName, imagePath, quantity, price, classify) {

    selectedProduct = {
        id: productId,
        name: productName,
        image: imagePath,
        quantity: quantity,
        price: price,
        classify: classify,
    };

    // Hiển thị form edit-pro và điền thông tin sản phẩm được chọn vào form
    document.querySelector('.edit-pd').style.display = "flex";
    document.getElementById("up-pd-id").value = selectedProduct.id;
    document.getElementById("up-pd-name").value = selectedProduct.name;
    document.getElementById("up-image").value = selectedProduct.image;
    document.getElementById("up-pd-quantity").value = selectedProduct.quantity;
    document.getElementById("up-pd-price").value = selectedProduct.price;
    document.getElementById("pd-classify").value = selectedProduct.classify;
}

editclose.addEventListener("click", function () {
    document.querySelector('.edit-pd').style.display = "none";
});

