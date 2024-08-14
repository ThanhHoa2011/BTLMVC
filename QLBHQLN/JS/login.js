const loginsec=document.querySelector('.login-section')
const loginlink=document.querySelector('.login-link')
const registerlink=document.querySelector('.register-link')
registerlink.addEventListener('click',()=>{
    loginsec.classList.add('active')
})
loginlink.addEventListener('click',()=>{
    loginsec.classList.remove('active')
})
const signin = (event) => {
    event.preventDefault();

}
$(document).ready(function () {
    $('#tk').submit(function (event) {
        event.preventDefault();
        var email = $('#Email').val();
        var password = $('#Pass').val();
        $.ajax({
            url: '/Login/XLLogin',
            type: 'POST',
            data: {
                email: email,
                password: password
            },
            success: function (result) {
                if (result.success) {
                    window.location.href = result.redirectUrl;
                } else {
                    alert(result.message);
                }
            },
            error: function (xhr, status, error) {
                alert('Đã xảy ra lỗi, vui lòng thử lại.');
            }
        });
    });

    $('#dk').submit(function (event) {
        event.preventDefault();
        var email = $('#Email1').val();
        var password = $('#Pass1').val();
        $.ajax({
            url: '/Login/XLDangKy',
            type: 'POST',
            data: {
                email: email,
                password: password
            },
            success: function (result) {
                if (result.success) {
                    window.location.href = result.redirectUrl;
                } else {
                    alert(result.message);
                }
            },
            error: function (xhr, status, error) {
                alert('Đã xảy ra lỗi, vui lòng thử lại.');
            }
        });
    });
});

