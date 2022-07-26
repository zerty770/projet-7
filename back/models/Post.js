/* Import des modules necessaires */
const mongoose = require("mongoose")

/* Schema Post */
const ModelPost = mongoose.Schema({
  utilisateurId: { type: String, required: true },
  titre: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  likes: { type: Number, required: true },
  utilisateursLiked: { type: ["String <utilisateurId>"], required: true },
})

module.exports = mongoose.model("Post", ModelPost)