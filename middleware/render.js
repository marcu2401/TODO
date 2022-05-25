module.exports = (objRep, ejsTemplate) => {
    return (req, res, next) => {
        return res.render(ejsTemplate,  res.locals );
    }
}