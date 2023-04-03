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
    google_callback_url : "http://codeial.com/users/auth/google/callback",
    jwt_secret : "codeial"
}

const production = {
    name : process.env.CODEIAL_ENVIRONMENT,
    asset_path : process.env.CODEIAL_ASSET_PATH,
    session_cookie_key : process.env.CODEIAL_SESSION_COOKIE_KEY,
    db : process.env.CODEIAL_DB,
    smtp : {
        service : 'gmail',
        host : "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.CODEIAL_GMAIL_USERNAME, // generated gmail user
          pass: process.env.CODEIAL_GMAIL_PASSWORD, // generated gmail password
        },
    },
    
    google_client_id : process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret : process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callback_url : process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret : process.env.CODEIAL_JWT_SECRET
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT));