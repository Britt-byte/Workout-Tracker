const express = require("express");
const bodyParser = require('bodyParser');
const path = require('path');
require('dotenv/config');
const connectDB = require("./Develop/config/connectDB.js.js");

const db = require("./Develop/models");
let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

let PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/excercise", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'exercise.html'));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stats.html'));
});

app.get("api/workouts/range", (req, res) => {
    db.Workout.find({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

app.put("/api/workout/:id", (req, res) => {

    let urlData = reeq.params;
    let data = req.body;
        db.Workout.updateOne( {_id: urlData.id }, {$push: {exercises: [
            {
                "type" : data.type,
                "name" : data.name,
                "duration" : data.duration,
                "distance" : data.distance,
                "weight" : data.weight,
                "reps" : data.reps,
                "sets" : data.sets
            }
        ]
    }}).then(dbUpdate => {
        res.json(dbUpdate);
    })
    .catch(err => {
        res.json(err);
    });
});

app.post("api/workouts", (req, res) => {
    let data = req.body;
    db.Workout.create({
        day: new Date().setDate(new Date().getDate())
    }).then(dbUpdate => {
        res.json(dbUpdate);
    })
    .catch(err => {
        res.json(err);
    });
});

connectDB()

app.listen(PORT, function() {
    console.log("Server listening on " + PORT);
});