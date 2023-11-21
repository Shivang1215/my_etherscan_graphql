// Import the ApolloServer class from apollo-server
const { ApolloServer } = require("apollo-server"); 

// Import the importSchema utility to load the GraphQL schema
const { importSchema } = require("graphql-import");

// Import the custom EtherDataSource data source class 
const EtherDataSource = require("./datasource/ethDatasource");

// Load the GraphQL schema from the schema.graphql file
const typeDefs = importSchema("./schema.graphql"); 

// Load environment variables from .env file
require("dotenv").config();

// Resolvers map query fields to data source methods
const resolvers = {
  Query: {
    getEthBalance: (root, args, { dataSources }) => {
      // Call etherBalanceByAddress on EtherDataSource
      return dataSources.ethDataSource.etherBalanceByAddress(args.address);
    },
    getTotalEthSupply: (root, args, { dataSources }) => {  
      // Call totalSupplyOfEther on EtherDataSource
      return dataSources.ethDataSource.totalSupplyOfEther();
    },
    getEthPrice: (root, args, { dataSources }) => {
      // Call getLatestEthereumPrice on EtherDataSource
      return dataSources.ethDataSource.getLatestEthereumPrice();
    },
    getEthTxTimeEstimate: (root, args, { dataSources }) => {
      // Call getBlockConfirmationTime on EtherDataSource
      return dataSources.ethDataSource.getBlockConfirmationTime();
    }
  }
}

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    // Instantiate EtherDataSource
    ethDataSource: new EtherDataSource(),
  }), 
});

// Start the server
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});