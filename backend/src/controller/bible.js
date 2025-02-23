import Bible from "../Model/Bible.js";

const all = async (req, res) => {
  try {
    const [response] = await Bible.all();
    res.json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await Bible.findAll();
    res.json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Rechercher des sheets par nom (title)
const getByTitle = async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res.status(400).json({ msg: "Le paramètre 'title' est requis." });
  }

  try {
    const response = await Bible.findByTitle(title);
    res.json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Rechercher des sheets par tags
const getByTag = async (req, res) => {
  const { tag } = req.query;

  if (!tag) {
    return res.status(400).json({ msg: "Le paramètre 'tag' est requis." });
  }

  try {
    const tagArray = tag.split(",").map((id) => parseInt(id));
    const response = await Bible.findByTag(tagArray);
    res.json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export { all, getAll, getByTitle, getByTag };
