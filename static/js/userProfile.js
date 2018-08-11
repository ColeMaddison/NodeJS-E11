$('.updateUserProfile').click((e) => {
    e.preventDefault();
    const userEmail = $('.userEmail').val();
    const file = document.querySelector('.user-logo');
    const formData = new FormData();

    formData.append('file', file.files[0]);
    formData.append('email', userEmail);

    const customHeaders = new Headers();
    customHeaders.delete('Content-Type');

    fetch('/profile', {
        method: 'POST',
        body: formData,
        headers: customHeaders
    }).then(res => {
        location.reload();
    }).catch(err => {
        console.error(err);
    });
    
});

