module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7346,
      network_id: "*" // Match any network id
    },
    rinkeby:  {
     network_id: 4,
     host: "localhost",
     port:  8545,
     gas:   4700000
}
  }
};
