
const User = require("../models/user");


//let's keep it same as before
module.exports.profile=function(req,res){

    User.findById(req.params.id,function(err,user){

        res.render('users_profile',{

            title:"Users-Profile",
            profile_user : user
        })
    })

}


module.exports.update = function(req,res){

    if(req.user.id == req.params.id){

        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){

            return res.redirect('back');


        })
    }else{

        return res.status(401).send('unauthorized');
    }
}

//render the sign-up page
module.exports.signup=function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render("user_sign_up",{

          title : "Codeial | Sign Up"
    })

}

//render the sign-in page
module.exports.signIn=function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render("user_sign_in",{

          title : "Codeial | Sign In"
    })

}

//get the sign up data
module.exports.create=function(req,res){

    if(req.body.password != req.body.confirmPassword){
        return res.redirect('back');
    }

    User.findOne({email : req.body.email},function(err, user){

        if(err){console.log("Error while signing up...".err); return;}

        if(!user){

            User.create(req.body,function(err,user){

                if(err){console.log(err,"error in creating user while signing up!!"); return;}

                return res.redirect("/users/sign-in");
                

            })
        }else{
            console.log("hi")
            return res.redirect("back");
        }
    })


}

//Login and create session for the user
module.exports.createSession=function(req,res){

    return res.redirect('/');
    
}


module.exports.destroySession=function(req,res){

    req.logout(function(err){

        if(err){
            return next(err);
        }
        
    });

    return res.redirect('/')
}