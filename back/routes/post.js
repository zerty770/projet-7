/* Import des modules necessaires */
const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")
const multer = require("../middleware/multer-config")

const postCtrl = require("../controllers/post")

/* Routage Post */
router.get("/", auth, postCtrl.getAllPost)
router.get("/:id", auth, postCtrl.getOnePost)
router.post("/", auth, multer, postCtrl.createPost)
router.put("/:id", auth, multer, postCtrl.modifyPost)
router.delete("/:id", auth, postCtrl.deletePost)
router.post("/:id/like", auth, postCtrl.likeDislikePost)

module.exports = router