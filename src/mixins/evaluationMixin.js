export const evaluationMixin = {
  data() {
    return {
      ratingColorClass: 'rating-color-3',
      emoji: 'fa-meh'
    }
  },
  methods: {
    evalAverageRating() {
      if (this.evaluation.pillars) {
        let ratingSum = 0;
        this.evaluation.pillars.forEach((pillar) => {
          ratingSum += parseInt(pillar.rating, 10);
        });

        const avg = ratingSum/ this.evaluation.pillars.length;
        return avg.toFixed(1)
      }
    },
    computeRatingVisuals() {
      const value = this.evalAverageRating();
      if (value <= 2.5) {
        this.ratingColorClass = 'rating-color-1';
        this.emoji = 'far fa-frown';
        return
      }

      if (value > 2.5 && value <= 5) {
        this.ratingColorClass = 'rating-color-2';
        this.emoji = 'far fa-meh';
        return
      }

      if (value > 5 && value <= 7.5) {
        this.ratingColorClass = 'rating-color-3';
        this.emoji = 'far fa-smile';
        return
      }

      if (value > 7.5 && value <= 10) {
        this.ratingColorClass = 'rating-color-4';
        this.emoji = 'far fa-laugh';
        return
      }
      
    },
  }
};

