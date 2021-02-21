import data from './data.json';

class PillarStorage {
  constructor() {
    this.storage = localStorage;
  }
  // Create
  set(newPillars) {
    this.storage.setItem('pillars', JSON.stringify(newPillars));
  }

  // Read
  get() {
    const pillars = JSON.parse( this.storage.getItem('pillars'));
    if (pillars) {
      return pillars;
    } else {
      this.set(data.pillars);
      return data.pillars;
    }
  }

  // Update
  updatePillarGoals(pillarName, newGoals) {
    const pillars = JSON.parse(localStorage.getItem('pillars'));

    // find index element with the matching type
    const index = pillars.findIndex((pillar) => pillar.name === pillarName);

    // grab the pillar to be changed
    const updatedPillar = pillars[index];
    
    // update it's goals
    updatedPillar.goals = newGoals;

    // replace it with the new one
    pillars[index] = updatedPillar;

    // update storage
    localStorage.setItem('pillars', JSON.stringify(pillars));
  }

  // Delete
  delete(pillarName, id) {

    const pillars = JSON.parse(localStorage.getItem('pillars'));

    // find index element with the matching type
    const pillarIndex = pillars.findIndex((pillar) => pillar.name === pillarName);

    // grab the pillar to be changed
    const pillarGoals = pillars[pillarIndex].goals;

    // find index of goal to be removed
    const goalIndex = pillarGoals.findIndex((goal) => goal.id === id);
    
    // delete goal
    pillarGoals.splice(goalIndex, 1);

    // update goals it with the new one
    pillars[pillarIndex].goals = pillarGoals;

    // update storage
    localStorage.setItem('pillars', JSON.stringify(pillars));
  }

  wipe() {
    this.storage.removeItem('pillars');
  }
}

const pillarStorage = new PillarStorage();
export default pillarStorage;