const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity');


//iteration 2 - listing celebrities
router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
    .then(celebs => {
      res.render('celebrities/index', { 
        celebs: celebs 
      })
    })
    .catch(err => next(err))
  })
//==================================================================

//iteration 4 - adding celebs
router.get("/celebrities/new", (req, res)=> {
    res.render("celebrities/new")
  })

 
router.post("/celebrities", (req, res) => {
    const { name,occupation,catchPhrase } = req.body;
    Celebrity.create({
        name,
        occupation,
        catchPhrase
    })
    .then(celebrity => {
      console.log(`${celebrity.name} was added to the database`);
      res.redirect(`/celebrities/${celebrity._id}`) 
    })
    .catch(err => {
        console.log("error in adding celebrity ",err)
      res.redirect("celebrities/new")})
    })
//==================================================================
// http://localhost:3000/celebrities/5fb2b6e1cab9a2dbe4df6d5a/edit

  //iteration 6- editing celebs
router.get("/celebrities/edit/:id", (req, res, next) => {
    console.log('connection established')
    const celebId = req.params.id;
    Celebrity.findById(celebId)
        .then(celebrity => {
        res.render("celebrities/edit", { celebrity })
    })
    .catch(err => next(err))
  })

router.post("/celebrities/edit/:id", (req, res) => {
    const celebId = req.params.id;
    const { name,occupation,catchPhrase } = req.body;
    Celebrity.findByIdAndUpdate(celebId, {
        name, occupation, catchPhrase
    })
    .then(( ) => {
      console.log(`${celebrities.name} was edited`);
      res.redirect(`/celebrities/`) 
    })
    .catch(err => {
        console.log("error in editing celebrity ",err)
        res.redirect(`/celebrities/`)
    })
})
//==================================================================


//iteration 5 - deleting celebrities 
router.post("/celebrities/:id/delete", (req, res)=> {
    const celebId = req.params.id;
    console.log(celebId)
    Celebrity.findByIdAndRemove(celebId)
    .then(celebrity => {
        console.log(`${celebrity.name} was removed to the database`);
        res.redirect(`/celebrities`) 
      })
    .catch(err => next(err))
        // res.render("celebrities/")
  })
//==================================================================

//iteration 3- celebrity details
router.get("/celebrities/:id", (req, res, next) => {
    const celebId = req.params.id;
    Celebrity.findById(celebId)
        .then(celebrity => {
        res.render("celebrities/show", { celebrity })
    })
    .catch(err => next(err))
  })
//==================================================================


module.exports = router; 
