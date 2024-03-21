"use client";

import { cn } from "@/lib/utils";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highcharts3d from "highcharts/highcharts-3d";
import HighchartsExporting from "highcharts/modules/exporting";
import { useEffect, useState } from "react";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
  highcharts3d(Highcharts);
}

export const PieChart = ({
  title,
  data,
  legendEnabled,
  className,
  height,
}: {
  title: string;
  data: any;
  legendEnabled: boolean;
  className?: string;
  height?: number;
}) => {
  const [pieChartOptions, setPieChartOptions] = useState<any>({
    chart: {
      height,
      type: "pie",
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },
      backgroundColor: "#000000",
    },
    legend: {
      itemStyle: {
        color: "#FFFFFF",
        font: 'thin 16px "PPNeueMachina", sans-serif',
      },
    },
    title: {
      text: title,
      align: "center",
      style: {
        color: "#FFFFFF",
        font: 'bold 24px "PPNeueMachina", sans-serif',
      },
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    tooltip: {
      pointFormat: "<b>{point.y:.2f}%</b>",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        depth: 35,
        showInLegend: legendEnabled,
        dataLabels: {
          enabled: true,
          format: "{point.name}",
        },
        colors: ["#b8a159"],
        borderColor: "#000000",
      },
    },
    series: [
      {
        type: "pie",
        name: title,
        slicedOffset: 18,
        data: [],
      },
    ],
  });

  useEffect(() => {
    setPieChartOptions({
      ...pieChartOptions,
      series: [
        {
          type: "pie",
          name: title,
          slicedOffset: 18,
          data: data,
        },
      ],
    });
  }, [data, title]);

  return (
    <HighchartsReact
      className={cn(className)}
      highcharts={Highcharts}
      options={pieChartOptions}
    />
  );
};

/**
 * import { Chart } from "react-google-charts";

export const PieChart = () => {
  let data = [
    ["Section", "Percentage"],
    ["Team / Partnerships (Linear vesting over 18 months)", 15],
    ["Staking", 10],
    ["Airdrop/Marketing", 10],
    ["Presale", 2],
    ["Liquidity", 63],
    ["Trading Tax (On all buy and sell orders)", 5],
  ];

  const options = {
    title: "Tokenomics",
    is3D: true,
    backgroundColor: "transparent",
    labels: {
      enabled: true,
      formatter: (data: any) => data.value,
    },
    pieSliceText: "value",
    slices: {
      0: { color: "#b8a159" },
      1: { color: "#9f8c40" },
      2: { color: "#cbb675" },
      3: { color: "#a5914b" },
      4: { color: "#d8c38b" },
      5: { color: "#e6d4a1" },
    },
    legend: {
      position: "left",
      textStyle: {
        color: "white",
        fontName: "PPNeueMachina",
        fontSize: 18,
      },
    },
    titleTextStyle: {
      color: "white",
      fontName: "PPNeueMachina",
      fontSize: 20,
    },
    pieSliceBorderColor: "#000000",
  };

  return (
    <div>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
};

 */
