let delayData = [];
let timeLabels = [];
let delayChart;

function updateChart() {
  const ctx = document.getElementById("delayChart").getContext("2d");

  // to destroy previously created chart instance
  if (delayChart) {
    delayChart.destroy();
  }

  delayChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: timeLabels,
      datasets: [
        {
          label: "Connection Delay",
          data: delayData,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
          pointRadius: 0,
        },
      ],
    },
    options: {
      animation: {
        duration: 0,
      },
      scales: {
        x: {
          type: "time",
          time: {
            unit: "minute",
            parser: "HH:mm:ss",
            tooltipFormat: "HH:mm:ss",
            stepSize: 60 * 1000,
            displayFormats: {
              minute: "HH:mm",
            },
          },
          position: "bottom",
          grid: {
            display: true,
          },
        },
        y: {
          beginAtZero: true,
          min: 0,
          max: 600,
          grid: {
            display: true,
          },
          ticks: {
            stepSize: 150,
            min: 0,
            max: 600,
            font: {
              size: 12,
            },
            callback: function (value, index, values) {
              return value + " ms";
            },
          },
        },
      },
    },
  });
}

function measureConnectionDelay() {
  const startTime = performance.now();
  fetch("http://localhost:3000/api/data")
    .then((response) => {
      const endTime = performance.now();
      const delay = endTime - startTime;

      delayData.push(delay);

      const currentTime = new Date();
      timeLabels.push(
        currentTime.toLocaleTimeString("en-US", { hour12: false })
      ); 

      updateChart();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

measureConnectionDelay();
setInterval(measureConnectionDelay, 1000);
