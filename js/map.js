import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import PubSub from "pubsub-js";

export const createChart = () => {

  const chart = am4core.create(
    "map-div",
    am4maps.MapChart
  );
  chart.projection = new am4maps.projections.Miller();
  chart.geodata = am4geodata_worldHigh

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

  chart.events.on('ready', () => PubSub.publish('start'))

  return chart;
}

const createImage = (imageSeries, feminist) => {
  const mapImage = imageSeries.mapImages.create();
  mapImage.latitude = feminist.trajectory[0].latitude;
  mapImage.longitude = feminist.trajectory[0].longitude;
  mapImage.feminist = feminist
  mapImage.showOnInit = false;

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

const creationLocationPoint = (imageSeries, location) => {
  const mapImage = imageSeries.mapImages.create();
  mapImage.latitude = location.latitude;
  mapImage.longitude = location.longitude;

  const circle = mapImage.createChild(am4core.Circle)
  circle.radius = 4;
  circle.focusable = true;
  circle.fill = am4core.color("#B27799");
  circle.stroke = am4core.color("#FFFFFF");
  circle.strokeWidth = 2;
  circle.nonScaling = true;
  circle.title = `${location.title} (${location.year})`;

  circle.tooltipText = "{title}";
  return mapImage;
}

export const drawFeminists = (chart, feminists) => {
  let imageSeries = chart.series.push(new am4maps.MapImageSeries());
  return feminists.map(feminist => createImage(imageSeries, feminist))
}

export const drawTrajectory = (chart, feminist) => {
  let imageSeries = chart.series.push(new am4maps.MapImageSeries());
  feminist.trajectory.map(location => creationLocationPoint(imageSeries, location))
  let lineSeries = chart.series.push(new am4maps.MapArcSeries());
  lineSeries.data = [{
    "multiGeoLine": [
      feminist.trajectory
    ]
  }];
  lineSeries.mapLines.template.line.controlPointDistance = 0.3;
  return [imageSeries, lineSeries]
}

export const zoomOnTrajectory = (chart, feminist) => {
  const test = feminist.trajectory.reduce((acc, location) => {
    return {
      northest: Math.max(acc.northest, location.latitude),
      eastest: Math.max(acc.eastest, location.longitude),
      westest: Math.min(acc.westest, location.longitude),
      southest: Math.min(acc.southest, location.latitude),
    }
  }, {
    northest: feminist.trajectory[0].latitude,
    eastest: feminist.trajectory[0].longitude,
    westest: feminist.trajectory[0].longitude,
    southest: feminist.trajectory[0].latitude,
  })
  const latitudeEpsilon = Math.abs(test.northest - test.southest) * 0.5;
  const longitudeEpsilon = Math.abs(test.eastest - test.westest) * 0.5;
  chart.zoomToRectangle(
      test.northest + latitudeEpsilon,
      test.eastest + longitudeEpsilon,
      test.southest - latitudeEpsilon,
      test.westest + longitudeEpsilon,
  )
}