class PostComments{constructor(e){this.postId=e,this.postContainer=$(`#post-${e}`),this.newCommentForm=$(`#post-${e}-comments-form`),this.createComment(e)}createComment(e){let t=this;this.newCommentForm.submit((function(e){e.preventDefault();$.ajax({type:"post",url:"/comments/create",data:$(this).serialize(),success:function(e){let n=t.newCommentDom(e.data.comment);$(`#post-comments-${t.postId}`).prepend(n),t.deleteComment($(".delete-comment-button",n)),new ToggleLike($(" .toggle-like-button",n)),new Noty({theme:"relax",text:`${e.message}`,type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))}newCommentDom(e){return $(`\n        <li id="comment-${e._id}">\n    <div class="media m-2 border-bottom">\n        <h3 class="profile-pic-holder style="width: 55px; height: 55px; margin: 0px 5px;">\n        ${e.user.avatar?`<img src="${e.user.avatar}" alt="image"  style = "width: 100%;height: 100%; border-radius: 50px;">`:'<img src="<%= assetPath(\'images/avatar1.png\') %>" style = "width: 100%;height: 100%; border-radius: 50px;" alt="image">'}\n        </h3>\n\n        <div class="media-body">\n            <div class="d-flex flex-row justify-content-between" style="height: 22px; width: 150px;">\n\n                <div class="comment-user-name">\n                    <h5 class="mt-0" style = "font-size: medium;text-transform: capitalize;">${e.user.name}</h5>\n                </div>\n                <div>\n                    \n                        <p>\n                            <a class="delete-comment-button" href="/comments/destroy/${e._id}">X</a>\n                        </p>\n                    \n                </div>\n\n            </div>\n            <div class="comment-content" style="font-size: small; width: 260px;">\n                ${e.content}\n            </div>\n            <small>\n            <a class = "toggle-like-button" data-likes ="${e.likes.length}" href="/likes/toggle/?id=${e._id}&type=Comment" style="text-decoration: none;">\n            ${e.likes.length} <i class="far fa-thumbs-up"></i>\n            </a> \n            </small>\n\n        </div>\n    </div>\n</li>`)}deleteComment(e){$(e).click((function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){$(`#comment-${e.data.comment_id}`).remove(),new Noty({theme:"relax",text:`${e.message}`,type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))}}