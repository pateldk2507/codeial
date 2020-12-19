$(function(){

    $comment = $('#content');


    $("#createPost").click(function(){

        var post = {
            content : $comment.val(),
        };

        $.ajax({
        type : 'POST',
        url : '/posts/create',
        data : post,
        success: function(data){
            console.log('success');
            location.reload();
        },
        error:function() {
             console.log("Error");   
        }
    });



    });

   
});