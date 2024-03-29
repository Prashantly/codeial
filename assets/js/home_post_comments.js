class PostComments {

    constructor(postId) {

        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

    }


    createComment(postId) {
        let globalSelf = this;

        this.newCommentForm.submit(function (e) {

            e.preventDefault();
            let self = this;

            $.ajax({

                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function (data) {

                    // console.log(data.data.comment);
                    let newComment = globalSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${globalSelf.postId}`).prepend(newComment);
                    globalSelf.deleteComment($('.delete-comment-button',newComment));

                    new ToggleLike($(" .toggle-like-button",newComment));

                    new Noty({
                        theme : 'relax',
                        text: `${data.message}`,
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                     }).show()

                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        })

    }

    newCommentDom(comment) {

        return $(`
        <li id="comment-${ comment._id}">
    <div class="media m-2 border-bottom">
        <h3 class="profile-pic-holder style="width: 55px; height: 55px; margin: 0px 5px;">
        ${comment.user.avatar ? `<img src="${comment.user.avatar}" alt="image"  style = "width: 100%;height: 100%; border-radius: 50px;">`
        :`<img src="<%= assetPath('images/avatar1.png') %>" style = "width: 100%;height: 100%; border-radius: 50px;" alt="image">`
    }
        </h3>

        <div class="media-body">
            <div class="d-flex flex-row justify-content-between" style="height: 22px; width: 150px;">

                <div class="comment-user-name">
                    <h5 class="mt-0" style = "font-size: medium;text-transform: capitalize;">${comment.user.name}</h5>
                </div>
                <div>
                    
                        <p>
                            <a class="delete-comment-button" href="/comments/destroy/${comment._id }">X</a>
                        </p>
                    
                </div>

            </div>
            <div class="comment-content" style="font-size: small; width: 260px;">
                ${ comment.content}
            </div>
            <small>
            <a class = "toggle-like-button" data-likes ="${comment.likes.length}" href="/likes/toggle/?id=${comment._id}&type=Comment" style="text-decoration: none;">
            ${comment.likes.length} <i class="far fa-thumbs-up"></i>
            </a> 
            </small>

        </div>
    </div>
</li>`)
    }


    //method to delete comment from DOM
    deleteComment(deleteLink){

        $(deleteLink).click(function(e){

            e.preventDefault();

            $.ajax({

                type : 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){

                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme : 'relax',
                        text: `${data.message}`,
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                     }).show()

                },error : function(error){
                    console.log(error.responseText);
                }
            })
        })


    }
}