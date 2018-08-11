
$(".post").each(function() {
    const userId = $('.userData')[0].dataset.userId;
    const userPostId = this.dataset.userPostId;
    const deleteButton = this.children[0].children[0].children[0].children[0].children[1];
    const deleteAfter = deleteButton.dataset.deleteAfter;
    if(userId === userPostId && (deleteAfter > Date.now())){
        deleteButton.style.display = 'block';
    }
});

// for(item of dataArr){
//     console.log(item.dataset.userPostId);
// }

$('.deleteButton').on('click', function() {
    const postDelete = this.dataset.postDelete;
    
    $.ajax({
        url: `/api/posts/${postDelete}`,
        method: 'DELETE',
        success: res => {
            location.reload();
        },
        error: err => {
            console.error(err);
        }
    });
});