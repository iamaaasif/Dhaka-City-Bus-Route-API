const express = require("express");
// const addNewRoute = require("../controllers/busController");
const {
  getAddRoutePage,
  addNewRoute,
  findRoute,
  getViewRoutePage,
  routes,
  getIndexPage,
  AddBus,
  getAddBusPage,
} = require("../controllers/busController");
const router = express.Router();
router.get("/", getIndexPage);
router.get("/add_route", getAddRoutePage);
router.post("/add_route", addNewRoute);
router.get("/view_route", getViewRoutePage);
router.post("/view_route", findRoute);
router.post("/routes", routes);
router.post("/add_bus", AddBus);
router.get("/add_bus", getAddBusPage);
module.exports = router;
