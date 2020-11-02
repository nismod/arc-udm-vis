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
      "fields": ["msoa11hclnm","PopDensityPerkm2"]
    }
  }],
  "mark": {
    "type": "geoshape"
  },
  "encoding": {
    "color": {
      "field": "PopDensityPerkm2",
      "type": "quantitative",
      "scale": {"scheme": "Purples"},
      "legend": {"title": "Population Density per km2", "format": "r"}
    },
    "tooltip": [
      {
      "field": "msoa11hclnm",
      "type": "nominal",
      "title": "MSOA"
      },
      {
      "field": "PopDensityPerkm2",
      "type": "quantitative",
      "title": "Population Density"
    },
  ],

  }
}

let employment = {
  "data": {
    "url": "static/data/arcmsoa.json",
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
  "mark": {
    "type": "geoshape"
  },
  "encoding": {
    "color": {
      "field": "EmpDensityPerkm2",
      "type": "quantitative",
      "scale": {"scheme": "Blues"},
      "legend": {"title": "Density per km2", "format": "r"}
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
        "tooltip": true,
        "fill": "none",
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

let lad = {
  "data": {
    "url": "static/data/arcLadCentroids.json",
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

let msoa = {
  "data": {
    "url": "static/data/arcmsoa.json",
    "format": {
      "type": "topojson",
      "feature": "arcmsoa"
      }
  },
  "mark": {
    "type": "geoshape",
    "fill": "none",
    "stroke": "grey"
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
        "fill": "black",
        "stroke": "black"
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
        "fill": "black",
        "stroke": "white"
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
    "stroke": "teal"
  }
};

let all = {
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
        "fill": "black",
        "stroke": "black"
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
        "fill": "black",
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
        "stroke": "teal"
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

let density = {population: population, employment: employment};
let boundary = {county: county, lad: lad, msoa: msoa};
let transport = {rail: rail, roads: roads, all:all};

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
