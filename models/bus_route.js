const mongoose = require("mongoose");

const routeSchema = mongoose.Schema({
  route_no: {
    type: String,
    required: true,
    unique: true,
  },
  route_details: {
    type: [String],
    required: true,
  },
  route_fair: {
    type: [Number],
    required: true,
  },
  route_distance: {
    type: [Number],
    required: true,
  },
  available_bus: {
    type: [String],
  },
});

const route = mongoose.model("BusRoute", routeSchema);

module.exports = route;
