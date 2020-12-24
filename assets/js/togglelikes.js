//create a class to toggle like when a link cliced

class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.ToggleLike();
    }

    ToggleLike(){
        $(this.toggler).click(function(e){
            
            e.preventDefault();
            
            let self = this;

            console.log("Self"+ self);

            $.ajax({
                type : 'POST',
                url : $(self).attr('href'),
            })
            .done(function(response){

                 var res =  JSON.parse(JSON.stringify(response));
                
                
                   let likesCount = parseInt($(self).attr('data-likes'));
                   if(res.deleted == true){
                       likesCount -= 1;

                   }else{
                       likesCount += 1;
                   }

                   $(self).attr('data-likes',likesCount);
                   $(self).html(`${likesCount} Likes`);
            })
            .fail(function(errResponse){
                console.log("Error in completing the request" + errResponse);
            })
        })
    }


}