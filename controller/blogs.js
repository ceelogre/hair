const express = require('express');
const router = express.Router();
const articles = require("../models/articles");
const CheckAuth = require("../signin/middleware/check-auth");


// Getting all
router.get('/v1/blogs', async (req, res) => {
    
    try {
      const letters = await articles.find()
      res.json(letters)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

 
  // Creating one
router.post('/v1/blogs',CheckAuth,async (req, res) => {
const blog = new articles(req.body)
blog.save(blog)
 .then(data =>{
    res.send(data);
}).catch(err =>{
    res.status(500).send({
        message:err.message || "Same error occurred while creating an article"
    });
});


  })

  

 // Updating One
  router.patch('/v1/blogs/:id',CheckAuth,getArticles, async (req, res) => {
      if (req.body.title != null) {
        res.data.title = req.body.title
      }
      if (req.body.Author != null) {
        res.data.Author = req.body.Author
      }
      if (req.body.date != null) {
          res.data.date = req.body.date
        }
        if (req.body.content != null) {
          res.data.content = req.body.content
        }
      try {
        const updatedArticles = await res.data.save()
        res.json(updatedArticles)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
    })  

   // Deleting One
  router.delete('/v1/blogs/:id',CheckAuth,getArticles,async (req, res) => {
    
      try {
        await res.data.remove()
        res.json({ message: 'Deleted article' })
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
    })
    
 //function to get single data
    async function getArticles(req, res, next) {
      let data
      try {
        data = await articles.findById(req.params.id)
        if (data == null) {
          return res.status(404).json({ message: 'There is no article' })
        }
      } catch (err) {
        return res.status(500).json({ message: err.message })
      }
      res.data = data
      next()
    }
    


  module.exports = router