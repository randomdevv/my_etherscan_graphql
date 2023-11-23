const { ApolloServer } = require("apollo-server"); // Import the Apollo Server library

const { importSchema } = require("graphql-import"); // Import the graphql-import library to load GraphQL schemas

const EtherDataSource = require("./datasource/ethDatasource"); // Import the custom EtherDataSource data source

require("dotenv").config(); // Load environment variables from .env file

const resolvers = {
  Query: {
    // Query for getting ETH balance for an address
    etherBalanceByAddress: (root, args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(args), 

    // Query for getting total ETH supply
    totalSupplyOfEther: (root, args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Query for getting latest ETH price
    latestEthereumPrice: (root, args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Query for getting average ETH block confirmation time
    blockConfirmationTime: (root, args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  
  // Register EtherDataSource 
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), 
  }),
});

// Set no timeout 
server.timeout = 0;

// Start the server
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
