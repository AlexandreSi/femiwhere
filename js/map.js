const am4core = require('@amcharts/amcharts4/core');
const am4maps = require('@amcharts/amcharts4/maps');
const {
  default: am4GeodataWorldHigh,
} = require('@amcharts/amcharts4-geodata/worldHigh');
const PubSub = require('pubsub-js');

export const createChart = () => {
  const chart = am4core.create('map-div', am4maps.MapChart);
  chart.projection = new am4maps.projections.Miller();
  chart.geodata = am4GeodataWorldHigh;
  chart.maxZoomLevel = 512;
  chart.zoomEasing = am4core.ease.linear;

  const polygonSeries = new am4maps.MapPolygonSeries();
  polygonSeries.useGeodata = true;
  polygonSeries.exclude = ['AQ'];
  chart.series.push(polygonSeries);

  // Configure series
  const polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText = '{name}';
  polygonTemplate.fill = am4core.color('#74B266');

  // Create hover state and set alternative fill color
  const hs = polygonTemplate.states.create('hover');
  hs.properties.fill = am4core.color('#367B25');

  chart.events.on('ready', () => PubSub.publish('start'));

  return chart;
};

const createImage = (imageSeries, feminist) => {
  const mapImage = imageSeries.mapImages.create();
  mapImage.latitude = feminist.trajectory[0].latitude;
  mapImage.longitude = feminist.trajectory[0].longitude;
  mapImage.feminist = feminist;
  mapImage.showOnInit = false;

  const circle = mapImage.createChild(am4core.Circle);
  circle.radius = 4;
  circle.clickable = true;
  circle.fill = am4core.color('#B27799');
  circle.stroke = am4core.color('#FFFFFF');
  circle.strokeWidth = 2;
  circle.nonScaling = true;
  circle.feminist = feminist;

  circle.tooltipText = '{feminist.name}';
  circle.events.on('hit', () => PubSub.publish('map', { event: 'hit', object: feminist }));
  return mapImage;
};

const createLocationPoint = (imageSeries, location, year) => {
  const mapImage = imageSeries.mapImages.create();
  mapImage.latitude = location.latitude;
  mapImage.longitude = location.longitude;

  const circle = mapImage.createChild(am4core.Circle);
  circle.radius = 4;
  circle.focusable = true;
  circle.fill = am4core.color('#B27799');
  circle.stroke = am4core.color('#FFFFFF');
  circle.strokeWidth = 2;
  circle.nonScaling = true;
  circle.title = `${location.title} (${year})`;

  circle.tooltipText = '{title}';
  return mapImage;
};

export const drawFeminists = (chart, feminists) => {
  const imageSeries = chart.series.push(new am4maps.MapImageSeries());
  return feminists.map((feminist) => createImage(imageSeries, feminist));
};

export const drawTrajectory = (chart, feminist) => {
  const imageSeries = chart.series.push(new am4maps.MapImageSeries());
  let locationIndex = 0;
  while (locationIndex < feminist.trajectory.length) {
    const location = feminist.trajectory[locationIndex];
    if (locationIndex === feminist.trajectory.length - 1) {
      // If last point of trajectory, create a point
      createLocationPoint(imageSeries, location, location.year);
      break;
    }
    if (
      feminist.trajectory[locationIndex].title
      === feminist.trajectory[locationIndex + 1].title
    ) {
      // If 2 successive points of the trajectory are the same place
      // (usually for deaths at the same place as the last place move), merge 2 locations into one
      createLocationPoint(
        imageSeries,
        location,
        `${location.year} - ${feminist.trajectory[locationIndex + 1].year}`,
      );
      locationIndex += 2;
    } else {
      createLocationPoint(imageSeries, location, location.year);
      locationIndex += 1;
    }
  }
  const lineSeries = chart.series.push(new am4maps.MapArcSeries());
  lineSeries.data = [
    {
      multiGeoLine: [feminist.trajectory],
    },
  ];
  lineSeries.mapLines.template.line.controlPointDistance = 0.3;
  return [imageSeries, lineSeries];
};

export const zoomOnTrajectory = (chart, feminist) => {
  const boundaries = feminist.trajectory.reduce(
    (acc, location) => ({
      northest: Math.max(acc.northest, location.latitude),
      eastest: Math.max(acc.eastest, location.longitude),
      westest: Math.min(acc.westest, location.longitude),
      southest: Math.min(acc.southest, location.latitude),
    }),
    {
      northest: feminist.trajectory[0].latitude,
      eastest: feminist.trajectory[0].longitude,
      westest: feminist.trajectory[0].longitude,
      southest: feminist.trajectory[0].latitude,
    },
  );
  const latitudeEpsilon = Math.abs(boundaries.northest - boundaries.southest) * 0.05;
  const longitudeEpsilon = Math.abs(boundaries.eastest - boundaries.westest) * 0.05;
  chart.zoomToRectangle(
    boundaries.northest + latitudeEpsilon,
    boundaries.eastest + longitudeEpsilon,
    boundaries.southest - latitudeEpsilon,
    boundaries.westest - longitudeEpsilon,
    undefined,
    true,
  );
};
