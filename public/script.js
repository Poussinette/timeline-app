document.addEventListener('DOMContentLoaded', () => {
  const svg = d3.select('#timeline')
    .append('svg')
    .attr('width', 900)
    .attr('height', 600);

  // Create tooltip div
  const tooltip = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('position', 'absolute')
    .style('padding', '15px')
    .style('background', 'rgba(0, 0, 0, 0.9)')
    .style('color', 'white')
    .style('border-radius', '8px')
    .style('pointer-events', 'auto')
    .style('opacity', 0)
    .style('font-size', '13px')
    .style('max-width', '350px')
    .style('z-index', '1000')
    .style('box-shadow', '0 4px 8px rgba(0, 0, 0, 0.3)')
    .style('line-height', '1.4');

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
        .attr('fill', 'steelblue')
        .style('cursor', 'pointer')
        .on('mouseover', function(event, d) {
          // Highlight the circle
          d3.select(this)
            .attr('r', 8)
            .attr('fill', 'orange');

          // Create tooltip content
          let tooltipContent = `<strong>${d.event}</strong><br/>`;
          tooltipContent += `<strong>Year:</strong> ${d.year}<br/>`;
          if (d.notes) {
            tooltipContent += `<strong>Notes:</strong> ${d.notes}<br/>`;
          }
          tooltipContent += '<br/>';
          
          if (d.hadith) {
            tooltipContent += `<strong>📖 Hadith:</strong> <a href="${d.hadith}" target="_blank" style="color: #87CEEB;">View Hadith</a><br/>`;
          }
          
          if (d.quranVerse) {
            tooltipContent += `<strong>📜 Quran Verse:</strong> <a href="${d.quranVerse}" target="_blank" style="color: #98FB98;">View Verse</a><br/>`;
          }
          
          if (d.tafseer) {
            tooltipContent += `<strong>📚 Tafseer:</strong> <a href="${d.tafseer}" target="_blank" style="color: #DDA0DD;">View Tafseer</a>`;
          }

          // Show tooltip
          tooltip.transition()
            .duration(200)
            .style('opacity', .9);
          
          tooltip.html(tooltipContent)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', function(event, d) {
          // Reset circle
          d3.select(this)
            .attr('r', 5)
            .attr('fill', 'steelblue');

          // Hide tooltip
          tooltip.transition()
            .duration(500)
            .style('opacity', 0);
        })
        .on('click', function(event, d) {
          // Optional: You can add click functionality here
          console.log('Clicked on:', d.event);
        });

      svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', d => xScale(d.date))
        .attr('y', (d, i) => yScale(i) - 10)
        .text(d => d.event)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('pointer-events', 'none'); // Prevent text from interfering with hover
    })
    .catch(error => {
      console.error('Error loading data:', error);
    });
});
