const Model = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = "NOTSOSECRET"

const generateToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });
}

const index = (req, res) => {
    res.json({ message: "Hello World" })
}
const registerUser = async (req, res) => {
    try {
        const checkEmail = await Model.findOne({ email: req.body.email })
        if (checkEmail) {
            res.status(400).json({ errors: { email: { message: 'Email in use📸' } } })
        } else {
            const data = new Model(req.body);
            data.confirmP = req.body.confirmP;
            data.confirmE = req.body.confirmE;
            const user = await data.save();

            const payload = { _id: user._id, email: user.email, first: user.first, last:user.last, beltColor:user.beltColor, phoneNumber:user.phoneNumber}
                const token = jwt.sign(payload, SECRET)
                res.cookie('userToken', token, { expires: new Date(Date.now() + 900000) })
                .json({ successMessage: 'userToken: ', user: payload })

            // the rest of your code...
        }
    } catch (err) {
        res.status(400).json(err);
    }
}

const loginUser = async (req, res) => {
    const user = await Model.findOne({ email: req.body.email })
    console.log('logging in:' + user)
    try {
        // if email not in system
        if (!user) {
            res.status(400).json({ errors: 'Invalid email/password' })
            // else check the rest
        } else {
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if (!validPassword) {
                res.status(400).json({ errors: 'Invalid email/password' })
            } else {
                const payload = { _id: user._id, email: user.email, first: user.first, last:user.last, phoneNumber:user.phoneNumber }
                const token = jwt.sign(payload, SECRET)
                res.cookie('userToken', token, { expires: new Date(Date.now() + 900000) })
                .json({ successMessage: 'userToken: ', user: payload })
            }
        }
    } catch (err) {
        res.status(400).json({ errors: 'oops something when wrong in login' })
    }
}

const logout = (req, res) => {
    console.log("logging out");
    res.clearCookie('userToken');
    res.json({ successMessage: 'User logged out' });
}

const getLogged = async (req, res) => {
    try {
        const user = jwt.verify(req.cookies.userToken, SECRET);
        const currentUser = await Model.findOne({ _id: user._id });
        res.json(currentUser);
    } catch (error) {
        res.status(400).json({ errors: 'failed to get logged in user' })
    }
};

const updateOne = async (req, res) => {
    console.log('updateOne:', req.body)
    Model.findOneAndUpdate( {_id: req.body._id}, req.body, { new: true } )
        .then( e => {res.json(e)} )
        .catch( e => res.json(e) )
}
// export
module.exports = { index, registerUser, loginUser, logout, getLogged, updateOne }

