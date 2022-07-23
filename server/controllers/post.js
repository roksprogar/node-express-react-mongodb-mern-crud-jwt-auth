const Post = require('../models/post')
const slugify = require('slugify')

exports.create = (req, res) => {
    const {title, content, user} = req.body
    const slug = slugify(title, {
        lower: true
    })

    // Validation.
    switch(true) {
        case !title:
        return res.status(400).json({error: 'Title is required!'})
        break
        case !content:
        return res.status(400).json({error: 'Content is required!'})
        break
    }

    // Create post.
    Post.create({title, content, user, slug}, (err, post) => {
        if(err) {
            console.log(err)
            res.status(400).json({error: 'Most likely a duplicate post, please try another title!'})
        }

        res.json(post)
    })
}

exports.list = (req, res) => {
    Post.find({})
    .limit(10)
    .sort({ createdAt: -1 })
    .exec((err, posts) => {
        if(err) console.log(err)
        res.json(posts)
    })
}