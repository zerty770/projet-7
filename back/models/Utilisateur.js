/* Import des modules necessaires */
const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")


/* Schema Utilisateur */
const ModelUtilisateur = mongoose.Schema({
  id: {type: Number , primaryKey: true, autoIncrement : true },
  nom:{ type: String , defaultValue:'', allowNull : false},
  prenom:{type: String, defaultValue:'', allowNull : false },
  email: { type: String, required: true, unique: true },
  password: { type: String, is : '/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/', required: true },
  role : {type : String , defaultValue:'' }
})
  // require= defaultRequire
  // = {defaultRequire
  //  minlength: 10,   // <Number>   At least 10 characters long (optional)
  //  uppercase: true, // <Boolean>  Have at least 1 uppercase character
  //  lowercase: true, // <Boolean>  Have at least 1 lowercase character
  //  number: true,    // <Boolean>  Have at least 1 number
  //  nonalpha: true   // <Boolean>  Have at least 1 Nonalpha character
  //  }

/* Verification email unique */
ModelUtilisateur.plugin(uniqueValidator)

module.exports = mongoose.model("Utilisateur", ModelUtilisateur)