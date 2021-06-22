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
                </p> <p class="body-text-${comment.id}" style="visibility:visible">
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

            var commentCounter = commentData.length;
            $('.comment-badge').append(`${commentCounter}`);
        })
}

// $(document).ready(function(){
//   $(".search-input").on('keyup', function(){
//     var searchBar = $(".search-input").val().toLowerCase();
//     $(".album-container").filter(function(){
//       $(this).toggle($(this).text().toLowerCase().indexOf(searchBar) > -1)
//     });
//   });
// });

$(document).on('click', '.post-button', function() {
  var comment = $("#add-body").val();

  var plusCount = parseInt($('.comment-badge').text(),10);
  var newCount = plusCount + 1;
  $('.comment-badge').text(newCount);

  fetch('https://jsonplaceholder.typicode.com/comments', {
    method: 'POST',
    body: JSON.stringify({
      postId: 1,
      name: 'lorem ipsum',
      email: 'email@net',
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
  $(`#body-text-${txtId}`).css("visibility","hidden");
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
  .then(() => $(`#comment-element-${commentId}`).remove())
  var minusCount = parseInt($('.comment-badge').text(),10);
  var newCount = minusCount - 1;
  $('.comment-badge').text(newCount);
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




