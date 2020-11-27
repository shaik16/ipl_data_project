const extraRunsConcededPerTeam = async (id) => {
  try {
    const result = await fetch('/api/extraRunsPerTeam');
    const data = await result.json();
    const year = Object.keys(data);
    const series = Object.entries(data[year]);

    // eslint-disable-next-line no-undef
    Highcharts.chart(id, {
      chart: {
        styledMode: true,
      },

      title: {
        text: `Extra Runs Per Team In ${year}`,
      },
      subtitle: {
        text: 'Source: https://www.kaggle.com/manasgarg/ipl',
      },
      tooltip: {
        pointFormat: 'Matches Won: <b>{point.y}</b>',
      },
      series: [
        {
          type: 'pie',
          allowPointSelect: true,
          keys: ['name', 'y', 'selected', 'sliced'],
          data: series,
          showInLegend: true,
        },
      ],
    });
  } catch (err) {
    document.write(err);
    console.error(err);
  }
};

extraRunsConcededPerTeam('extra-runs-per-team');
