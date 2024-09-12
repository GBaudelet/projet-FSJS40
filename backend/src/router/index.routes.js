import express from "express";
import user_routes from "./user.routes.js";
import tag_routes from "./tag.routes.js";

const router = express.Router();

// router.get("/api/v1", (req, res) => {
//   const msg = "hello from API";
//   res.json({ msg });
// });

router.use("/user", user_routes);
router.use("/tag", tag_routes);

// Sheet
// router.get("/api/v1/allTag", (req, res) => {
//   const q = "SELECT * FROM `tags`";

//   pool
//     .query(q)
//     .then(([rows]) => {
//       res.status(200).json(rows);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).json({ msg: "Erreur lors de la récupération des tags" });
//     });
// });

// router.post("/api/v1/newSheet", (req, res) => {
//   const { title, description, type, user_id } = req.body;

//   if (!title || !description || !type || !user_id) {
//     return res.status(400).json({ msg: "Données manquantes" });
//   }

//   const q =
//     "INSERT INTO `sheet` (`title`, `description`, `type`, `created_at`, `updated_at`, `user_id`) VALUES (?, ?, ?, NOW(), NOW(), ?)";

//   pool
//     .query(q, [title, description, type, user_id])
//     .then(([result]) => {
//       res
//         .status(201)
//         .json({ msg: "Feuille ajoutée avec succès", id: result.insertId });
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).json({ msg: "Erreur lors de l'ajout de la feuille" });
//     });
// });

// router.delete("/api/v1/delSheet", (req, res) => {
//   const { id } = req.body;

//   if (!id) {
//     return res.status(400).json({ msg: "Sheet manquant" });
//   }

//   const q = "DELETE FROM `sheet` WHERE `id` = ?";

//   pool
//     .query(q, [id])
//     .then(([result]) => {
//       if (result.affectedRows === 0) {
//         return res.status(404).json({ msg: "sheet non trouvé" });
//       }
//       res.status(200).json({ msg: "sheet supprimé avec succès" });
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).json({ msg: "Erreur lors de la suppression du sheet" });
//     });
// });

router.get("*", (req, res) => {
  res.status(404).json({ msg: "page not found" });
});

export default router;
