const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


// @desc Register new user
// @route Post /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password }  = req.body

    if(!name || !email || !password) {
        res.status(404)
        throw new Error('Please add all fields')
    }

    //Check if user exist
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)//generate salt to hash, use bcrypt
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const user = await User.create({
        name, 
        email, 
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id, 
            name: user.name, 
            emial: user.email,
            token: generateToken(user._id),
        })

    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

    res.json({message: 'Register User'})
})

// @desc Authenticate a user
// @route Post /api/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    
    //check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id, 
            name: user.name, 
            emial: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc Get user data
// @route Get /api/users/me
// @access Private, protect the route
const getMe = asyncHandler(async(req, res) => {
    res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}