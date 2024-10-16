//each resource in the api will have its own route file
//use express route
const express = require('express')
const router = express.Router()
const { 
    getGoals, 
    setGoals, 
    updateGoals, 
    deleteGoals 
} = require('../controllers/goalController')

router.route('/').get(getGoals).post(setGoals)
router.route('/:id').delete(deleteGoals).put(updateGoals)
// router.get('/', getGoals)
// router.post('/', setGoals)

// router.put('/:id', updateGoals)
// router.delete('/:id', deleteGoals)

//finish routes setup


module.exports = router
