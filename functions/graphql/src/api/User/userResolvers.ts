const userResolvers = {
  Query: {
    async user() {
      return {
        id: 'id',
      };
    },
  },
};
