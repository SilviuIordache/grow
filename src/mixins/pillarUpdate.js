export const pillarUpdate = {
  methods: {
    updatePillarGoals(pillarName, newGoals) {
      const pillars = JSON.parse(localStorage.getItem('pillars'));

      // find index element with the matching type
      const index = pillars.findIndex((pillar) => pillar.name === pillarName);

      // grab the pillar to be changed
      const updatedPillar = pillars[index];
      
      // update it's goals
      updatedPillar.goals = newGoals;

      // replace it with the old one
      pillars[index] = updatedPillar;

      // update storage
      localStorage.setItem('pillars', JSON.stringify(pillars));
    },
  }
}