import { Component, OnInit } from '@angular/core';
import {NgbCalendar, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {AdministratorService} from "../administrator.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  /**
   * Apex chart
   */
  public customersChartOptions: any = {};
  public ordersChartOptions: any = {};
  public growthChartOptions: any = {};
  public revenueChartOptions: any = {};
  public monthlySalesChartOptions: any = {};
  public cloudStorageChartOptions: any = {};
  topBoxes:any = [];

  // colors and font variables for apex chart
  obj = {
    primary        : "#6571ff",
    secondary      : "#7987a1",
    success        : "#05a34a",
    info           : "#66d1d1",
    warning        : "#fbbc06",
    danger         : "#ff3366",
    light          : "#e9ecef",
    dark           : "#060c17",
    muted          : "#7987a1",
    gridBorder     : "rgba(77, 138, 240, .15)",
    bodyColor      : "#b8c3d9",
    cardBg         : "#0c1427",
    fontFamily     : "'Roboto', Helvetica, sans-serif"
  }

  /**
   * NgbDatepicker
   */
  currentDate: NgbDateStruct;

  constructor(private calendar: NgbCalendar, private adminService: AdministratorService) {}

  ngOnInit(): void {
    this.currentDate = this.calendar.getToday();

    this.customersChartOptions = getCustomerseChartOptions(this.obj);
    this.ordersChartOptions = getOrdersChartOptions(this.obj);
    this.growthChartOptions = getGrowthChartOptions(this.obj);
    this.revenueChartOptions = getRevenueChartOptions(this.obj);
    this.monthlySalesChartOptions = getMonthlySalesChartOptions(this.obj);
    this.cloudStorageChartOptions = getCloudStorageChartOptions(this.obj);

    // Some RTL fixes. (feel free to remove if you are using LTR))
    if (document.querySelector('html')?.getAttribute('dir') === 'rtl') {
      this.addRtlOptions();
    }

    this.topBoxes = [
      {title: "Total Users", icon: "users", "show": true},
      {title: "Meetings", icon: "gift", "show": false},
      {title: "Tasks", icon: "users", "show": false},
      {title: "Events", icon: "users", "show": false},
      {title: "Orders", icon: "inbox", "show": true},
      {title: "Invoices", icon: "credit-card", "show": false},
      {title: "Quotes", icon: "file-text", "show": true},
      {title: "Products", icon: "box", "show": true},
      {title: "Stocks", icon: "folder", "show": true},
      {title: "Assets", icon: "database", "show": true},
      {title: "Warehouses", icon: "home", "show": true},
      {title: "Customers", icon: "user-plus", "show": true},
      {title: "Projects", icon: "book", "show": true},
      {title: "Files", icon: "file", "show": true},
      {title: "Sales", icon: "users", "show": false},
      {title: "Sales", icon: "dollar-sign", "show": true},
      {title: "Tickets", icon: "mail", "show": true},
    ];

    this.adminService.dashboardStats().subscribe(
      data => {

        Object.entries(data.data).forEach(([key, value], index) => {
          console.log(`${key}: ${value}}`);
          this.topBoxes[index].numbers = value
          // You can perform any other logic here based on key and value
        });

      }
    );

  }


  /**
   * Only for RTL (feel free to remove if you are using LTR)
   */
  addRtlOptions() {
    // Revenue chart
    this.revenueChartOptions.yaxis.labels.offsetX = -25;
    this.revenueChartOptions.yaxis.title.offsetX = -75;

    //  Monthly sales chart
    this.monthlySalesChartOptions.yaxis.labels.offsetX = -10;
    this.monthlySalesChartOptions.yaxis.title.offsetX = -70;
  }

}


/**
 * Customerse chart options
 */
function getCustomerseChartOptions(obj: any) {
  return {
    series: [{
      name: '',
      data: [3844, 3855, 3841, 3867, 3822, 3843, 3821, 3841, 3856, 3827, 3843]
    }],
    chart: {
      type: "line",
      height: 60,
      sparkline: {
        enabled: !0
      }
    },
    colors: [obj.primary],
    xaxis: {
      type: 'datetime',
      categories: ["Jan 01 2022", "Jan 02 2022", "Jan 03 2022", "Jan 04 2022", "Jan 05 2022", "Jan 06 2022", "Jan 07 2022", "Jan 08 2022", "Jan 09 2022", "Jan 10 2022", "Jan 11 2022",],
    },
    stroke: {
      width: 2,
      curve: "smooth"
    },
    markers: {
      size: 0
    },
  }
};



/**
 * Orders chart options
 */
function getOrdersChartOptions(obj: any) {
  return {
    series: [{
      name: '',
      data: [36, 77, 52, 90, 74, 35, 55, 23, 47, 10, 63]
    }],
    chart: {
      type: "bar",
      height: 60,
      sparkline: {
        enabled: !0
      }
    },
    colors: [obj.primary],
    plotOptions: {
      bar: {
        borderRadius: 2,
        columnWidth: "60%"
      }
    },
    xaxis: {
      type: 'datetime',
      categories: ["Jan 01 2022", "Jan 02 2022", "Jan 03 2022", "Jan 04 2022", "Jan 05 2022", "Jan 06 2022", "Jan 07 2022", "Jan 08 2022", "Jan 09 2022", "Jan 10 2022", "Jan 11 2022",],
    }
  }
};



