{

    //method to submit form data for new post using AJAx
    let createPost = function () {

        let newPostForm = $('#new-post-form');

        newPostForm.submit(function (e) {

            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/addPost',
                //converts post form data into JSON
                data: newPostForm.serialize(),
                success: function (data) {

                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>div').prepend(newPost);
                    deletePost($(".delete-post-button",newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    new Noty({
                        theme : 'relax',
                        text: `${data.message}`,
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                     }).show()

                }, error: function (error) {
                    new Noty({
                        theme : 'relax',
                        text: `error in creating post`,
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                     }).show()
                    console.log(error.responseText)
                }
            })
        })
    }


    //method to create a post in DOM

    let newPostDom = function (post) {

        return $(`<div id="post-${post._id}" style="list-style-type: none;">
                    <p>
                            <small>
                                <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
                            </small>
                                <small>
                                    <i>
                                    ${post.user.name}
                                    </i>
                                </small>
                    </p>
                    <p>
                    ${post.content}
                    </p>
                    <div class="post-comments">
                            <form action="comments/create" method="POST" id="post-${post._id}-comments-form">
                                <input type="text" name="content" placeholder="Add your comment" required>
                                <input type="hidden" name="post" value="${ post._id}">
                                <input type="submit" value="add comment">
                            </form>
                                <div class="post-comment-list">
                                    <ul id="post-comments-${post._id}">
            
                                    </ul>
                                </div>
                            </div>
                </div>`)

    }

    //method to delete post from DOM

    let deletePost = function(deleteLink){

        $(deleteLink).click(function(e){

            e.preventDefault();

            $.ajax({

                type : 'get',
                url : $(deleteLink).prop("href"),
                success : function(data){

                    $(`#post-${data.data.post_id}`).remove();

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

    let convertPostsToAjax = function(){

        $("#posts-list-container>div>div").each(function(){
            
            let self = $(this);

            let deleteButton = $('.delete-post-button',self);
            deletePost(deleteButton);

            // another way to implement
            // $('.delete-post-button',$(this)).each(function(){

            //     deletePost($(this));
            // })

            let PostId = self.prop('id').split('-')[1];
            // console.log(PostId);
            new PostComments(PostId);
        })
    }

    


    createPost();
    convertPostsToAjax();
}