export const getPillars = {
  methods: {
    async getPillars() {
      this.loading = true;
      const docRef = await this.$db.collection('pillars')

      const snapshot = await docRef.get();

      snapshot.forEach(doc => {
        let pillar = {};
        pillar = doc.data();
        pillar.id = pillar.id;

        this.pillars.push(pillar);
      });

      this.loading = false;
    }
  }
};
