// Load the data here

d3.csv("data/daily_precipitations.csv", d3.autoType).then((data) =>
  drawArc(data)
)

// Draw the arc here
const drawArc = (data) => {
  const pieChartWidth = 300
  const pieChartHeight = 300
  const svg = d3
    .select("#arc")
    .append("svg")
    .attr("viewBox", [0, 0, pieChartWidth, pieChartHeight])

  const innerChart = svg
    .append("g")
    .attr(
      "transform",
      `translate(${pieChartWidth / 2},  ${pieChartHeight / 2})`
    )

  const numberOfDays = data.length
  const numberOfDaysWithPrecipitations = data.filter(
    (d) => d.total_precip_in > 0
  ).length
  const percentageDaysWithPrecipitations = Math.round(
    (numberOfDaysWithPrecipitations / numberOfDays) * 100
  )
  const angleDaysWithPrecipitations_deg =
    (percentageDaysWithPrecipitations * 360) / 100
  const angleDaysWithPrecipitations_rad =
    (angleDaysWithPrecipitations_deg * Math.PI) / 180

  const arcGenerator = d3
    .arc()
    .innerRadius(80)
    .outerRadius(120)
    .padAngle(0.02)
    .cornerRadius(6)

  innerChart.append("path").attr("d", () => {
    return arcGenerator({
      startAngle: 0,
      endAngle: angleDaysWithPrecipitations_rad,
    })
  })
}
