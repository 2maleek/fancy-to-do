module.exports = (err, req, res, next) => {
    if(status.name === 'SequelizeValidationError'){

    }else if(err.status === 400){
        res.status(400).json(err)
    }else if(err.status === 401){
        res.status(401).json(err)
    }else if(err.status === 403){
        res.status(403).json(err)
    }else if(err.status === 404){
        res.status(404).json(err)
    }else{
        res.status(500).json({message: "Internal server error"})
    }
}