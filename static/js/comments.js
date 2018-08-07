
$('.postAddComment').on('submit', e => {
    e.preventDefault();
    const commentText = $('.postNewComment').val();
    const commentId = $('.comment').attr('data-postid');

    if(commentText){
        $.ajax({
            url: '/api/posts/addComment',
            type: 'POST',
            data: {
                comment: commentText,
                commentId
            },
            xhrFields: {
                withCredentials: true
            },
            success: (res) => {
                $('.postNewComment').val("");
                $("#commentList").load(location.href + " #commentList", "");
            },
            error: (res) => {
                console.log(response(res));
            }
        })
    }
})