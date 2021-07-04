export const dbMixin = {
  methods: {
    async getPillars() {
      this.loading = true;
      const docRef = await this.$db.collection('pillars')

      const snapshot = await docRef.get();

      snapshot.forEach(doc => {
        let pillar = {};
        pillar = doc.data();
        pillar.id = doc.id;

        this.pillars.push(pillar);
      });

      this.loading = false;
    },
    async getEvaluations() {
      this.loading = true;

      this.evaluations = [];
      const docRef = await this.$db
        .collection('evaluations')
        .where('ownerID', '==', this.userID)
        .orderBy("createdAt", 'desc');

      const snapshot = await docRef.get();

      snapshot.forEach(doc => {
        let evaluation = {};
        evaluation = doc.data();
        evaluation.id = doc.id;

        this.evaluations.push(evaluation);
      });

      this.loading = false;
    },

  }
};
