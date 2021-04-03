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
                $('.comments-container').append(`<div id="comment-element-${comment.id}" class="col-12"> <div class="card text-center album-container"> <div class="card-body"> <h5 class="card-title">Name:
                ${comment.name}
                </h5> <p> Id:
                ${comment.id}
                </p> <p>E-mail:
                ${comment.email}
                </p> <p>
                ${comment.body}
                </p>
                <div class="edit-form" id="edit-form-${comment.id}" style="display:none">
                <div class="row d-flex" >
                <textarea class="col-10" id="edit-text-${comment.id}" rows="3">
                ${comment.body}</textarea>
                <button class="enter-edit col-2" data-id="${comment.id}">Enter</button>
                </div></div>
                <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Edit </button> 
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" >
                <a href="#!" class="dropdown-item edit-comment" data-id="${comment.id}">Edit</a> 
                <a href="#!" type="button" class="dropdown-item delete-comment" 
                data-id="${comment.id}">Delete comment</a>
                </div>  </div>  </div> </div>   </div> `);
            });
        })
}


$(document).on('click', '.post-button', function() {
  var name = $("#add-name").val();
  var email = $("#add-email").val();
  var comment = $("#add-body").val();

  fetch('https://jsonplaceholder.typicode.com/comments', {
    method: 'POST',
    body: JSON.stringify({
      postId: 1,
      name: name,
      email: email,
      body: comment,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));  
});

$(document).on('click', '.edit-comment', function() {
  const txtId = $(this).attr('data-id');
  $(`#edit-form-${txtId}`).css("display","block");

});

$(document).on('click', '.enter-edit', function() {

  const txtId = $(this).attr('data-id');
  var textToEdit = $(`#edit-text-${txtId}`).val();
  
  fetch('https://jsonplaceholder.typicode.com/comments/'+txtId, {
    method: 'PATCH',
    body: JSON.stringify({
      body: textToEdit,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
});


$(document).on('click', '.delete-comment', function() {
  const commentId = $(this).attr('data-id');
  fetch('https://jsonplaceholder.typicode.com/comments/'+commentId, {
    method: 'DELETE',
  })
  .then((response) => response.json())
  .then(() => $(`#comment-element-${commentId}`).remove());
});

$(document).ready(function() {
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




