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

                    new ToggleLike($(" .toggle-like-button",newPost));

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

        let path = "/images/avatar2-952aeb5b63.png";

        return $(`
        <div class="card m-4" id="post-${post._id}" style="list-style-type: none;">

    <div class="card-header">
        <div class="d-flex flex-row justify-content-between">
            <div class="d-flex flex-row profile-info">
                <h3 class="profile-pic-holder" style="width: 55px; height: 55px; margin: 0px 5px;">
                    
                <img src='${post.user.avatar?post.user.avatar:path}' alt="image" style = "width: 100%;height: 100%; border-radius: 50px;">
                
                

                </h3>
                <h4 class="text-capitalize profile-name-holder">
                    ${post.user.name}
                </h4>

            </div>

            
                <div class="dropdown">
                    <a class="dropdown-toggle" role="button" id="dropdownMenuLink-${post.id}"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fas fa-ellipsis-v"></i>
                    </a>

                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink-${post.id}">
                        <li><a class="delete-post-button dropdown-item" href="/posts/destroy/${post.id}">Delete</a>
                        </li>
                    </ul>
                </div>
        </div>
    </div>

    <div class="card-body">
        <p>
            <small>
                ${post.content}
            </small>
            <br>
        </p>
    </div>


    <div class="card-footer text-muted d-flex flex-row">

            <div class="mx-2">
                
                    <a class="toggle-like-button" data-likes="${post.likes.length}" href="/likes/toggle/?id=${post._id}&type=Post">
                        ${post.likes.length} <i class="fas fa-thumbs-up"></i>
                    </a>

            </div>

        <div class="mx-2">
            <button class="btn btn-link btn-block" type="button" data-bs-toggle="collapse"
                data-bs-target="#post-${post._id}-collapse" aria-expanded="false">
                <h4>
                    <i class="fas fa-comment"></i>
                    Comments
                </h4>
            </button>
        </div>
    </div>

        <div id="post-${post._id}-collapse" class="collapse card-footer">
            <div class="card-body">
                <div>
                    
                        <form action="/comments/create" method="POST" id="post-${post._id}-comments-form">
                            <input type="text" name="content" placeholder="Add your comment" required>
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Add">
                        </form>
                    
                </div>

                <div class="post-comment-list">
                    <ul id="post-comments-${post._id}" style="list-style-type: none; padding: 0px;>

                    </ul>
                </div>
            </div>
        </div>
    </div>`)

    }

    console.log(newPostDom);

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

    let assetPath = (filePath) => {

    }

    


    createPost();
    convertPostsToAjax();
}