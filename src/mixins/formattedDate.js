export const formattedDate = {
  methods: {
    formattedDate(timeStamp) {
      const date = timeStamp.toDate().toISOString().split('T')
      const calendar = date[0];
      const hours = date[1].split('.')[0];
      return calendar + ', ' + hours
    }
  }
};
