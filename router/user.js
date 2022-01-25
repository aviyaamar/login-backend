const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const userController = require('../controller/userController')

router.get('/users',  (req, res)=>{
   userController.getUsers(req, res)
})

router.get("/users/me", auth, async (req, res) => {
    try{
        res.send(req.user);
    }
   catch (e) {
    res.status(400).send(e.message)
}
})

router.get("/users/:id", (req, res) => {
    userController.getUser(req, res);
})

router.post("/users",  (req, res) => {
 userController.addUser(req, res);
   
})

router.post('/users/login',  (req, res) => {
   userController.userLogin(req, res);
        
})
router.post('/users/logout', auth, async (req, res) => {
    //user logout
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token
        })
        // console.log(req.user)
        await req.user.save();

        res.send()
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.put('/me', auth, async (req, res) => {
    //update user
    await userController.updateUser(req, res);
})

router.delete("/me", auth, async (req, res) => {
     userController.deleteUser(req, res);
})

router.delete("/", (req, res) => {
    userController.deleteUser(req, res);
})

router.get("/users/:id", async (req, res) => {
    userController.getUser(req, res)
})

module.exports = router; 