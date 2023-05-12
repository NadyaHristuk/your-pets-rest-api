const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers/');

const newsSchema = new Schema(
    {
        imgUrl: {
            type: String,
        },
        title: {
            type: String,
        },
        text: {
            type: String,
        },
        date: {
            type: Date,
        },
        url: {
            type: String,
        },
    },
    {
        versionKey: false,
    }
);

newsSchema.post('save', handleMongooseError);

const News = model('news', newsSchema);

module.exports = News;
