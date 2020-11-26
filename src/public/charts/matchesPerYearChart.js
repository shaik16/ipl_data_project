/* eslint-disable object-shorthand */
const matchesPerYearChart = async (id) => {
  try{
    const result = await fetch('/api/matchesPerYear');
    const data = await result.json();
    const categories = Object.keys(data);
    const values = Object.values(data);
    
    // eslint-disable-next-line no-undef
    Highcharts.chart(id, {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Matches Per Year',
      },
      subtitle: {
        text: 'Source: https://www.kaggle.com/manasgarg/ipl',
      },
      xAxis: {
        categories: categories,
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Matches',
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: 'IPL',
          data: values,
        },
      ],
    });
  }catch(err){
    document.write(err)
    console.error(err);
  }
};

matchesPerYearChart('matches-per-year');