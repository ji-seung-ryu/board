$(function () {
    $('#IDCheck').on('click', function () {
        $.ajax({
            type: 'POST',
            url: '/login',
            dataType: 'json',
            data: { id: $('#id').val(), IDCheck: 1 },
            success: function (result) {
                if (result.result == 0) {
                    $('#IDCheckResult').html('<h1> you can use it! </h1>');
                    $('#IDCheckResultCode').val(1);
                } else $('#IDCheckResult').html('<h1> duplicated id, need to change</h1>');
            }
        });
    });
});

function checkAll() {
    if ($('#id').val() == '' || $('#pw').val() == '') {
        alert('필수입력란이 비었습니다!');
        return false;
    } else if ($('#IDCheckResultCode').val() == '') {
        alert('아이디 중복확인하셔야 합니다.');
        return false;
    } else return true;
}