import Bible from "../model/Bible.js";
import express from "express";
const app = express();

app.use(express.json());

const getAll = async (req, res) => {
  try {
    const [response] = await Bible.findAll();
    res.json(response);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export { getAll };
