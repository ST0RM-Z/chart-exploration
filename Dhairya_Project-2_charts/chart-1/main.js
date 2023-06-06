function fetchData() {
  d3.csv("data.csv", function (data) {
    plotChart(data);
  });

  function plotChart(data) {
    d3.select("svg")
      .append("g")
      .attr("id", "teamsG")
      .attr("transform", "translate(60,200)")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "overallG")
      
      .attr("transform", function (d, i) {
        return "translate(" + i * 60 + ", 0)";
      });
    var teamG = d3.selectAll("g.overallG");

    teamG
      .insert("image")
      .attr("xlink:href", function (d) {
        return "images/" + "icon" + ".svg";
      })
      .attr("width", "4rem")
      .attr("height", "2rem")
      .attr("x", "-30")
      .attr("y", "-68")
      .attr("r", 0)
      .transition()
      .delay(function (d, i) {
        return i * 1000;
      })
      .duration(100)
      .attr("r", 20)
      .transition()
      .duration(500)
      .attr("r", 20)
      .style("fill", "pink")
      .style("stroke", "black")
      .style("stroke-width", "1px");
    teamG
      .append("text")
      .style("text-anchor", "middle")
      .attr("y", 40)

      .style("font-size", "10px")
      .text(function (d) {
        return d.team;
      });
      teamG
      .append("text")
      .style("text-anchor", "middle")
      .attr("y", 80)

      .style("font-size", "10px")
      .text(function (d) {
        return "Win-"+d.win;
      });
    // teamG
    //   .append("text")
    //   .style("text-anchor", "middle")
    //   .attr("y", 60)
    //   .text(function (d) {
    //     return d.win;
    //   });
    // teamG
    //   .append("text")
    //   // .style("text-anchor", "middle")
    //   .attr("x", 80)

    //   .style("font-size", "10px")
    //   .text(function (d) {
    //     return "Teams";
    //   });

    d3.selectAll("g.overallG")
      .insert("image")
      .attr("xlink:href", function (d) {
        return "images/" + d.team + ".png";
      })
      .attr("width", "45px")
      .attr("height", "14px")
      .attr("x", "-22")
      .attr("y", "-10");

    var dataKeys = d3.keys(data[0]).filter(function (el) {
      return el != "team" && el != "region";
    });
    var filter = d3.values(data[0]).filter(function (el) {
      return el;
    });
  

    // d3.select("#controls")
    //   .selectAll("button.teams")
    //   .data(dataKeys)
    //   .enter()
    //   .append("button")
    //   .on("click", buttonClick)
    //   .html(function (d) {
    //     return d;
    //   });

    // function buttonClick(mouseOverSelected) {
    //   d3.select("#controls")
    //     .select("button.teams")
    //     .style("height", function (e) {
    //       if (e.win === mouseOverSelected.win) {
    //         return "3rem";
    //       } else {
    //         return "2rem";
    //       }
    //     })
    //     .data(filter)
    //     .enter()
    //     .append("button")
    //     .on("click", buttonClick)
    //     .html(function (d) {
    //       return d;
    //     });
    //   // var maxValue = d3.max(data, function(d) {
    //   //     return parseFloat(d[datapoint]);
    //   // });

    //   // var radiusScale = d3.scale.linear()
    //   //     .domain([0, maxValue])
    //   //     .range([2, 20]);

    //   // d3.selectAll("g.overallG").select("circle").attr("r", function(d) {
    //   //     return radiusScale(d[datapoint]);
    //   // });
    // }

    teamG.on("mouseover", highlightRegion);

    function highlightRegion(mouseOverSelected) {
      d3.selectAll("g.overallG")
        .select("image")
       
        .style("height", function (country) {
          if (country.region === mouseOverSelected.region) {
            return "3rem";
          } else {
            return "2rem";
          }
        });
    }
  }
}
