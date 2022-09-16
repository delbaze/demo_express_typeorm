import express from "express";
import WilderController from "./../controller/Wilder";
const router = express.Router();

router.get("/", async function (req, res) {
  let wilders = await new WilderController().listWilders();
  res.json({ wilders });
});

router.get("/:id", async function (req, res) {
  const { id } = req.params;
  let wilder = await new WilderController().findWilder(id);
  if (wilder) {
    res.json({ wilder, success: true });
  } else {
    res.json({ success: false });
  }
});

router.post("/create", async function (req, res) {
  const { first_name, last_name, age } = req.body;
  try {
    let wilder = await new WilderController().createWilder(
      first_name,
      last_name,
      age
    );
    res.json({ success: true, wilder, message: "Le wilder a été ajouté" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

router.patch("/update/:id", async function (req, res) {
  const { id } = req.params;
  const { first_name, last_name, age } = req.body;
  let wilder = await new WilderController().updateWilder(
    first_name,
    last_name,
    age,
    id
  );
  res.json({ wilder });
});

router.delete("/delete", async function (req, res) {
  const { id } = req.body;
  try {
    let result = await new WilderController().deleteWilder(id);

    if (result.affected === 0) {
      result = { success: false, message: "Le wilder n'existe pas" };
    } else {
      result = { success: true, message: "Wilder supprimé" };
    }
    return res.json(result);
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

router.post("/assignNoteLanguage", async function (req, res) {
  const { wilderId, languageId, note } = req.body;

  let result = await new WilderController().assignNoteLanguage(
    languageId,
    wilderId,
    note
  );
  res.json({ result });
});

export default router;
