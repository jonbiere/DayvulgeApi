const isAuthenticated = (req, res) =>{
    if (req.user){
        next();
    }
    else{
        res.status(401).json({message:"Login is required in order to perform request."});
    }  
}

module.exports = isAuthenticated;