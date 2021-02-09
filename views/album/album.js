function getPhotos(albumId) {
    fetch('https://jsonplaceholder.typicode.com/photos?albumId=' + albumId)
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            window.location.href = '../../index.html';
        } else {
            data.forEach(photo => {
                $('.grid').append('<div class="col-12 col-md-4 block"> <div class="image-container"> <img src="'+ photo.url +'" alt="image 1"> <div class="text-block"> <p class="upper">'+ photo.title +'</p> <p class="down">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa magnam modi </p> </div> </div> </div>');
         });
        }
    })
}
$(document).ready(function() {
    const parameters = new URLSearchParams(window.location.search)
    if (parameters.get('id')) {
        const id = parameters.get('id');
        getPhotos(id);
    } else {
        window.location.href = '../../index.html';
    }
});