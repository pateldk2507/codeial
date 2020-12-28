
  // method to submit the form data for new post using ajax
  let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
           $.ajax({
                type : 'POST',
                url : '/posts/create',
                data : newPostForm.serialize(),
                success : function(response){
                        console.log(response);
                        let newPost = newPostDOM(response.data);
                        console.log(newPost);
                        // deletePost($(' .delete-post-button',newPost));
                        new ToggleLike($(' .toggle-like-button',newPost));
                        $(`.post`).prepend(newPost);
                },
                error : function(error){
                    console.log("Error:"  + error);
                }
            })
        })
  }


  //crete a new comment

  let createComment = function(){
    var post_id = document.getElementById('PostId').value;
    console.log("Post id" + post_id);
    let newCommentForm = $(`#new-comment-${post_id}`);
    newCommentForm.submit(function(e){
        e.preventDefault();
       $.ajax({
            type : 'POST',
            url : '/comments/create',
            data : newCommentForm.serialize(),
            success : function(response){
                    console.log(response);
                     let newComment = newPostDomComment(response.data);
                    $(`#comment-${post_id}`).prepend(newComment);
            },
            error : function(error){
                console.log("Error:"  + error);
            }
        })
    })
}
  //method to create a post in DOM 

  let newPostDOM = function(post){
      
      return $(`
      <div id="${post.post._id}">
          <div class="card" style="margin: 10px; padding: 10px;">
          <div class="cardbody">
              
          <button onclick="destroyPost(this);" post-id= ${post.post._id} >Delete</button>
              
              <p class="card-text" style="font-size: 20px;"> <b> ${ post.post.content} </b> </p>
              <small style="float: right; margin: 5px;">
                  by ${post.post_user.name}
              </small>
              <small>
              <a href="/likes/toggle/?id=${post.post._id}&type=Post" class="toggle-like-button" data-likes="0">
                                   Likes
                </a>
              </small>
          </div>
      
      
    
                  <form action="/comments/create" method="POST">
                      <div class="row" style="margin-top: 5px;">
                          <div class="col-9" style=" margin-left: 18px; padding: 7px;">
                              <input type="text" name="content"  class="form-control" placeholder="Enter your comment...">
                          </div>
                           <div class="col" style=" padding: 7px;">
                              <input type="hidden" name="post" id="PostId" value= ${ post._id} >
                              <input type="submit" id="addComment" value="comment" class="btn btn-primary">
                           </div>   
                      </div>
                  </form>
          
              </div>
          </div>
          </div>  <!--id div-->`)
  }

  let newPostDomComment = function(comment){
      console.log("Comment object: "+comment);
      return $(`

          <div class="row">
              <div class="col-10" >
                  <div class="card" style="padding:5px; margin: 5px;">
                      <h5 class="card-title" style="text-align: left; margin-left: 5px;">
                           <a href="/user/profile/${comment.comment.user}" style=" text-decoration: none;">   ${comment.comment_user.name} </a> 
                      </h5>
                      <h6 class="card-title" style="text-align: left; margin-left: 5px;">
                          ${comment.comment.content}
                      </h6> 
                  </div>
              </div>
              
         
              <div class="col" style="display: flex;">
                  <a href="/comments/destroy/${comment.comment._id}" style=" text-decoration: none;" class="d-flex align-items-center"><i class="fa fa-trash" style="font-size: 30px; margin-right: 5px; text-align: center;" aria-hidden="true"></i></a>
              </div>
              
              
          </div>

          
     `)
  }

  let deletePost = function(deleteLink){

    console.log(deleteLink);
      $(deleteLink).click(function(e){
          e.preventDefault();
          $.ajax({
              type : 'GET',
              url: $(deleteLink).prop('href'),
              success : function(response){
                  console.log("Delete by AJAX");
                    $(`#${response.data.post_id}`).remove();
              },
              error: function(err){
                  console.log(error.responseText);
              }
          })
      })
  }

  let destroyPost = function(ref){
        let post_id  = ref.getAttribute('post-id');
        console.log(post_id);
        $.ajax({
            type : 'GET',
            url: 'posts/destroy/'+post_id,
            success : function(response){
                console.log("Delete by AJAX");
                  $(`#post-${response.data.post_id}`).remove();
            },
            error: function(err){
                console.log(error.responseText);
            }
        })
  }

  createPost();
  createComment();


