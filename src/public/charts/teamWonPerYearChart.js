/* eslint-disable object-shorthand */
const teamWonMatchesPerYear = async (id) => {
  try {
    const result = await fetch('/api/teamWonPerYear');
    const data = await result.json();
    const categories = Object.keys(data);

    const objArr = categories.map((year) => {
      return data[year];
    });

    const teamNameArray = categories.map((year) => {
      return Object.keys(data[year]).map((teamName) => {
        return teamName;
      });
    });

    const uniqueTeamNamesArray = [...new Set(teamNameArray.flat())];

    const series = uniqueTeamNamesArray.map((team) => {
      const obj = { name: team, data };
      obj['data'] = objArr.map((objElement) => {
        if (objElement[team] !== undefined){
            return objElement[team];
        }
        
        return '';
      });

      return obj;
    });

    // eslint-disable-next-line no-undef
    Highcharts.chart(id, {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Teams Won per year',
      },
      subtitle: {
        text: 'Source: https://www.kaggle.com/manasgarg/ipl',
      },
      xAxis: {
        categories: categories,
      },
      yAxis: {
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
        line: {
          dataLabels: {
            enabled: true,
          },
          enableMouseTracking: false,
        },
      },
      series: series,
    });
  } catch (err) {
    document.write(err);
    console.error(err);
  }
};

teamWonMatchesPerYear('team-won-per-year');
