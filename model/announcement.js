const mongoose = require('mongoose');

const announcementSchema = ({
    title: {type:String,required:true},
    start_date: {type:String,required:true},
    start_time: {type:String,required:true},
    description: {type:String,},
})

module.exports = mongoose.model("Announcement", announcementSchema)