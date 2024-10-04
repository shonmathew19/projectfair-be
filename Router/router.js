//import express
const express = require('express')

//router library is inside express, so import that
const router = new express.Router()
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleWare')

//different paths for resolving requests
router.post('/users/register', userController.register)
// router.get('/users/getuserdetails', userController.getUserDetails)
router.post('/user/login', userController.login)
router.post('/project/addproject',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)
router.get('/project/homeproject',projectController.getHomeProject)
router.get('/project/allProject',jwtMiddleware,projectController.getAllProject)
router.get('/project/userProject',jwtMiddleware,projectController.getUserProject)
router.put('/project/editproject/:id', jwtMiddleware,multerConfig.single('projectImage'),projectController.editUserProject)
router.delete('/project/delete/:id',jwtMiddleware,projectController.deleteUserProject)

//exoport router
module.exports = router
