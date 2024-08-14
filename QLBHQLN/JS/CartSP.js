
$(document).ready(function () {
    // Hàm xử lý sự kiện click cho nút add-to-cart
    $('.add-to-cart').click(function () {
        var productId = $(this).data('product-id');
        $.ajax({
            url: '/User/XLGioHang',
            type: 'GET',
            data: { productId: productId },
            success: function (result) {
                if (result.success) {
                    alert(result.message);
                    window.location.href = result.redirectUrl;
                } else {
                    alert(result.message);
                }
            },
            error: function (xhr, status, error) {
                alert('Error: ' + error);
            }
        });
    });

    // Hàm xử lý sự kiện click cho nút xóa sản phẩm
    $(document).on('click', '.xoa-cartitem', function () {
        var productId = $(this).data('product-id');
        $.ajax({
            url: '/User/RemoveCartItem',
            type: 'GET',
            data: { productId: productId },
            success: function (result) {
                if (result.success) {
                    alert(result.message);
                    updateCart();
                } else {
                    alert(result.message);
                }
            },
            error: function (xhr, status, error) {
                alert('Error: ' + error);
            }
        });
    });
});
// Gắn sự kiện khi trang được tải lần đầu
document.querySelector('#checkOrder').onclick = () => {
    document.querySelector('.add-pd').style.display = "flex";
}
document.querySelector('.add-close').onclick = () => {
    document.querySelector('.add-pd').style.display = "none";
}