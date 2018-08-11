$('.formAuth .message a').on('click', e => {
    e.preventDefault();
    if($('.login:visible').length > 0) {
        $('.login').css('display','none');
        $('.register').css('display','block');
    } else {
        $('.register').css('display','none');
        $('.login').css('display','block');
    }
});

function response (data) {
    let resp = data.responseText;
    try {
        if (data.message != void (0)) {
            resp = data.message;
        } else {
            resp = JSON.parse(data.responseText);
            resp = resp.message;
        }
    } catch (e) {}
    return resp;
}

$('.formAuth').on('submit', e => {
    e.preventDefault();
    let value = $(e.target).attr('class');
    let selector = '.' + value;
    // console.log($(selector + ' [name=nickname]').val());
    $.ajax({
        url: value === "register" ? '/api/auth/register' : '/api/auth/',
        type: 'POST',
        data: {
            email: $(selector + ' [name=email]').val(),
            password: $(selector + ' [name=password]').val(),
            nickname: $(selector + ' [name=nickname]').val()
        },
        xhrFields: {
            withCredentials: true
        },
        beforeSend: () => {
            $(selector + ' button').prop('disabled', true);
        },
        success: (res) => {
            location.reload();
        },
        error: (res) => {
            console.log(response(res));
        },
        complete: () => {
            $(selector + ' button').prop('disabled', false);
        }
    })
});

$('.saveMessage').on('submit', e => {
    e.preventDefault();
    const postTitle = $(e.target)[0][0].value;

    const postHtml = $('#postTextArea').froalaEditor('html.get', true);

    $.ajax({
        url: '/api/posts',
        type: 'POST',
        data: {
            title: postTitle,
            post: postHtml,
        },
            xhrFields: {
                withCredentials: true
            },
            success: res => {
                console.log(res);
                $('#postTitle').val('');
                $('#postTextArea').froalaEditor('html.set', '');

            },
            error: err => {
                console.error(err);
            },
            complete: () => {
                console.log('request finished');
            }
    });
    
})