function getPost(id) {
    fetch('https://jsonplaceholder.typicode.com/posts/'+id)
    .then(response => response.json())
    .then(data => { 
        $('.view-posts-container').append('</div><div class="col-12"> <div class="card text-center album-container"> <div class="card-body"> <h5 class="card-title">'+data.title+'</h5> <p>'+data.body+'</p> <a href="../../index.html" class="btn btn-primary button-post"> Back </a> </div> </div> </div>');
        })
}

function getComment(id) {
    fetch('https://jsonplaceholder.typicode.com/comments?postId='+id)
    .then(response => response.json())
    .then(commentData => { 
            commentData.forEach(comment => {
                $('.comments-container').append('</div><div class="col-12"> <div class="card text-center album-container"> <div class="card-body"> <h5 class="card-title">Name: '+comment.name+'</h5> <p> Id: '+comment.id+'</p> <p>E-mail: '+comment.email+'</p> <p>'+comment.body+'</p> </div> </div> </div>');
            });
        })
}

$(document).ready(function() {
    const parameters = new URLSearchParams(window.location.search)
    if (parameters.get('id')) {
        const id = parameters.get('id');
        const commentId = parameters.get('postId');
        getComment(id);
        getPost(id);
    } 
    else {
        window.location.href = '../../index.html';
    }
});