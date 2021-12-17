const BusRoute = require("../models/bus_route");

// render add route page
function getAddRoutePage(req, res, next) {
  // res.send("Hello");
  res.render("add");
}
// render index page
function getIndexPage(req, res, next) {
  // res.send("Hello");
  res.render("index");
}

// render add bus page
function getAddBusPage(req, res, next) {
  res.render("add_bus");
}

// render view route page
function getViewRoutePage(req, res, next) {
  res.render("view");
}

// add new route function
async function addNewRoute(req, res, next) {
  try {
    let route = req.body.route_details.split(",").map((item) => item.trim());
    let route_distance = req.body.route_distance
      .split(",")
      .map((item) => item.trim());
    let route_fair = req.body.route_fair.split(",").map((item) => item.trim());
    let buses = req.body.available_bus.split(",").map((item) => item.trim());
    // console.log(buses);

    const newRoute = new BusRoute({
      route_no: req.body.route_no,
      route_details: route,
      route_fair: route_fair,
      route_distance: route_distance,
      available_bus: buses,
    });

    const result = await newRoute.save();

    res.status(200).json({
      message: "data added succesfully.",
    });
  } catch (err) {
    res.status(500).json({
      message: "data added failed.",
      error: err,
    });
  }
}

// find route function , it return json data
async function findRoute(req, res, next) {
  try {
    const route_res = await BusRoute.findOne({ route_no: req.body.route_no });
    // console.log(req.body.route_no);
    // console.log(route_res);
    if (route_res && route_res._id) {
      // console.log("Inside");
      res.status(200).json({
        route_no: route_res.route_no,
        route_details: route_res.route_details,
        route_distance: route_res.route_distance,
        route_fair: route_res.route_fair,
        available_bus: route_res.available_bus,
      });
    } else {
      res.status(500).json({
        message: "Not Found!",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Error!",
    });
  }
}

// receive src and dest from req.body, and log all the available infomation
async function routes(req, res, next) {
  console.log("Inside Route");
  try {
    const route_res = await BusRoute.find({
      route_details: { $all: [(req.body.src, req.body.dest)] },
    });
    // console.log(route_res);
    let src = req.body.src;
    let dest = req.body.dest;
    console.log(`There are ${route_res.length} numbers of available routes\n`);
    for (let i = 0; i < route_res.length; i++) {
      let srcIdx, destIdx;
      console.log(`\n\nRoute No: ${route_res[i].route_no}`);
      for (let j = 0; j < route_res[i].route_details.length; j++) {
        let stopage = route_res[i].route_details[j];
        if (stopage === src) {
          srcIdx = j;
        }
        if (stopage === dest) {
          destIdx = j;
        }
      }

      if (Math.min(srcIdx, destIdx) === srcIdx) {
        console.log(
          `Starting Stopage : ${route_res[i].route_details[srcIdx]}\n Via : `
        );
        for (let x = srcIdx + 1; x < destIdx; x++) {
          console.log(`${route_res[i].route_details[x]} -> `);
        }
        console.log(`Ending Stopage: ${route_res[i].route_details[destIdx]}`);
        console.log(
          `Total Distance : ${
            route_res[i].route_distance[destIdx] -
            route_res[i].route_distance[srcIdx]
          } Km`
        );
        console.log(
          `Total Fair : ${Math.max(
            10,
            route_res[i].route_fair[destIdx] - route_res[i].route_fair[srcIdx]
          )} Taka`
        );
      } else {
        console.log(
          `Starting Stopage : ${route_res[i].route_details[destIdx]}\n Via : `
        );
        for (let x = destIdx - 1; x > srcIdx; x--) {
          console.log(`${route_res[i].route_details[x]} -> `);
        }
        console.log(`Ending Stopage : ${route_res[i].route_details[srcIdx]}`);
        console.log(
          `Total Distance : ${
            route_res[i].route_distance[srcIdx] -
            route_res[i].route_distance[destIdx]
          } Km`
        );
        console.log(
          `Total Fair : ${Math.max(
            10,
            route_res[i].route_fair[srcIdx] - route_res[i].route_fair[destIdx]
          )} Taka`
        );
      }

      if (route_res[i].available_bus.length) {
        console.log(`Available Buses : ${route_res[i].available_bus}`);
      } else {
        console.log("No Bus Found!");
      }

      // console.log(`Source Index: ${srcIdx}, Destination Index: ${destIdx}`);
    }

    res.status(200).json({
      message: "Done",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "error",
    });
  }
}

async function AddBus(req, res, next) {
  try {
    const route_res = await BusRoute.findOne({
      route_no: req.body.route_no,
    });
    let buses = req.body.available_bus.split(",").map((item) => item.trim());
    for (let i = 0; i < buses.length; i++) {
      route_res.available_bus.push(buses[i]);
    }
    // route_res.available_bus.push(req.body.available_bus);
    route_res.save();

    // console.log(route_res);
    // console.log(req.body.available_bus);

    res.status(200).json({
      message: "data added succesfully.",
    });
  } catch (err) {
    res.status(500).json({
      message: "data added failed.",
    });
  }
}

module.exports = {
  addNewRoute,
  getAddRoutePage,
  findRoute,
  getViewRoutePage,
  routes,
  getIndexPage,
  AddBus,
  getAddBusPage,
};
