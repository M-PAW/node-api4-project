const express = require('express');

const users = require("./userDb");

const posts = require('../posts/postDb');

const router = express.Router();

router.post('/',validateUser, (req, res) => {
  // do your magic!
  users.insert(req.body)
    .then( user => {
        res.status(201).json(user)      
    })
    .catch(err => {
      res.status(500).json({error: "The user could not be saved."})
    })

});

// router.post('/:id/posts',validateUserId,validatePost, (req, res) => {
//   // do your magic!
//   const { id } = req.params;
//   const post = req.body;
//   post.user_id = id;
  // console.log(post);

  // posts.insert(post)
  // .then(item => {
  //   res.status(201).json(item)
  // })
  // .catch( err => {
  //   res.status(500).json({error: "Something done broke!"})
  // })
  // posts.insert(post)
  // .then( item => {
  //   res.status(201).json({posting: 'item'});
  // })
  // .catch ( err => {
  //   res.status(500).json({err: 'error'});
  // })
  
// });

router.post('/:id/posts', (req, res) => {
  const post = req.body;
  const { id } = req.params;
  post.user_id = id;
  posts.insert(post)
    .then(resource => res.status(200).json(resource))
    .catch(error =>
      res.status(500).json({ message: 'There was an error adding the post' })
    );
});


router.get('/', (req, res) => {
  // do your magic!
  users.get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "The user information could not be retrieved." })
    })
});

router.get('/:id',validateUserId, (req, res) => {
  // do your magic!
  const {id} = req.params;
  users.getById(id)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(err => {
    res.status(500).json({ error: "The user information could not be retrieved." })
  })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  const {id} = req.params;
  users.getUserPosts(id)
    .then(user => {
      res.status(200).json({user});
    })
    .catch(err => {
      res.status(500).json({ error: "The user information could not be retrieved." })
    })
  
});

router.delete('/:id',validateUserId, (req, res) => {
  // do your magic!
  // const {id} = ;

  users.remove(req.params.id)
  .then(user => {

    res.status(201).json({user, success: "Delete Success!"})
    
  })
  .catch(err => {
    res.status(500).json({ error: "There was a problem deleting the user." })
  })

});

router.put('/:id',validateUserId, (req, res) => {
  // do your magic!
  const {id} = req.params;
  const changes = req.body;
  users.update(id, changes)
  .then(change => {
    // if(change){
    //   console.log(change);
    //   res.status(201).json(change);
    // } else {
    //   res.status(404).json({ message: 'The user could not be found'});
    // }
    res.status(201).json({message: "Put Success!"});
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error updating the list of names'
    })
  })
  
  
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const {id} = req.params;
 
  users.getById(id)
  .then(item => {
    if(item){
      req.user = item
      next ();
    } else {
    res.status(400).json({error: 'Not Valid'})
    }
  })
  .catch(err => {
    res.status(500).json({error: '500 error'})
  })

}

function validateUser(req, res, next) {
  // do your magic!
   if(!req.body){
     res.status(400).json({ message: "Missng user data."});
     
   }

   else if(!req.body.name) {
      req.status(400).json({ message: "Missing required name field."})
   }

  next();
}

function validatePost(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({ message: "Missing post data."});
  } else if(!req.body.text){
    res.status(400).json({ message: "Missing required text field"});
  } else {
  next();
  }
}

module.exports = router;
