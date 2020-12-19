{
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
                        let newPost = newPostDOM(response.data.post);
                        console.log(newPost);
                        $('#post').prepend(newPost);
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
      <div id="post">
          <div class="card" style="margin: 10px; padding: 10px;">
          <div class="cardbody">
              
                  <a onclick="this.parentElement.style.display='none'" class="w3-bar-item w3-button w3-white w3-xlarge w3-right" href="/posts/destroy/${post.id}"><i class="fa fa-trash" aria-hidden="true"></i></a>
              
              <p class="card-text" style="font-size: 20px;"> <b> ${ post.content} </b> </p>
              <small style="float: right; margin: 5px;">
                  by ${post.user.name}
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

  createPost();
}