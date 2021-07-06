const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
      const sauceObject = JSON.parse(req.body.sauce);
      delete sauceObject._id;
      const sauce = new Sauce({
        ...sauceObject,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],       
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
  sauce.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};


exports.modifySauce = (req, res, next) => {
  let sauceObject = {};
  req.file ? (
    // Si la modification contient une image => Utilisation de l'opérateur ternaire comme structure conditionnelle.
    Sauce.findOne({
      _id: req.params.id
    }).then((sauce) => {
      // On supprime l'ancienne image du serveur
      const filename = sauce.imageUrl.split('/images/')[1]
      fs.unlinkSync(`images/${filename}`)
    }),
    sauceObject = {
      // On modifie les données et on ajoute la nouvelle image
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`,
    }
  ) : ( // Opérateur ternaire équivalent à if() {} else {} => condition ? Instruction si vrai : Instruction si faux
    // Si la modification ne contient pas de nouvelle image
    sauceObject = {
      ...req.body
    }
  )
  Sauce.updateOne(
      // On applique les paramètre de sauceObject
      {
        _id: req.params.id
      }, {
        ...sauceObject,
        _id: req.params.id
      }
    )
    .then(() => res.status(200).json({
      message: 'Sauce modifiée !'
    }))
    .catch((error) => res.status(400).json({
      error
    }))
}

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllSauce = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// GESTION DES LIKE DISLIKE

exports.likeDislike = (req, res, next) => {
  // Pour la route READ = Ajout/suppression d'un like / dislike à une sauce
  // Like présent dans le body
  let like = req.body.like
  // On prend le userID
  let userId = req.body.userId
  // On prend l'id de la sauce
  let sauceId = req.params.id

  if (like === 1) { // Si il s'agit d'un like
    Sauce.updateOne({
        _id: sauceId
      }, {
        // On push l'utilisateur et on incrémente le compteur de 1
        $push: {
          usersLiked: userId
        },
        $inc: {
          likes: +1
        }, // On incrémente de 1
      })
      .then(() => res.status(200).json({
        message: 'j\'aime ajouté !'
      }))
      .catch((error) => res.status(400).json({
        error
      }))
  }
  if (like === -1) {
    Sauce.updateOne( // S'il s'agit d'un dislike
        {
          _id: sauceId
        }, {
          $push: {
            usersDisliked: userId
          },
          $inc: {
            dislikes: +1
          }, // On incrémente de 1
        }
      )
      .then(() => {
        res.status(200).json({
          message: 'Dislike ajouté !'
        })
      })
      .catch((error) => res.status(400).json({
        error
      }))
  }
  if (like === 0) { // Si il s'agit d'annuler un like ou un dislike
    Sauce.findOne({
        _id: sauceId
      })
      .then((sauce) => {
        if (sauce.usersLiked.includes(userId)) { // Si il s'agit d'annuler un like
          Sauce.updateOne({
              _id: sauceId
            }, {
              $pull: {
                usersLiked: userId
              },
              $inc: {
                likes: -1
              }, // On incrémente de -1
            })
            .then(() => res.status(200).json({
              message: 'Like retiré !'
            }))
            .catch((error) => res.status(400).json({
              error
            }))
        }
        if (sauce.usersDisliked.includes(userId)) { // Si il s'agit d'annuler un dislike
          Sauce.updateOne({
              _id: sauceId
            }, {
              $pull: {
                usersDisliked: userId
              },
              $inc: {
                dislikes: -1
              }, // On incrémente de -1
            })
            .then(() => res.status(200).json({
              message: 'Dislike retiré !'
            }))
            .catch((error) => res.status(400).json({
              error
            }))
        }
      })
      .catch((error) => res.status(404).json({
        error
      }))
  }
}