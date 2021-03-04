function getPhotos(albumId) {
    fetch('https://jsonplaceholder.typicode.com/albums/'+ albumId +'/photos')
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            window.location.href = '../../index.html';
        } else {
            data.forEach(photo => {
                $('.view-albums-container').append('<div class=" col-12"> <div class="card text-center album-container" "> <img class="card-img-top" src="'+photo.url+'" alt="Card image cap"> <div class="card-body"> <h5 class="card-title">'+photo.title+'</h5> <a href="../../index.html" class="btn btn-primary">Go Back</a> </div> </div> </div>');
            })
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