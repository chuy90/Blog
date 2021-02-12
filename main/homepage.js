function getAlbums() {
       fetch('https://jsonplaceholder.typicode.com/albums')
       .then(response => response.json())
       .then(data => {
              data.forEach(album => {
                     $('.grid').append('<div class=" col-12 col-md-4"> <div class="card text-center album-container"> <div class="card-body"> <h5 class="card-title">'+album.title+'</h5>  <a href="#" class="btn btn-primary">View this album</a> </div> </div> </div>');
              });
       })
}
$(document).ready(function() {
       getAlbums();
});