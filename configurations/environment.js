const development = {
    name : 'development',
    asset_path : './assets',
    session_cookie_key : 'something',
    db : 'codeial_dev',
    smtp : {
        service : 'gmail',
        host : "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "prashantyallatti79968@gmail.com", // generated gmail user
          pass: "vmzfwwiqdtxtifoe", // generated gmail password
        },
    },
    
    google_client_id : "613430340252-1ivj8tp4hbof93n08181tbre3625njrc.apps.googleusercontent.com",
    google_client_secret : "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",
    google_callback_url : "http://localhost:8000/users/auth/google/callback",
    jwt_secret : "codeial"
}

const production = {
    name : 'production'
}

module.exports = development;