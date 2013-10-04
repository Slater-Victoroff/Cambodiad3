var svg = d3.select("body").append("svg")
    .attr("width", 960)
    .attr("height", 1160);

var xScale = d3.scale.linear()
    .domain([100, 115])
    .range([0, 1350]);

var yScale = d3.scale.linear()
    .domain([20,10])
    .range([0,960]);

function cleanString(pureData){
    for (var i=0; i<pureData.length; i++){
        pureData[i][0] = xScale(pureData[i][0]);
        pureData[i][1] = yScale(pureData[i][1]);
    }
    var points = JSON.stringify(pureData).replace(/\]\,\[/g, ' ');
    return points.replace(/\[/g,'').replace(/\]/g,'');
}

d3.json("static/json/cambodia_provinces.json", function(error, data) {
  test = cleanString(data.features[0].geometry.coordinates[0]);
  for (var i=0; i<data.features.length; i++){
    svg.append("polygon")
      .attr('points', cleanString(data.features[i].geometry.coordinates[0]))
      .attr('height', 1160)
      .attr('width', 960)
      .attr('name', data.features[i].properties.Name)
      .attr('class', 'region');
  }
  svg.append("p").attr('id', 'svg-finished');
});
