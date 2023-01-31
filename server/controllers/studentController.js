const firebase = require("../db");
const Student = require("../models/student");
const firestore = firebase.firestore();

const addStudent = async (req,res, next) => {
   try{
    const data = req.body;
    await firestore.collection("student").doc().set(data);
    res.send("record saved");
   } catch (error){
       res.status(404).send(error.message)
   }
}

const getAllStudents = async (req, res, next) => {
    try{
        const students = await firestore.collection('student');
        const data = await students.get();
        const studentArray = [];
        if (data.empty) {
            res.status(404).send ('No student record found')
        }
        else{
            data.forEach(doc=>{
                const student = new Student(
                    doc.id,
                    doc.data().firstName,
                    doc.data().lastName
                )
                studentArray.push(student)
            })
            res.send(studentArray)
        }

    } catch(error){
        res.status(400).send(error.message)
    }
}

module.exports = {
    addStudent,
    getAllStudents
}