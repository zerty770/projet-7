/* Import des modules necessaires */
const Post = require("../models/Post")
const fs = require("fs")
const { captureRejections } = require("events")

/**
 * Récupération des posts
 */
exports.getAllPost = (req, res, next) => {
    Post.find()
      .then((posts) => res.status(200).json(posts))
      .catch((error) => res.status(400).json({error: error}))
}

/**
 * Création de post
 */
exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post)

  // Mise en place des datas
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    // Initialisation valeur like-dislike 0
    likes: 0,
    dislikes: 0,
    utilisateursLiked: [],
    utilisateursDisliked: [],
  })

  // Enregistrement en base
  post.save()
    .then(() => res.status(201).json({ message: "Post enregistré !" }))
    .catch((error) => res.status(400).json({ error }))
}

/**
 * Récupération d'un post
 */
exports.getOnePost = (req, res, next) => {
    // Recup post avec id
    Post.findOne({_id: req.params.id})
        .then((post) => {
            res.status(200).json(post)
        })
        .catch((error) => {res.status(404).json({error: error})})
}

/**
 * Modification d'une post
 */
exports.modifyPost = (req, res, next) => {
  
    // Recup post avec id
    Post.findOne({ _id: req.params.id })
    .then((post) => {
        // Enregistrement ancienne imgUrl (si nouvelle image dans modif)
        const oldUrl = post.imageUrl
        // Recuperation du nom de l'image
        const filename = post.imageUrl.split("/images/")[1]

        // Suppression si image, dans le dossier local
        if (req.file) {
            fs.unlink(`images/${filename}`, () => {
            const postObject = {
                ...JSON.parse(req.body.post),
                imageUrl: `${req.protocol}://${req.get("host")}/images/${
                    req.file.filename
                }`
            }
            
            Post.updateOne({ _id: req.params.id },{ ...postObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: "Post mise à jour!" }))
                .catch((error) => res.status(400).json({ error }))
            })
        } else {
            const newItem = req.body
            newItem.imageUrl = oldUrl
            // MAJ de la post avec données modifiées
            Post.updateOne({ _id: req.params.id },{ ...newItem, imageUrl: oldUrl, _id: req.params.id })
                .then(() => res.status(200).json({ message: "Post mise à jour!" }))
                .catch((error) => res.status(400).json({ error }))
        }
    })
    .catch((error) => res.status(500).json({ error }))
};

/**
 * Suppression d'une post
 */
exports.deletePost = (req, res, next) => {
  
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            // Suppression img post
            const filename = post.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                // Suppression post
                Post.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: "Post supprimé !" }))
                .catch((error) => res.status(400).json({ error }))
            })
        })
        .catch((error) => res.status(500).json({ error }))
};



/**
 * Gestion des like des posts
 * Regle likeDislikePost : Like = 1 _ Dislike = -1 _ Pas de vote = 0
 */
// 
exports.likeDislikePost = (req, res, next) => {
  
    let likeDislike = parseInt(req.body.like);
 
    Post.findOne({_id: req.params.id})
        .then((post) => {
        
        if (likeDislike === 1) { // Si post like = 1
            post.likes++
            // sauvegarde utilisateurId 
            post.utilisateursLiked.push(req.body.utilisateurId);
            // MAJ de la post 
            Post.updateOne({ _id: req.params.id },
                {
                    likes: post.likes,
                    utilisateursLiked: post.utilisateursLiked,
                    _id: req.params.id,
                })
                .then(() => res.status(200).json({ message: "Tu likes ce produit !" }))
                .catch((error) => res.status(400).json({ error }));
           
        } else if (likeDislike === -1) {  // Si post dislike = -1
            post.dislikes++
            // sauvegarde utilisateurId 
            post.utilisateursDisliked.push(req.body.utilisateurId)
            // MAJ de la post 
            Post.updateOne({ _id: req.params.id },
                {
                    dislikes: post.dislikes,
                    utilisateursDisliked: post.utilisateursDisliked,
                    _id: req.params.id,
                })
            .then(() => res.status(200).json({ message: "Tu dislikes ce produit !" }))
            .catch((error) => res.status(400).json({ error }));
        
        } else if (likeDislike === 0) { // verification et remise a zero post like et dislike
        
            // si utilisateurId est dans utilisateursLiked = utilisateur like
            if (post.utilisateursLiked.includes(req.body.utilisateurId)){
                post.likes--

                // utilisateurId est retirer du tableau
                const index = post.utilisateursLiked.indexOf(req.body.utilisateurId)
                post.utilisateursLiked.splice(index, 1)
          
                // MAJ de la post 
                Post.updateOne({ _id: req.params.id },
                    {
                        likes: post.likes,
                        utilisateursLiked: post.utilisateursLiked,
                        _id: req.params.id,
                    })
                    .then(() =>res.status(200).json({ message: "Tu ne like plus ce produit !" }))
                    .catch((error) => res.status(400).json({ error }))
            
            // si utilisateurId est dans utilisateursDisliked = utilisateur dislike
            } else if (post.utilisateursDisliked.includes(req.body.utilisateurId)) {
                post.dislikes--

                // utilisateurId est retirer du tableau
                const index = post.utilisateursDisliked.indexOf(req.body.utilisateurId)
                post.utilisateursDisliked.splice(index, 1)
          
                // MAJ de la post 
                Post.updateOne({ _id: req.params.id },
                    {
                        dislikes: post.dislikes,
                        utilisateursDisliked: post.utilisateursDisliked,
                        _id: req.params.id,
                    })
                    .then(() => res.status(200).json({ message: "Tu ne dislike plus ce produit !" }))
                    .catch((error) => res.status(400).json({ error }));
            }
        }
    })
    .catch((error) => {res.status(404).json({error: error})})
}