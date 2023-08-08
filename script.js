const data = "data.json";
let days = [], amounts = [];
fetch(data)
.then(Response => Response.json())
.then(datas=>{
    datas.forEach(data => {
      const {day, amount} = data;
      days.push(day);
      amounts.push(amount);
    });
    const ctx = document.getElementById('my-chart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: days,
        datasets: [{
          data: amounts,
          backgroundColor : (context)=> {
            if(context.index === 2) return 'hsl(186, 34%, 60%)'
            else return 'hsl(10, 79%, 65%)'
          },
          color : `hsl(28, 10%, 53%)`,
          borderRadius: 5,
          borderSkipped:false,
        }],
      },
      plugins: [ChartDataLabels],
      options: {
        responsive : true,
        hoverBackgroundColor : (context) => {
          if(context.index === 2) return 'hsl(186, 34%, 60%,.7)'
          else return 'hsla(10, 79%, 65%,.7)'
        },
        onHover : (event, chartElement)=>{  
          event.native.target.style.cursor = chartElement[0] ? "pointer" : "";
        },
        plugins: {
          tooltip : {
            enabled : false
          },
          datalabels : {
            anchor: 'end',
            align : 'end',
            backgroundColor : (context) => {
              return context.active ? `hsl(25, 47%, 15%)` : "white"
            },
            color : 'hsl(33, 100%, 98%)',
            font : context => {
              let width = context.chart.width
              
              let size = Math.round(width / 36);
              return {
                size : size,
                weight : "bold"
              }
            },
            borderRadius : 5,
            padding: 3,
            formatter : (value,context) => {
              return context.active ? `$ ${value}` : ""
            }
          },
          legend : {
            display : false,
          },
        },
        scales : {
          y :{
            display: false,
            beginAtZero : true,
            grid: {
              display: false,
            }
          },
          x : {
            ticks: {
              font : context => {
                let width = context.chart.width
                let size = Math.round(width / 36);
                return {
                  size : size,
                }
              },
            },
            border : {
              color : "rgba(0,0,0,0)"
            },
            grid : {
              display: false
            }
          }
        }
      }
    });
  })

