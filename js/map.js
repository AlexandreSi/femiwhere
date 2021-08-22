import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import PubSub from "pubsub-js";

export const createChart = () => {

  const chart = am4core.create(
    "map-div",
    am4maps.MapChart
  );
  chart.maxZoomLevel = 1;
  chart.projection = new am4maps.projections.Miller();
  chart.geodata = am4geodata_worldLow

  let polygonSeries = new am4maps.MapPolygonSeries();
  polygonSeries.useGeodata = true;
  polygonSeries.exclude = ["AQ"];
  chart.series.push(polygonSeries);

  // Configure series
  let polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText = "{name}";
  polygonTemplate.fill = am4core.color("#74B266");

  // Create hover state and set alternative fill color
  let hs = polygonTemplate.states.create("hover");
  hs.properties.fill = am4core.color("#367B25");

  return chart;
}

const createImage = (imageSeries, feminist) => {
  const mapImage = imageSeries.mapImages.create();
  mapImage.latitude = feminist.trajectory[0].latitude;
  mapImage.longitude = feminist.trajectory[0].longitude;
  mapImage.feminist = feminist

  const circle = mapImage.createChild(am4core.Circle)
  circle.radius = 4;
  circle.clickable = true;
  circle.fill = am4core.color("#B27799");
  circle.stroke = am4core.color("#FFFFFF");
  circle.strokeWidth = 2;
  circle.nonScaling = true;
  circle.feminist = feminist

  circle.tooltipText = "{feminist.name}";
  circle.events.on("hit", () => PubSub.publish('map', {event: 'hit', object: feminist}))
  return mapImage;
}

export const drawFeminists = (chart, feminists) => {
  let imageSeries = chart.series.push(new am4maps.MapImageSeries());
  return feminists.map(feminist => createImage(imageSeries, feminist))
}
