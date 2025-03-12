var express = require('express');
var mongoose = require('mongoose');

var app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/student")
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.log("MongoDB connection error:", err));

const studentSchema = new mongoose.Schema({


    name: { type: String, required: true },
    age: { type: Number },
    city: { type: String }
});

const Student = mongoose.model('Student', studentSchema);
app.post('/student', (req, res) => {
    const newStudent = new Student(req.body);

    newStudent.save()
        .then((student) => {
            res.status(201).json({ message: 'Student created successfully', student });
        })
        .catch((err) => {
            res.status(400).json({ message: 'Error creating student', error: err });
        });
});

app.get('/getAll',(req,res)=>{
    Student.find()
    .then((student)=>{
        res.status(201).json({message:"data",student});
    })
    .catch((err) => {
        res.status(400).json({ message: 'Error creating student', error: err });
    });
});

app.delete('/student/:name', (req, res) => {
    const studentName = req.params.name;
    
    Student.findOneAndDelete({ name: studentName })
        .then((deletedStudent) => {
            if (deletedStudent) {
                res.status(200).json({ message: 'Student deleted successfully', deletedStudent });
            } else {
                res.status(404).json({ message: 'Student not found' });
            }
        })
        .catch((err) => {
            res.status(400).json({ message: 'Error deleting student', error: err });
        });
});
app.put('/student/update/:name', (req, res) => {
    const studentName = req.params.name;
    const updatedData = req.body;

    Student.findOneAndUpdate({ name: studentName }, updatedData, { new: true })
        .then((updatedStudent) => {
            if (updatedStudent) {
                res.status(200).json({ message: 'Student updated successfully', updatedStudent });
            } else {
                res.status(404).json({ message: 'Student not found' });
            }
        })
        .catch((err) => {
            res.status(400).json({ message: 'Error updating student', error: err });
        });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
