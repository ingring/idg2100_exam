//this controller is an altered vertion of a guide: https://www.youtube.com/watch?v=27KeYk-5vJw 
//We used that guide to understand how a logout controller could work. A lot of changes has been made.

const RefreshToken = require('../models/refreshtoken');

async function handleLogout(req, res){
    // On client, also delete the access token

    const headers = req.rawHeaders
    const jwtCookie = headers.filter(s => s.includes('NTNU'))
    let refreshToken;
    if(jwtCookie) refreshToken = jwtCookie[0].split('=')[1];
    if (!refreshToken) return res.status(204).send(); //No content

    //find the refreshtoken on db
    try {
        const foundToken = await RefreshToken.findOne({ token: refreshToken}); 
        foundToken.token = '';
        // let updated = await foundToken.save();
        let deleted = await RefreshToken.deleteOne({ token: refreshToken})

        if(!foundToken) {
        res.cookie('NTNU_jwt', '',{ httpOnly: true});
       
        return res.status(204).send();
    }

    }
    catch {
        return res.status(204).send();
    }
    

    res.clearCookie('NTNU_jwt', { httpOnly: true, maxAge: 7*24*60*60*1000});
    res.status(200).send();
}

module.exports = handleLogout;