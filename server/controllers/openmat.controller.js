const OpenMat = require('../models/openmat.model');
const jwt = require('jsonwebtoken');
const SECRET = "NOTSOSECRET"
const User = require('../models/user.model');


module.exports = {
    // CRUD all in one

    // create
    createNewOpenMat: (req, res) => {
        console.log(req.body)
        console.log(req.cookies)
        const user = jwt.verify(req.cookies.userToken, SECRET);
        OpenMat.create({ ...req.body, creator: user })
            // .then(e => res.status(201).json(e))
            .then(openMat => res.status(201).json(openMat))
            .catch(err => {
                console.log('Create Obj error', err);
                res
                    .status(400)
                    .json({ message: 'problem in create obj', errors: err.errors });
            });
    },

     // Read (all)


    findAllOpenMats: (req, res) => {
        let currentDate = new Date();
        currentDate.setHours(0,0,0,0); // reset the time part, to compare only the date part
        
        let query = { date: { $gte: currentDate } };

        if (req.query.address) {
            query.address = new RegExp(req.query.address, 'i'); // 'i' makes it case insensitive
        }

        OpenMat.find(query)
    .populate('creator', 'first last phoneNumber beltColor aboutMe')
    .then(allOpenMats => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedMats = allOpenMats.map(mat => {
            return {
                ...mat._doc,
                date: new Date(mat.date).toLocaleDateString("en-US", options)
            }
        });
        res.json(formattedMats);
    })
    .catch(err => res.json(err));
},


    // Read (one)
    findOneSingleOpenMat: (req, res) => {
        OpenMat.findById(req.params.id)
        .populate('creator', 'first last phoneNumber beltColor aboutMe')
        .then(oneOpenMat => res.json(oneOpenMat))
        .catch(err => res.json(err))
    },

    updateOpenMat: (req, res) => {
        OpenMat.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        .then(updatedOpenMat => res.json(updatedOpenMat))
        .catch(err => res.status(400).json(err))
    },

    // delete
    deleteOpenMat: (req, res) => {
        OpenMat.findByIdAndDelete(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
    },

    // Random
    showRandomOpenMat: (req, res) => {
        OpenMat.aggregate([{ $sample: { size: 1 }}])
        .then(randomOpenMat => res.json(randomOpenMat[0]))
        .catch(err => res.json(err))
    },
    
    findOpenMatsByLocation: (req, res) => {
        const { city, state, zip } = req.query;
      
        let query = {};
      
        if (city) query.city = city;
        if (state) query.state = state;
        if (zip) query.zip = zip;
      
        OpenMat.find(query)
        //   .populate('creator', 'first', 'last')
          .populate('creator', 'first last phoneNumber beltColor aboutMe')
          .then(openMats => res.json(openMats))
          .catch(err => res.json(err));
      }
      
}
