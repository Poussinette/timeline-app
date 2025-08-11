document.addEventListener('DOMContentLoaded', () => {
  const svg = d3.select('body')
    .append('svg')
    .attr('width', 800)
    .attr('height', 600);

  d3.json('/data')
    .then(data => {
      // Parse dates
      const parseDate = d3.timeParse('%Y');
      data.forEach(d => {
        d.year = +d.year; // Convert year to number
        d.date = parseDate(d.year.toString());
      });

      // Set up scales
      const xScale = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([50, 750]);

      const yScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([50, 550]);

      // Create timeline elements
      svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.date))
        .attr('cy', (d, i) => yScale(i))
        .attr('r', 5)
        .attr('fill', 'steelblue');

      svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', d => xScale(d.date))
        .attr('y', (d, i) => yScale(i) - 10)
        .text(d => d.event)
        .attr('text-anchor', 'middle');
    })
    .catch(error => {
      console.error('Error loading data:', error);
    });
});
