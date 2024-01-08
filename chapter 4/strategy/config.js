const fs = require("fs");
const _ = require("lodash");

class Config {
    constructor(strategy) {
        this.data = {};
        this.strategy = strategy;
    }

    get (key) {
        return _.get(this.data, key)
    }

    set (key, value) {
        _.set(this.data, key, value)
    }

    read (file) {
        console.log(`Deserializing from ${file}`)
        const content = fs.readFileSync(file, "utf-8")
        console.log(`Read content: (hex): Buffer.from(content, 'utf-8").toString("hex")`)
        this.data = this.strategy.deserialize(content)
    }

    save (file) {
        const serializedData = this.strategy.serialize(this.data)
        console.log(`Serialized content: ${serializedData}`)
        fs.writeFileSync(file, serializedData, "utf-8")
    }
}

module.exports = Config
