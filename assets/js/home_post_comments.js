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

        return $(`<li id="comment-${comment._id}">
        <p>
                <small>
                    <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                </small>
                    <small>
                        <i>
                        ${comment.user.name}
                        </i>
                    </small>
                    <br>
                    ${comment.content}
        </p>
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