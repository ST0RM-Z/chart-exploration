d3.csv("./data/worldcup.csv", (data) => ShowData(data));

function ShowData(data) {
  var width = 600;
  var height = 600;
  var radius = 250;
  var svg = d3
    .select("svg")
    .append("g")
    .attr("width", width)
    .attr("height", height);

  var g = svg.attr(
    "transform",
    "translate(" + width / 2 + "," + height / 2 + ")"
  );

  var ordScale = d3
    .scaleOrdinal()
    .domain(data)

    .range([
      "#a81e9a",
      "#173863",
      "#c8a7d9",
      "#d3e0ea",
      "#2b073d",
      "#d4a9d6",
      " #9a12c7",
      "#731c6a",
    ]);

  var pie = d3
    .pie()
    .sort(null)
    .value(function (d) {
      return d.draw;
    });

  var arc = g.selectAll(".arc").data(pie(data)).enter().append("g");

  var path = d3.arc().outerRadius(radius).innerRadius(0);

  var growPath = d3
    .arc()
    .outerRadius(radius + 100)
    .innerRadius(0);

  var g = arc
    .append("path")
    .attr("d", path)
    .attr("class", "arc")
    .attr("fill", function (d) {
      return ordScale(d.data.team);
    })
    .on("mouseover", function () {
      tooltip.style("display", null);
    })

    .on("mousemove", function (d) {
      tooltip.transition().duration(200).style("opacity", 0.9);
      tooltip
        .select("div")
        .html(d.data.team + " <br><strong>" + d.data.draw + "</strong>")
        .style("position", "fixed")
        .style("text-align", "center")
        .style("width", "120px")
        .style("height", "45px")
        .style("padding", "2px")
        .style("font", "12px sans-serif")
        .style("background", "lightsteelblue")
        .style("border", "0px")
        .style("border-radius", "8px")
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 300 + "px");

      d3.select(this.firstChild).transition().attr("d", growPath);
    })
    .on("mouseout", function () {
      tooltip.style("display", "none");
      d3.select(this.firstChild)
        .transition()
        .attr("d", arc)
        .attr("stroke", "none");
    });

  var tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0.5);

  tooltip
    .append("rect")
    .attr("width", 30)
    .attr("height", 20)
    .attr("fill", "#ffffff")
    .style("opacity", 0.5);

  tooltip
    .append("div")
    .attr("x", 15)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "1.5em")
    .attr("font-weight", "bold");

  var label = d3.arc().outerRadius(radius).innerRadius(0);

  arc
    .append("text")
    .attr("transform", function (d) {
      return "translate(" + label.centroid(d) + ")";
    })
    .text(function (d) {
      return d.data.team;
    })
    .style("font-family", "arial")
    .style("font-size", 25);
}
