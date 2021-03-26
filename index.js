const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  # Entry points of your API
  scalar Date

  type Query {
    hello: String
    rightTime: Date
    loggedUser: User
    trendProduct: Product
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    salary: Float
    vip: Boolean
  }

  type Product {
    description: String!
    price: Float!
    discount: Float
    priceWithDiscount: Float
  }
`;

const resolvers = {
  Query: {
    hello() {
      return 'Hello World!'
    },
    rightTime() {
      return new Date;
    },
    loggedUser() {
      return {
        id: 1,
        name: 'Gabriel',
        email: 'gabriel@email.com',
        age: 22,
        real_salary: 2500.00,
        vip: true
      }
    },
    trendProduct() {
      return {
        description: 'Kindle',
        price: 100,
        discount: 0.02,
      }
    }
  },
  User: {
    salary(user) {
      return user.real_salary
    }
  },
  Product: {
    priceWithDiscount(product) {
      let value = product.discount ? (product.discount * (1 - product.discount)) : product.price;
      return value
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Executando em ${url}`)
});