import data from './data.json';

class PillarStorage {
  constructor() {
    this.storage = localStorage;
  }

  get() {
    const pillars = JSON.parse( this.storage.getItem('pillars'));
    if (pillars) {
      return pillars;
    } else {
      this.set(data.pillars);
      return data.pillars;
    }
  }

  set(newPillars) {
    this.storage.setItem('pillars', JSON.stringify(newPillars));
  }

  delete() {
    this.storage.removeItem('pillars');
  }
}

const pillarStorage = new PillarStorage();
export default pillarStorage;