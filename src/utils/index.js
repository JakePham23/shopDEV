// utils/index.js
const _ = require('lodash');

const getInfoData = ({ fields = [], object = {} }) => {
    return _.pick(object, fields);  // Pick the desired fields from the object
};

module.exports = { getInfoData };
