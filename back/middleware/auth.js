/* Import des modules necessaires */
const jwt = require("jsonwebtoken")

/* Verification authentification */
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const utilisateurId = decodedToken.utilisateurId

    if (req.body.utilisateurId && req.body.utilisateurId !== utilisateurId) {
      throw "Invalid utilisateur ID"
    } else {
      next()
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    })
  }
}