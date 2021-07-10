const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

let classSchema = new Schema({
    weekNum: Number,
    day: { type: String, enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
    classes: {
        p0: {
            on: Boolean,
            startTime: String,
            endTime: String,
            class: String
        },
        p1: {
            on: Boolean,
            startTime: String,
            endTime: String,
            class: String
        },
        p2: {
            on: Boolean,
            startTime: String,
            endTime: String,
            class: String
        },
        p3: {
            on: Boolean,
            startTime: String,
            endTime: String,
            class: String
        },
        p4: {
            on: Boolean,
            startTime: String,
            endTime: String,
            class: String
        },
        p5: {
            on: Boolean,
            startTime: String,
            endTime: String,
            class: String
        }
    }
});

module.exports = mongoose.model('class', classSchema);