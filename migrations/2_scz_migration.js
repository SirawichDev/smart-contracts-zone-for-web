const SczContract = artifacts.require("SCZ")

module.exports = function (deployer) {
    deployer.deploy(SczContract)
}