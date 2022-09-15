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
  res.json({ wilder });
});

router.post("/create", async function (req, res) {
  const { first_name, last_name, age } = req.body;
  try {
    let wilder = await new WilderController().createWilder(
      first_name,
      last_name,
      age
    );
    res.json({ success: true, wilder });
  } catch (err) {
    res.json({ success: false });
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
  let result = {};
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

export default router;
