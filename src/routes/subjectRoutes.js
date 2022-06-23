const express = require("express")
const SubjectController = require("../controllers/subject")
const middleware_user_authenticated = require("../middleware/authenticated_user");

const api = express.Router()

api.post("/registersubject", [middleware_user_authenticated.ensureAuth], SubjectController.registerSubject)
api.get("/subjects", [middleware_user_authenticated.ensureAuth], SubjectController.getSubject)
api.get("/active-subjects", [middleware_user_authenticated.ensureAuth], SubjectController.getActiveSubjects)
api.get("/piaa-version", [middleware_user_authenticated.ensureAuth], SubjectController.getByPiaaVersion)
api.put("/updatesubject/:id", [middleware_user_authenticated.ensureAuth], SubjectController.updateSubject)
api.put("/activatesubject/:id",[middleware_user_authenticated.ensureAuth], SubjectController.activateSubject);
api.delete("/deletesubject/:id", [middleware_user_authenticated.ensureAuth], SubjectController.deleteSubject)

module.exports = api