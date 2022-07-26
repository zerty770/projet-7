/* Import des modules necessaires */
const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")
const utilisateurCtrl = require("../controllers/utilisateur")

/* Routage User */
router.post("/signup", utilisateurCtrl.signup)
router.post("/login", utilisateurCtrl.login)

router.get("/", auth, utilisateurCtrl.getAllUtilisateur)
router.get("/:id", auth, utilisateurCtrl.getOneUtilisateur)
router.post("/", auth, utilisateurCtrl.createUtilisateur)
router.put("/:id", auth, utilisateurCtrl.modifyUtilisateur)
router.delete("/:id", auth, utilisateurCtrl.deleteUtilisateur)

module.exports = router