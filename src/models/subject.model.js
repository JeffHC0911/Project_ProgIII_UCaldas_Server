const mongoose = require('mongoose')
const SubjectSchema = mongoose.Schema({
    departament: { type: String, require: true },
    academic_activity: { type: String, require: true },
    activity_code: { type: Number, require: true },
    number_credits: { type: Number, require: true },
    piaa_version: { type: String, require: true },
    file_number: {
        type: Object,
        require: true,
        month_file: { type: Number, require: true },
        year_file: { type: Number, require: true },
    },
    file_data: { type: Date, require: true },
    theory_hours: { type: Number, require: true },
    offsite_hours: { type: Number, require: true },
    hoursnon_attendace_reprovals: { type: Number, require: true },
    last_chance: { type: Boolean, require: true },
    duration_semester: { type: Number, require: true },
    practical_hours: { type: Number, require: true },
    presential_teacher_hours: { type: Number, require: true },
    maximum_quotas: { type: Number, require: true },
    active: {type: Boolean, require: true},
    passing_score: { type: Number, require: true },
    weeks_duration: { type: Number, require: true },
})

module.exports = mongoose.model("Subject", SubjectSchema)