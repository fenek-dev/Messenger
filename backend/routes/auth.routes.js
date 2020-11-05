const {Router} = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const config = require('config')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Email is wrong').isEmail(),
        check('password', 'Password is wrong')
            .isLength({min: 6, max: 50})
    ],
     async(req, res)=> {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Something goes wrong'
            })
        }

        const { email, password } = req.body

        const candidate = await User.findOne({email})

        if(candidate) {
            return res.status(400).json({message: 'There is same user'})
        }
        
        const hashedPassword = await bcrypt.hash(password, 42)
        const user = new User({email, password: hashedPassword})

        await user.save()

        res.status(201).json({message: 'User has been created'})

        
    } catch (error) {
        res.status(500).json({message: 'Something goes wrong'})
    }
})

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Type correct email').normalizeEmail().isEmail(),
        check('password', 'Type password').exists()
    ], 
    async(req, res)=> {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Something goes wrong'
            })
        }

        const { email, password } = req.body

        const user = await User.findOne({email})

        if(!user) {
            res.status(400).json({message: 'User hasn\'t found '})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(400).json({message: 'Password is wrong'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        res.json({token, userId: user.id})

        
    } catch (error) {
        res.status(500).json({message: 'Something goes wrong'})
    }
})
module.exports = router