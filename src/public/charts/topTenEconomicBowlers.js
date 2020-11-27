/* eslint-disable object-shorthand */
const topTenEconomicBowlers = async (id) => {
  try{
    const result = await fetch('/api/topTenEconomicBowlers');
    const data = await result.json();

    const year = Object.keys(data);
    const categories = Object.keys(data[year]);

    const economy = categories.map((bowler) => {
      return Number(data[year][bowler].economy);
    });

    const overs = categories.map((bowler) => {
      return Number(data[year][bowler].overs);
    });
    
    const totalRuns = categories.map((bowler) => {
      return Number(data[year][bowler].total_runs);
    });

    // eslint-disable-next-line no-undef
    Highcharts.chart(id, {
      chart: {
        type: 'spline',
      },
      title: {
        text: `Top 10 Economic Bowlers in ${year}`,
      },
      subtitle: {
        text: 'Source: https://www.kaggle.com/manasgarg/ipl',
      },
      xAxis: {
        categories: categories,
      },
      yAxis: {
        title: {
          text: 'Runs / Overs/ Economy',
        },
        labels: {
          // eslint-disable-next-line func-names
          formatter: function () {
            return this.value;
          },
        },
      },
      tooltip: {
        crosshairs: true,
        shared: true,
      },
      plotOptions: {
        spline: {
          marker: {
            radius: 4,
            lineColor: '#666666',
            lineWidth: 1,
          },
        },
      },
      series: [
        {
          name: 'Economy',
          data: economy,
        },
        {
          name: 'Total Runs Conceded',
          data: totalRuns,
        },
        {
          name: 'Overs Bowled',
          data: overs,
        },
      ],
    });
  }catch(err){
      document.write(err);
      console.error(err);
  }
};

topTenEconomicBowlers('top-economic-bowlers');

