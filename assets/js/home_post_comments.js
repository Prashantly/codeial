class PostComments{

    constructor(postId){
        
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);
        console.log(this.newCommentForm);

        this.createComment(postId);

        let self = this;
        

    }


    createComment(postId){
        let globalSelf = this;

        console.log("****",globalSelf);
        console.log("###",this.newCommentForm);

        this.newCommentForm.submit(function(e){

            let x = e.cancelable;
            console.log("******",x);

            e.preventDefault();
            // let self = this;
            // console.log($(self));
            // console.log($(this));
            
            // $.ajax({

            //     type : 'post',
            //     url : '/comments/create',
            //     data : $(self).serialize(),
            //     success : function(data){

            //         console.log(data);

            //     },error : function(error){
            //         console.log(error.responseText);
            //     }
            // })
        })

    }
}