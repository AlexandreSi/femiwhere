import commonLocations from './commonLocations';

const currentYear = new Date().getFullYear();

const Feminist = class Feminist {
  constructor(name, trajectory, references = null) {
    this.name = name;
    this.trajectory = trajectory.map((location) => ({
      ...location,
      year: location.year === 'today' ? currentYear : location.year,
      latitude: location.latitude || commonLocations[location.title].latitude,
      longitude: location.longitude || commonLocations[location.title].longitude,
    }));
    this.references = references || [];
    const sortedTrajectory = this.trajectory.sort((a, b) => a.year - b.year);
    this.birthYear = sortedTrajectory[0].year;
    this.deathYear = sortedTrajectory[sortedTrajectory.length - 1].year;
  }
};

export default Feminist;
