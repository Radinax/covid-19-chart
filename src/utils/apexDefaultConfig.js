export default function(title, isHorizontal) {
  console.log('ishir', isHorizontal)
  return {
    options: {
      chart: {
        //background: '#f4f4f4',
        // foreColor: '#333'
      },
      xaxis: {
        categories: []
      },
      plotOptions: {
        bar: {
          horizontal: isHorizontal, // if true it would be horizontal
        }
      },
      fill: {
        // colors: ['#f44336']
      },
      dateLabels: {
        enabled: true,
        position: 'top',
        style: {
          fontSize: '40px',
          fontWeight: 'bold',
        }
      },
      title: {
        text: title,
        align: 'center',
        margin: 20,
        offsetY: 20,
        style: {
          fontSize: '25px'
        }
      }
    },
    series: [{
      name: 'Cases',
      data: []
    }]
  }
}
