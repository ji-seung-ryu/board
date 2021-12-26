function deleteCheck(comment_name, user_name) {
    if (comment_name != user_name) {
        alert('삭제 권한이 없습니다.');
        return false;
    }
    if (confirm('삭제하시겠습니까?')) {
        return true;
    } else {
        return false;
    }
}

function updateCheck(comment_name, user_name, num) {
    if (comment_name != user_name) {
        alert('수정 권한이 없습니다.');
        return false;
    }
    document.getElementById('update'.concat(num)).style.display = 'none';
    document.getElementById('updateText'.concat(num)).style.display = 'inline';
    document.getElementById('updateBtn'.concat(num)).style.display = 'inline';
    return true;
}