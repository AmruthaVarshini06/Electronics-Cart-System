const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");

router.post("/add", cartController.addToCart);

router.get("/", cartController.getCart);

router.delete("/:id", cartController.removeItem);

router.put("/increase/:id", cartController.increaseQty);

router.put("/decrease/:id", cartController.decreaseQty);

router.delete("/clear", cartController.clearCart);

module.exports = router;