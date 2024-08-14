
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let soluong = document.querySelector('.quantity');
let closeform = document.querySelector('.add-close');

function dathang() {
    document.querySelector('.add-pd').style.display = "flex";
}
closeform.addEventListener('click', ()=>{
    document.querySelector('.add-pd').style.display = "none";
})

// Ẩn hiện giỏ hàng
openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})


let products = [];

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
        if (this.status == 200) {
            try {
                products = JSON.parse(this.responseText);
                console.log(products);
                initApp();
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        } else {
            console.error('Ajax request failed with status:', this.status);
        }
    }
};

xhr.open("GET", "@Url.Action('GetSanPham','User')", true);
xhr.send();


let listCards  = [];
function initApp() {
    products.forEach((value) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.ProductImage}">
            <div class="title">${value.ProductName}</div>
            <div class="price">${value.Price.toLocaleString()}</div>
            <button>Thêm Vào Giỏ Hàng</button>`;
        list.appendChild(newDiv);

        newDiv.querySelector('button').addEventListener('click', () => addToCard(value.ProductId));
    });
}

initApp();
let totalPrice = 0;
let count = 0;

// Load sản phẩm vào giỏ hàng
function addToCard(productId) {
    console.log('addToCard called with productId:', productId);
    let selectedProduct = products.find(product => product.ProductId === productId);

    if (!selectedProduct) {
        console.error('Selected product not found in the product list:', productId);
        return;
    }

    let existingCard = listCards.find(card => card.ProductId === productId);

    if (existingCard) {
        // Nếu sản phẩm đã có trong giỏ hàng thì tăng số lượng lên 1
        existingCard.soluong += 1;
    } else {
        // Nếu sản phẩm chưa có trong giỏ hàng thì số lượng bằng 1
        let productCopy = {
            ProductId: parseInt(selectedProduct.ProductId, 10),
            ProductName: selectedProduct.ProductName,
            ProductImage: selectedProduct.ProductImage,
            soluong: 1,
            gia: selectedProduct.gia,
            product:{
                masp:selectedProduct.masp,  // Đảm bảo có thông tin sản phẩm
                tensp: selectedProduct.tensp,
                anh: selectedProduct.anh,
                soluong:1,
                gia: selectedProduct.gia
            } 
            
        };
        listCards.push(productCopy);
    }

    reloadCard();
}

function reloadCard() {
    console.log('listCards:', listCards);

    // Kiểm tra listCard đã có dữ liệu chưa
    if (!listCard) {
        console.error('listCard not found');
        return;
    }

    // Xóa toàn bộ sản phẩm trong giỏ hàng
    listCard.innerHTML = '';

    totalPrice = 0; 
    count = 0; 

    // Hiển thị lại sản phẩm trong giỏ hàng đã cập nhật
    listCards.forEach((value) => {
        let newDiv = document.createElement('li');
        newDiv.innerHTML = `
            <div><img src="${value.anh}"/></div>
            <div>${value.tensp}</div>
            <div>${value.gia.toLocaleString()}</div>
            <div>
                <button data-action="decrement" data-productid="${value.masp}" class="normal">-</button>
                <div class="count">${value.soluong}</div>
                <button data-action="increment" data-productid="${value.masp}" class="normal">+</button>
            </div>
            <div>
                <button data-action="remove" data-productid="${value.masp}" class="delete">Xóa</button>
            </div>`;

        listCard.appendChild(newDiv);

        // Cập nhât tổng giá và số đếm số lượng
        totalPrice += value.product.gia * value.soluong;
        count += value.soluong;
    });

    total.innerText = totalPrice.toLocaleString();
    soluong.innerText = count;

    // Xử lý sự kiện cho các nút '+', '-', 'xóa'
    listCard.addEventListener('click', handleButtonClick);

    // Cập nhật dữ liệu giỏ hàng trong SESSION
    updateCartSession();
}

// Sự kiện của các nút '+', '-', 'xóa'
function handleButtonClick(event) {
    const target = event.target;
    const action = target.dataset.action;
    const productId = parseInt(target.dataset.productid, 10);

    // Kiểm tra xem productId là một số hợp lệ
    if (isNaN(productId)) {
        console.error('Invalid productid:', productId);
        return;
    }
    console.log('Clicked button with productId:', productId);

    // Tìm sản phẩm có id tương ứng trong giỏ hàng để xử lý sự kiện
    const selectedCard = listCards.find(card => card.masp === productId);

    console.log('Selected card:', selectedCard);

    if (!selectedCard || !selectedCard.product) {
        console.error('Selected card not found or does not have product information for productId:', productId);
        console.log('listCards:', listCards);
        return;
    }

    if (action === 'decrement') {
        changeQuantity(productId, Math.max(0, selectedCard.soluong - 1));
    } else if (action === 'increment') {
        changeQuantity(productId, Math.max(0, selectedCard.soluong + 1));
    } else if (action === 'remove') {
        changeQuantity(productId, -1);
    }
}

// Hàm thay đổi sản phẩm trong giỏ hàng
function changeQuantity(productId, quantityChange) {
    let selectedCardIndex = listCards.findIndex(card => card.masp === productId);

    if (selectedCardIndex !== -1) {
        if (quantityChange === -1) {
            listCards.splice(selectedCardIndex, 1); // Nếu số lượng bằng -1: Xóa sản phẩm
        } else {
            listCards[selectedCardIndex].soluong = quantityChange;
            // Cập nhật giá dựa trên số lượng mới và giá của sản phẩm
            listCards[selectedCardIndex].gia = quantityChange * listCards[selectedCardIndex].product.gia;
        }

        // Cập nhật tổng giá và số lượng
        calculateTotal();

        // Load lại giỏ hàng
        reloadCard();
    }
}

// Hàm tính giá theo giá mặc định của sản phẩm
function calculateTotal() {
    // Khởi tạo tổng giá và số đếm số lượng
    totalPrice = 0;
    count = 0;

    // Tính tổng giá và số lượng
    listCards.forEach(card => {
        // Giữ cố định giá và dùng nó để tính tổng giá
        totalPrice += card.gia * card.soluong;
        count += card.soluong;
    });
}
// Hàm cập nhật giỏ hàng cho SESSION
function updateCartSession() {

    var xhrUpdateCart = new XMLHttpRequest();
    xhrUpdateCart.open("POST", "cartsession.php", true);

    xhrUpdateCart.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    var cartData = JSON.stringify(listCards);

    xhrUpdateCart.send(cartData);

    xhrUpdateCart.onreadystatechange = function () {
        if (xhrUpdateCart.readyState == 4 && xhrUpdateCart.status == 200) {
            var response = JSON.parse(xhrUpdateCart.responseText);
            if (response.status === 'success') {
                console.log('Cart updated successfully in the session.');
            } else {
                console.error('Failed to update cart in the session.');
            }
        }
    };
}

function loadCartFromSession() {
    var xhrLoadCart = new XMLHttpRequest();

    xhrLoadCart.onreadystatechange = function () {
        if (xhrLoadCart.readyState == 4 && xhrLoadCart.status == 200) {
            try {
                var cartData = JSON.parse(xhrLoadCart.responseText);

                // Kiểm tra cartData có phải là mảng hay không trước khi gán nó cho listCards
                if (Array.isArray(cartData)) {
                    listCards = cartData;
                    reloadCard();
                } else {
                    console.error('Invalid cart data format:', cartData);
                }
            } catch (error) {
                console.error('Error parsing cart data from SESSION:', error);
            }
        }
    };

    xhrLoadCart.open("GET", "cartsession.php", true);
    xhrLoadCart.send();
}


// Gọi hàm tải dữ liệu khi trang đã tải xong
window.addEventListener('load', function () {
    loadCartFromSession();
});