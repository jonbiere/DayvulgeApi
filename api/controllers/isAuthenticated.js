const isAuthenticated = (req, res) =>{
    if (req.user){
        next();
    }
    else{
        res.status(401).json({error:"Please login to perform request."});
    }  
}

module.exports = isAuthenticated;