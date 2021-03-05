function getAlbums() {
       fetch('https://jsonplaceholder.typicode.com/albums')
       .then(response => response.json())
       .then(data => {
              data.forEach(album => {
                     $('.albums-container').append('<div class=" col-12 col-md-4"> <div class="card text-center album-container"> <div class="card-body"> <h5 class="card-title">'+album.title+'</h5>  <a href="./views/album/album.html?id='+album.id+'" class="btn btn-primary">View this album</a> </div> </div> </div>');
              });
       })
}

function getPosts() {
       fetch('https://jsonplaceholder.typicode.com/posts')
       .then(response => response.json())
       .then(data => { 
              data.forEach(post => {
                     $('.posts-container').append('</div><div class=" col-12 col-md-4"> <div class="card text-center album-container"> <div class="card-body"> <h5 class="card-title">'+post.title+'</h5> <p>'+post.body+'</p> <a href="./views/post/post.html?id='+post.id+'" class="btn btn-primary button-post"> Read more</a> </div> </div> </div>');
              });
       })
}

$(document).ready(function() {
       getAlbums();
});

let postsClicked = false;

$(document).on('click','.sub-nav button',function() {
       $('.sub-nav button').not(this).removeClass('active');
       $(this).addClass('active'); 
       const buttonType = $(this).attr('data-type');
       if (buttonType === 'posts') {
              $('.albums-container').hide();
              $('.posts-container').show();
              if (!postsClicked) {
                     getPosts();
                     postsClicked = true;
              }
              
              
       } else {
              // albums selected
              $('.albums-container').show();
              $('.posts-container').hide();
       }
});

