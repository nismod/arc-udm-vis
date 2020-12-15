const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const vega = require('vega'); //you need vega to compile vega-lite
const vegalite = require('vega-lite');


//background layer using counties and UA boundary
let county = {
  "data": {
    "url": "static/data/arcCountiesUnitaryAuthorities.json",
    "format": {
      "type": "topojson",
      "feature": "countiesUnitaryAuthorities"
      }
  },
  "layer": [
    {
      "mark": {
        "type": "geoshape",
        "fill":"#f0f9fa",
        "stroke": "grey"
      }
    },
    {
      "mark": "text",
      "encoding": {
        "text": {
          "field": "properties.ctyua19nm",
          "type": "nominal"
        },
        "longitude": {
          "field": "properties.long",
          "type": "quantitative"
        },
        "latitude": {
          "field": "properties.lat",
          "type": "quantitative"
        },
        "size": {
          "value": 12
        },
        "color": {
          "value": "black"
        }
      }
    }
  ]
}

let futureStations = {
  "layer": [
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
        "fill": "teal",
        "fillOpacity": "0.3"
      }
    },
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
        "stroke": "red",
        "strokeWidth": 1,
        "strokeDash": 4
      }
    },
    {
      "data": {
        "url": "static/data/newArcStations.json",
        "format": {
          "type": "topojson",
          "feature": "NewArcStations"
          }
      },
      "mark": {
        "type": "geoshape",
        "fill": "red",
        "stroke": "red"
      }
    }
  ]
};


let futureRoads = {
  "layer": [
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
        "stroke": "teal",
        "strokeWidth": "0.3"
      }
    },
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
        "stroke": "red",
        "strokeWidth": "1"
      }
    }
  ]
};


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
    "fill": "red",
    "stroke": "red",
    "strokeWidth": "30",
    "strokeOpacity": "0.2"
  }
};



let spec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "description": "A future map of the Arc in the UK",
  "width": 550,
  "height": 550
};


let future = {futureStations: futureStations, futureRoads: futureRoads, futureSettlements: futureSettlements};

function buildView(element, props) {
  //Depending on selection, use one of the defined layers
  spec.layer = [county, future[props.selectedFutureTransport],];
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
