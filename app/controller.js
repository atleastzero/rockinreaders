const Reader = require('./models/reader');

exports.createReader = (req, res) => {
    const reader = new Reader({
        siteUser : req.user._id,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        age : req.body.age,
        readingLevel : req.body.readingLevel
    });

    reader.save()
        .then(data => {
            res.send(data);
            res.redirect('/profile')
        }).catch(err => {
            res.status(500).send({
                message: "This reader could not be created at this time."
            })
        })
}
