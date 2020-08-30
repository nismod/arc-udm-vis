const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const vega = require('vega'); //you need vega to compile vega-lite
const vegalite = require('vega-lite');



//boundary
let lad = {
  "data": {
    "url": "static/data/arcLad.json",
    "format": {
      "type": "topojson",
      "feature": "ArcLad"
      }
  },
  "mark": {
    "type": "geoshape",
    "fill": "none",
    "stroke": "grey"
  }
}



//Layer for future new or expanded roads
let futureRoads = {
  "data": {
    "url": "static/data/newArcRoads.json",
    "format": {
      "type": "topojson",
      "feature": "networkNew"
      }
  },
  "mark": {
    "type": "geoshape",
    "fill": "transparent",
    "stroke": "teal",
    "strokeWidth": "5"
  }
};

//Layer for future new stations
let futureStations = {
  "data": {
    "url": "static/data/NewArcStations.json",
    "format": {
      "type": "topojson",
      "feature": "NewArcStations"
      }
  },
  "mark": {
    "type": "geoshape",
    "fill": "orange",
    "stroke": "orange",
    "strokeWidth": "5"
  }
};

//Layer for future new settlements
let futureSettlements = {
  "data": {
    "url": "static/data/newArcSettlements.json",
    "format": {
      "type": "topojson",
      "feature": "settlements"
      }
  },
  "mark": {
    "type": "geoshape",
    "fill": "lightblue",
    "stroke": "lightblue",
    "strokeWidth": "5"
  }
};

//All future transport as layerslet today
let allFutureTransport = {
  "layer": [
    {
      "data": {
        "url": "static/data/newArcRoads.json",
        "format": {
          "type": "topojson",
          "feature": "networkNew"
          }
      },
      "mark": {
        "type": "geoshape",
        "fill": "transparent",
        "stroke": "teal",
        "strokeWidth": "5"
      }
    },
    {
      "data": {
        "url": "static/data/NewArcStations.json",
        "format": {
          "type": "topojson",
          "feature": "NewArcStations"
          }
      },
      "mark": {
        "type": "geoshape",
        "fill": "orange",
        "stroke": "orange",
        "strokeWidth": "5"
      }
    },
    {
      "data": {
        "url": "static/data/newArcSettlements.json",
        "format": {
          "type": "topojson",
          "feature": "settlements"
          }
      },
      "mark": {
        "type": "geoshape",
        "fill": "lightblue",
        "stroke": "lightblue",
        "strokeWidth": "5"
      }
    }
  ]
};

//All current transport as layer
let today = {
  "layer": [
    {
      "data": {
        "url": "static/data/arcRail.json",
        "format": {
          "type": "topojson",
          "feature": "railnetwork"
          }
    },
      "mark": {
        "type": "geoshape",
        "fill": "lightgrey",
        "stroke": "white"
      }
    },
    {
      "data": {
        "url": "static/data/arcStations.json",
        "format": {
          "type": "topojson",
          "feature": "ExistingStations"
          }
      },
      "mark": {
        "type": "geoshape",
        "fill": "lightgrey",
        "stroke": "white"
      }
    },
    {
      "data": {
        "url": "static/data/arcRoads.json",
        "format": {
          "type": "topojson",
          "feature": "road"
          }
      },
      "mark": {
        "type": "geoshape",
        "fill": "transparent",
        "stroke": "lightgrey"
      }
    }
  ]
};

let spec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "description": "A map of the Arc in the UK",
  "width": 550,
  "height": 550,
};


//let boundary = {lad: lad};
let future = {allFutureTransport: allFutureTransport, futureRoads: futureRoads, futureStations: futureStations, futureSettlements: futureSettlements};
//let transport = {rail: rail, roads: roads, today:today};

function buildView(element, props) {
  //Depending on selection, use one of the defined layers
  spec.layer = [lad, today, future[props.selectedFutureTransport],];
  //Build a Vega view in the DOM element passed
  return new vega.View(vega.parse(vegalite.compile(spec).spec))
    .renderer('svg')
    .initialize(element.node());
};


class ArcInteractive extends D3Component {

  initialize(root, props) {
    this.element = d3.select(root);
    buildView(this.element, props).run();
  };

 //on update build a new view and re-render it
  update(props) {
    buildView(this.element, props).run();
  };
};

module.exports = ArcInteractive;