/**
 * Growth chart options
 */
function getGrowthChartOptions(obj: any) {
  return {
    series: [{
      name: '',
      data: [41, 45, 44, 46, 52, 54, 43, 74, 82, 82, 89]
    }],
    chart: {
      type: "line",
      height: 60,
      sparkline: {
        enabled: !0
      }
    },
    colors: [obj.primary],
    xaxis: {
      type: 'datetime',
      categories: ["Jan 01 2022", "Jan 02 2022", "Jan 03 2022", "Jan 04 2022", "Jan 05 2022", "Jan 06 2022", "Jan 07 2022", "Jan 08 2022", "Jan 09 2022", "Jan 10 2022", "Jan 11 2022",],
    },
    stroke: {
      width: 2,
      curve: "smooth"
    },
    markers: {
      size: 0
    },
  }
};



/**
 * Revenue chart options
 */
function getRevenueChartOptions(obj: any) {
  const apiData = {
    "data": {
      "salesdata": [
        { "x": "2023-11-08", "y": 90 },
        { "x": "2023-11-13", "y": 190 },
        { "x": "2023-11-15", "y": 191 },
        { "x": "2024-01-16", "y": 3800 }
      ]
    }
  };

// Use the API data in your series data
  const seriesData = [{
    name: "Revenue",
    data: apiData.data.salesdata.map(item => ({
      x: new Date(item.x).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      y: item.y
    }))
  }];

  const chartOptions = {
    type: "line",
    height: '400',
    parentHeightOffset: 0,
    foreColor: obj.bodyColor,
    background: obj.cardBg,
    toolbar: {
      show: false
    },
  };

  const chartColors = [obj.primary, obj.danger, obj.warning];

  const gridOptions = {
    padding: {
      bottom: -4,
    },
    borderColor: obj.gridBorder,
    xaxis: {
      lines: {
        show: true
      }
    }
  };

  const xaxisOptions = {
    type: "datetime",
    categories: seriesData[0].data.map(item => item.x),
    lines: {
      show: true
    },
    axisBorder: {
      color: obj.gridBorder,
    },
    axisTicks: {
      color: obj.gridBorder,
    },
    crosshairs: {
      stroke: {
        color: obj.secondary,
      },
    },
  };

  const yaxisOptions = {
    title: {
      text: 'Revenue ( $ )',
      style: {
        size: 9,
        color: obj.muted
      }
    },
    tickAmount: 4,
    tooltip: {
      enabled: true
    },
    crosshairs: {
      stroke: {
        color: obj.secondary,
      },
    },
    labels: {
      offsetX: 0,
    },
  };

  const markersOptions = {
    size: 0,
  };

  const strokeOptions = {
    width: 2,
    curve: "straight",
  };

  const chartConfig = {
    series: seriesData,
    chart: chartOptions,
    colors: chartColors,
    grid: gridOptions,
    xaxis: xaxisOptions,
    yaxis: yaxisOptions,
    markers: markersOptions,
    stroke: strokeOptions,
  };

  return chartConfig;
};



/**
 * Monthly sales chart options
 */
function getMonthlySalesChartOptions(obj: any) {
  return {
    series: [{
      name: 'Sales',
      data: [152,109,93,113,126,161,188,143,102,113,116,124]
    }],
    chart: {
      type: 'bar',
      height: '318',
      parentHeightOffset: 0,
      foreColor: obj.bodyColor,
      background: obj.cardBg,
      toolbar: {
        show: false
      },
    },
    colors: [obj.primary],
    fill: {
      opacity: .9
    } ,
    grid: {
      padding: {
        bottom: -4
      },
      borderColor: obj.gridBorder,
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    xaxis: {
      type: 'datetime',
      categories: ['01/01/2022','02/01/2022','03/01/2022','04/01/2022','05/01/2022','06/01/2022','07/01/2022', '08/01/2022','09/01/2022','10/01/2022', '11/01/2022', '12/01/2022'],
      axisBorder: {
        color: obj.gridBorder,
      },
      axisTicks: {
        color: obj.gridBorder,
      },
    },
    yaxis: {
      title: {
        text: 'Number of Sales',
        style:{
          size: 9,
          color: obj.muted
        }
      },
      labels: {
        offsetX: 0,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: 'center',
      fontFamily: obj.fontFamily,
      itemMargin: {
        horizontal: 8,
        vertical: 0
      },
    },
    stroke: {
      width: 0
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '10px',
        fontFamily: obj.fontFamily,
      },
      offsetY: -27
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
        borderRadius: 4,
        dataLabels: {
          position: 'top',
          orientation: 'vertical',
        }
      },
    }
  }
}



/**
 * Cloud storage chart options
 */
function getCloudStorageChartOptions(obj: any) {
  return {
    series: [67],
    chart: {
      height: 260,
      type: "radialBar"
    },
    colors: [obj.primary],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: "70%"
        },
        track: {
          show: true,
          background: obj.dark,
          strokeWidth: '100%',
          opacity: 1,
          margin: 5,
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -11,
            show: true,
            color: obj.muted,
            fontSize: "13px"
          },
          value: {
            color: obj.bodyColor,
            fontSize: "30px",
            show: true
          }
        }
      }
    },
    fill: {
      opacity: 1
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Storage Used"]
  }
};
