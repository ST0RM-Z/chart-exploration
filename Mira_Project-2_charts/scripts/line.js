d3.csv("./data/worldcup.csv", (data) => {
  ShowData(data);
});

function ShowData(data) {
  var svg = d3.select("svg"),
    margin = 600,
    width = svg.attr("width") - margin, //300
    height = svg.attr("height") - margin; //200

  var xScale = d3
      .scaleBand()
      .domain(data.map((v) => v.team))
      .range([0, width]),
    yScale = d3
      .scaleBand()
      .domain(data.map((v) => v.win))
      .range([height, 0]);

  var g = svg
    .append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");

  svg
    .append("text")
    .attr("x", width / 2 + 100)
    .attr("y", 100)
    .attr("text-anchor", "middle")
    .style("font-family", "Helvetica")
    .style("font-size", 20)
    .text("Line Chart");

  svg
    .append("text")
    .attr("x", width / 2 + 100)
    .attr("y", height - 15 + 200)
    .attr("text-anchor", "middle")
    .style("font-family", "Helvetica")
    .style("font-size", 32)
    .text("Teams");

  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(30," + 250 + ")rotate(-90)")
    .style("font-family", "Helvetica")
    .style("font-size", 32)
    .text("Total win matches");

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

  g.append("g").call(d3.axisLeft(yScale));

  svg
    .append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return xScale(d.team);
    })
    .attr("cy", function (d) {
      return yScale(d.win);
    })
    .attr("r", 4)
    .attr("transform", "translate(" + 100 + "," + 100 + ")")
    .style("fill", "#CC0000");

  var line = d3
    .line()
    .x(function (d) {
      return xScale(d.team);
    })
    .y(function (d) {
      return yScale(d.win);
    });
  svg
    .append("path")
    .datum(data)
    .attr("class", "line")
    .attr("transform", "translate(" + 100 + "," + 100 + ")")
    .attr("d", line)
    .style("fill", "none")
    .style("stroke", "#CC0000")
    .style("stroke-width", "1");
}
