// Append a SVG container
const svg = d3
  .select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 600 700")

d3.csv("data/data.csv", (d) => {
  return {
    ...d,
    count: +d.count,
  }
}).then((data) => {
  data.sort((a, b) => b.count - a.count)
  console.log(data)
  createViz(data)
})

function createViz(data) {
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data.map((d) => d.count))])
    .range([0, 450])
  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.technology))
    .range([0, 700])
    .paddingInner(0.2)

  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", (d) => `translate(0, ${yScale(d.technology)})`)

  barAndLabel
    .append("rect")
    .attr("width", (d) => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("x", 100)
    .attr("y", 0)
    .attr("fill", (d) => {
      return d.technology === "D3.js" ? "#b37feb" : "#4096ff"
    })

  barAndLabel
    .append("text")
    .text((d) => d.technology)
    .attr("x", 96)
    .attr("y", 11)
    .attr("text-anchor", "end")
    .style("font-family", "sans-serif")
    .style("font-size", "11px")
  barAndLabel
    .append("text")
    .text((d) => d.count)
    .attr("x", (d) => xScale(d.count) + 104)
    .attr("y", 11)
    .attr("text-anchor", "left")
    .style("font-family", "sans-serif")
    .style("font-size", "9px")
    .style("fill", "#8c8c8c")

  svg
    .append("line")
    .attr("x1", 100)
    .attr("y1", 0)
    .attr("x2", 100)
    .attr("y2", 700)
    .attr("stroke-width", 2)
    .attr("stroke", "black")
}

const label = svg.se
