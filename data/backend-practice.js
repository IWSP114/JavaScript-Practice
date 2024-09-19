const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    console.log(xhr.response); //send to message
});

xhr.open('GET', 'https://supersimplebackend.dev/products/first'); //get message from network
xhr.send();
