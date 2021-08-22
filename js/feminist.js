const Feminist = class Feminist {
  constructor(name, trajectory, references = null) {
    this.name = name;
    this.trajectory = trajectory;
    this.references = references || [];
    const sortedTrajectory = trajectory.sort((a, b) => a.year - b.year);
    this.birthYear = sortedTrajectory[0].year;
    this.deathYear = sortedTrajectory[sortedTrajectory.length - 1].year;
  }
}

export default Feminist;
