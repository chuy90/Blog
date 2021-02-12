function getPhotos(albumId) {
    fetch('https://jsonplaceholder.typicode.com/photos?albumId=' + albumId)
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            window.location.href = '../../index.html';
        } else {
            data.forEach(photo => {
                $('.grid').append('<div class=" col-12 col-md-4"> <div class="card text-center album-container" "> <img class="card-img-top" src="'+photo.url+'" alt="Card image cap"> <div class="card-body"> <h5 class="card-title">'+photo.title+'</h5> <a href="#" class="btn btn-primary">View album</a> </div> </div> </div>');
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