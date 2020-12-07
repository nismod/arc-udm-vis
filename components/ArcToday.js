const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const vega = require('vega'); //you need vega to compile vega-lite
const vegalite = require('vega-lite');


let population = {
  "data": {
    "url": "static/data/arcMsoa.json",
    "format": {
      "type": "topojson",
      "feature": "arcmsoa"
      }
  },
  "transform": [{
    "lookup": "properties.msoa11cd",
    "from": {
      "data": {
        "url": "static/data/Density.csv"
      },
      "key": "msoa",
      "fields": ["PopDensityPerkm2"]
    }
  }],
  "mark": "geoshape",
  "encoding": {
    "color": {
      "field": "PopDensityPerkm2",
      "type": "quantitative",
      "scale": {"scheme": "purpleblue"},
      "legend": {"title": "Density per km2"}
    },
  }
}

let employment = {
  "data": {
    "url": "static/data/arcMsoa.json",
    "format": {
      "type": "topojson",
      "feature": "arcmsoa"
      }
  },
  "transform": [{
    "lookup": "properties.msoa11cd",
    "from": {"data": {"url": "static/data/Density.csv"},
      "key": "msoa",
      "fields": ["EmpDensityPerkm2"]
    }
  }],
  "mark": "geoshape",
  "encoding": {
    "color": {
      "field": "EmpDensityPerkm2",
      "type": "quantitative",
      "scale": {"scheme": "purpleblue"},
      "legend": {"title": "Density per km2"}
    }
  }
}

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
        "stroke": "lightgrey"
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
    "stroke": "lightgrey"
  }
}

let msoa = {
  "data": {
    "url": "static/data/arcMsoa.json",
    "format": {
      "type": "topojson",
      "feature": "arcmsoa"
      }
  },
  "mark": {
    "type": "geoshape",
    "fill": "none",
    "stroke": "lightgrey"
  },
};

let rail = {
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
        "stroke": "grey"
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
        "stroke": "grey",
        //"fill": "orange"
      }
    }
  ]
};


let roads = {
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
    "stroke": "grey"
  }
};



let spec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "description": "A map of the Arc in the UK",
  "width": 550,
  "height": 550,
};

let density = {population: population, employment: employment};
let boundary = {county: county, lad: lad, msoa: msoa};
let transport = {rail: rail, roads: roads};

function buildView(element, props) {
  //Depending on selection, use one of the defined layers
  spec.layer = [
    density[props.selectedDensity],
    boundary[props.selectedBoundaries],
    transport[props.selectedTransport]
  ];
  //Build a Vega view in the DOM element passed
  return new vega.View(vega.parse(vegalite.compile(spec).spec))
    .renderer('svg')
    .initialize(element.node());
};


class ArcToday extends D3Component {

  initialize(root, props) {
    this.element = d3.select(root);
    buildView(this.element, props).run();
  };

 //on update build a new view and re-render it
  update(props) {
    buildView(this.element, props).run();
  };
};

module.exports = ArcToday;
