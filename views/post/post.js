function getPost(id) {
    fetch('https://jsonplaceholder.typicode.com/posts/'+id)
    .then(response => response.json())
    .then(data => { 
        $('.view-posts-container').append('</div><div class="col-12"> <div class="card text-center album-container"> <div class="card-body"> <h5 class="card-title">'+data.title+'</h5> <p>'+data.body+'</p> <a href="../../index.html" class="btn btn-primary button-post"> Back </a> </div> </div> </div>');
        })
}

function getComments(id) {
    fetch('https://jsonplaceholder.typicode.com/comments?postId='+id)
    .then(response => response.json())
    .then(commentData => { 
            commentData.forEach(comment => {
                $('.comments-container').append('<div class="col-12"> <div class="card text-center album-container"> <div class="card-body"> <h5 class="card-title">Name: '+comment.name+'</h5> <p> Id: '+comment.id+'</p> <p>E-mail: '+comment.email+'</p> <p>'+comment.body+'</p> <div class="row editForm"> <input type="text" class="col-8 form-control edit-input"> <button type="submit" value="'+comment.id+'" id="idPost" class="col-4 edit-button btn btn-primary" >Ok</button> </div> <div class="dropdown"> <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Edit </button> <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> <a class="dropdown-item editTitle">Title</a> <a class="dropdown-item editEmail" >Email</a> <a class="dropdown-item editComment" >Comment</a> </div>  </div>  </div> </div>   </div> ');
            });
        })
}

$(document).on('click','.edit-button', function() {
  var identif = document.getElementById('idPost').value;
  console.log(comment[identif]);
  
});

$(document).on('click','.post-button',function() {
  var title = document.getElementById('commentTitle').value;
  var body = document.getElementById('commentBody').value;
  var email = document.getElementById('commentEmail').value;

  fetch('https://jsonplaceholder.typicode.com/comments', {
    method: 'POST',
    body: JSON.stringify({
      postId: 1,
      title: title,
      email: email,
      body: body,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));  
});

$(document).ready(function() {
    $('.editForm').hide();
    const parameters = new URLSearchParams(window.location.search)
    if (parameters.get('id')) {
        const id = parameters.get('id');
        getComments(id);
        getPost(id);
    } 
    else {
        window.location.href = '../../index.html';
    }
});


