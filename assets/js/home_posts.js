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

                    // console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>div').prepend(newPost);
                    deletePost($(".delete-post-button",newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

                }, error: function (error) {
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
                            <form action="comments/create" method="POST">
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

                },error : function(error){
                    console.log(error.responseText);
                }
            })
        })


    }

    


    createPost();
    // convertPostsToAjax();
}