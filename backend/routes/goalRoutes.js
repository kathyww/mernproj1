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

const { protect } = require('../middleware/authMiddleware')


router.route('/').get(protect, getGoals).post(protect, setGoals)
router.route('/:id').delete(protect, deleteGoals).put(protect, updateGoals)
// router.get('/', getGoals)
// router.post('/', setGoals)

// router.put('/:id', updateGoals)
// router.delete('/:id', deleteGoals)

//finish routes setup


module.exports = router
