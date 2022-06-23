const bcrypt = require("bcrypt-nodejs")
const Subject = require("../models/subject.model")
const jwt = require("../services/jwt")
const fecha = Date.now()

const getSubject = (req, res) => {
    Subject.find().then((subjects) => {
        !subjects
            ? res.status(404).send({ message: "No se ha encontrado ninguna materia" })
            : res.status(200).send({ subjects });
    });
};

const getByPiaaVersion = (req, res) =>{
    const piaaSubjects = req.query
    Subject.find({piaa_version: piaaSubjects.piaa_version}).then((subjects) =>{
        !subjects
            ? res.status(404).send({message: "No se ha encontrado ninguna asignatura"})
            : res.status(200).send({subjects})
    });
}

const getActiveSubjects = (req, res) => {
    const activeSubjects = req.query;
    Subject.find({ active: activeSubjects.active }).then((subjects) => {
        !subjects
            ? res.status(404).send({ message: "No se ha encontrado ninguna asignatura" })
            : res.status(200).send({ subjects });
    });
};

const activateSubject = (req, res) => {
    const { id } = req.params;
    const { active } = req.body;

    Subject.findByIdAndUpdate(id, { active }, (err, subjectStored) => {
        err
            ? res.status(500).send({ message: "Error del servidor." })
            : !subjectStored
                ? res.status(404).send({ message: "No se ha encontrado la asignatura." })
                : active === true
                    ? res.status(200).send({ message: "Asignatura activado correctamente." })
                    : res.status(200).send({ message: "Asignatura desactivado correctamente." });
    });
};

async function updateSubject(req, res) {
    let subjectData = req.body;
    const params = req.params;

    Subject.findByIdAndUpdate({ _id: params.id }, subjectData, (err, subjectUpdate) => {
        err
            ? res.status(500).send({ message: "Error del servidor." })
            : !subjectUpdate
                ? res.status(404).send({ message: "No se encontro la asignatura." })
                : res.status(200).send({ message: "Asignatura actualizada correctamente." });
    });
}

const deleteSubject = (req, res) => {
    const { id } = req.params;

    Subject.findByIdAndRemove(id, (err, subjectDeleted) => {
        err
            ? res.status(500).send({ message: "Error del servidor" })
            : !subjectDeleted
                ? res.status(404).send({ message: "Asignatura no encontrada" })
                : res.status(200).send({ message: "La asignatura ha sido eliminada correctamente" })
    });
}

function registerSubject(req, res){
    const subject = new Subject();

    const { departament, academic_activity, activity_code, number_credits, piaa_version, theory_hours, offsite_hours, hoursnon_attendace_reprovals, last_chance, duration_semester, practical_hours, presential_teacher_hours, maximum_quotas, passing_score, weeks_duration } = req.body
    subject.departament = departament
    subject.academic_activity = academic_activity
    subject.activity_code = activity_code
    subject.number_credits = number_credits
    subject.piaa_version = piaa_version
    // subject.file_number = file_number
    subject.file_data = fecha
    subject.theory_hours = theory_hours
    subject.offsite_hours = offsite_hours
    subject.hoursnon_attendace_reprovals = hoursnon_attendace_reprovals
    subject.last_chance = last_chance
    subject.duration_semester = duration_semester
    subject.practical_hours = practical_hours
    subject.presential_teacher_hours = presential_teacher_hours
    subject.maximum_quotas = maximum_quotas
    subject.active = true
    subject.passing_score = passing_score
    subject.weeks_duration = weeks_duration

    subject.save((err, subjectStored ) =>{
        err
            ? res.status(500).send({message: "La asignatura ya existe"})
            : !subjectStored
                ? res.status(500).send({message: "Error al crear la nueva asignatura"})
                : res.status(200).send({message: "Asignatura creada correctamente"})
    })
}

module.exports = {getSubject, deleteSubject, registerSubject, getActiveSubjects, getByPiaaVersion, activateSubject, updateSubject}