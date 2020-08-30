const D3Component = require('idyll-d3-component');
const d3 = require('d3');
const vega = require('vega'); //you need vega to compile vega-lite
const vegalite = require('vega-lite');


let spec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "description": "A map of the Arc in the UK",
  "width": 550,
  "height": 550,
  "layer":[
    {
      "data": {
        "url": "static/data/UKOutline.json",
        "format": {
          "type": "topojson",
          "feature": "UKOutline"
        }
      },
      "mark": {
        "type": "geoshape",
        "fill": "lightgrey",
        "stroke": "grey"
      }
    },
    {
      "data": {
        "url": "static/data/arcOutline.json",
        "format": {
          "type": "topojson",
          "feature": "arcOutline"
        }
      },
      "mark": {
        "type": "geoshape",
        "fill": "lightblue",
        "stroke": "grey"
      }
    }
  ]
}



function buildView(element, props) {

  //Depending on selection, use one of the defined layers

  //Given current 'selectedArc' (inside the 'props') object,
  //build a Vega view in the DOM element passed
  return new vega.View(vega.parse(vegalite.compile(spec).spec))
    .renderer('svg')
    .initialize(element.node());
};

//component is first initialized on index.idyll as
//Arc selectedArc: selectedArc /]

class Arc extends D3Component {

  //The 'props' argument will be a JS map with a 'selectedArc' property
  //that we can use to check whether 'arc' or 'uk' is selected.
  initialize(root, props) {
    //what's root? it's something bout the position
    this.element = d3.select(root); //this.el - remember where element was mounted
    //call function from above
    //why do we need .run()?
    buildView(this.element, props).run();
  }

//on update we need to build a new view and re-render it
  update(props) {
    buildView(this.element, props).run();
  }
}

module.exports = Arc;
