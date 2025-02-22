const express = require('express');  
const app = express();

let students = [
    {"name": "Punith",
        "id": "1",
        "age": 20
    }
];

app.get("/students",(req,res)=>{
    res.json(students);
});

// To get specific student details
app.get("/students/:id", (req, res) => {
    const id = req.params.id;
    let student = students.find(s => s.id === parseInt(id));

    if (student) {
        res.status(200).json({
            message: "Student found",
            student: student
        });
    } else {
        res.status(404).json({
            message: "Student not found"
        });
    }
});
//To add student
app.use(express.json());
app.post("/addstudent",(req,res)=>{
    const student=req.body;
    students.push(student);
    res.status(200).json({
        "message":"student added successfully",
        "students": students
    });
});

//To delete data of student
app.delete("/deleteStudent/:id", (req, res) => {
    const id = req.params.id; 
    students=students.filter(s=>s.id!==id);
    console.log(students)
    res.status(200).json({
        "message":"deleted student",
        "students":students
    });     
});


const port = 3000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});



