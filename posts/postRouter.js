const express = require('express');

const posts = require("./postDb");

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  posts.get()
  .then( post => {
    res.status(200).json(post);
  })
  .catch(err => {
    res.status(500).json({ error: "The post information could not be retrieved."})
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
  const {id} = req.params.id;
  posts.getById(id)
  .then(post => {
    res.status(200).json(post);
  })
  .catch(err => {
    res.status(500).json({ error: "The post could not be found."})
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  const {id} = req.params.id;

  posts.remove(id)
  .then(post => {
    res.status(201).json(post);
  })
  .catch(err => {
    res.status(500).json({ error: "There was a problem deleting the post"})
  })

});

router.put('/:id', (req, res) => {
  // do your magic!
  const {id} = req.params.id;
  const changes = req.body;
  post.update(id, changes)
  .then(change => {
    if(change){
      res.status(201).json(change);
    } else{
      res.status(404).json({ message: "The post could not be found."})
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Error updating post."
    })
  })

});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const {id} = req.params.id;
  if(posts.includes(id)){
    return [req.post] = posts.filter( post => {post.id == id});
  } else if(!posts.includes(id)){
    return res.status(400).json({ message: "Invalid post id."})
  }
  next();
}

module.exports = router;
