function getAlbums() {
       fetch('https://jsonplaceholder.typicode.com/albums')
       .then(response => response.json())
       .then(data => {
              data.forEach(album => {
                     $('.grid').append('<div class="col-12 col-md-4 block"> <div class="image-container"> <img src="./img/imgblog.png" alt="image 1"> <div class="text-block"> <p class="upper">'+ album.title +'</p> <p class="down">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa magnam modi </p> </div> </div> </div>');
              });
       })
}
$(document).ready(function() {
       getAlbums();
});