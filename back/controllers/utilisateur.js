/* Import des modules necessaires */
const Utilisateur = require("../models/Utilisateur")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

/**
 * Création utilisateur
 */
exports.signup = (req, res, next) => {
    const { email, password } = req.body

    //securisation mot de passe
    //let regPassword = regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/) //special/number/capital
    //
    //if (!regPassword.test(password.value)){
    //    return res.status(400).json({ message: 'mot de passe non securisé veuillez mettre un mot de passe de minimun 6 caractére une majuscule une minuscule des chiffres et un caractere  special '})
    //}

    
    // Validation des données reçues
    if(!email || !password){
        return res.status(400).json({ message: 'Bad email or password'})
    }



    // Hashage du mot de passe utilisateur
    bcrypt.hash(req.body.password, parseInt(process.env.BRYPT_SALT_ROUND))
      .then((hash) => {
        const utilisateur = new Utilisateur ({
          email: req.body.email,
          password: hash,
        })

        // Creation de l'utilisateur
        utilisateur.save()
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
};

/**
 * Connexion utilisateur
 */
exports.login = (req, res, next) => {
    const { email, password } = req.body

    // Validation des données reçues
    if(!email || !password){
        return res.status(400).json({ message: 'Bad email or password'})
    }

    // Verification utilisateur existant
    Utilisateur.findOne({ email: req.body.email })
        .then((utilisateur) => {
            if (!utilisateur) {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
            }

            // Verification mot de passe utilisateur
            bcrypt.compare(req.body.password, utilisateur.password)
                .then((valid) => {
                    if (!valid) {
                    return res.status(401).json({ error: "Mot de passe incorrect !" });
                    }

                    // Connection valide
                    res.status(200).json({
                        utilisateurId: utilisateur._id,
                        token: jwt.sign({ utilisateurId: utilisateur._id }, process.env.JWT_SECRET, {
                            expiresIn: process.env.JWT_DURING,
                        }),
                    })
                })
            .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
}

exports.getAllUtilisateur = (req, res) => {
    Utilisateur.findAll()
        .then(utilisateurs => res.json({ data: utilisateurs }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getOneUtilisateur = async (req, res) => {
    let utilisateurId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!utilisateurId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try{
        // Récupération de l'utilisateur et vérification
        let utilisateur = await Utilisateur.findOne({ where: { id: utilisateurId }, attributes: ['id','pseudo','email']})
        if (utilisateur === null) {
            return res.status(404).json({ message: 'This utilisateur does not exist !' })
        }

        return res.json({ data: utilisateur })
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }    
}

exports.createUtilisateur = async (req, res) => {
    const { nom, prenom, pseudo, email, password } = req.body

    // Validation des données reçues
    if (!nom || !prenom || !pseudo || !email || !password) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try{
        // Vérification si l'utilisateur existe déjà
        const utilisateur = await Utilisateur.findOne({ where: { email: email }, raw: true })
        if (utilisateur !== null) {
            return res.status(409).json({ message: `The utilisateur ${nom} already exists !` })
        }

        // Hashage du mot de passe utilisateur
        // let hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
        // req.body.password = hash

        // Céation de l'utilisateur
        let utilisateurc = await Utilisateur.create(req.body)
        return res.json({ message: 'Utilisateur Created', data: utilisateurc })

    }catch(err){
        if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Hash Process Error', error: err})        
    }
}

exports.modifyUtilisateur = async (req, res) => {
    let utilisateurId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!utilisateurId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try{
        // Recherche de l'utilisateur et vérification
        let utilisateur = await Utilisateur.findOne({ where: {id: utilisateurId}, raw: true})
        if(utilisateur === null){
            return res.status(404).json({ message: 'This utilisateur does not exist !'})
        }

        // Mise à jour de l'utilisateur
        await Utilisateur.update(req.body, { where: {id: utilisateurId}})
        return res.json({ message: 'Utilisateur Updated'})
    }catch(err){
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}

exports.deleteUtilisateur =  (req, res) => {
    let utilisateurId = parseInt(req.params.id)

    // Vérification si le champ id est présent et cohérent
    if (!utilisateurId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    // Suppression de l'utilisateur
    Utilisateur.destroy({ where: {id: utilisateurId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}