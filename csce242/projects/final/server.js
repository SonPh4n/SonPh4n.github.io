
const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");

mongoose
    .connect("mongodb+srv://sthienphan:0Lxal26AWpcsm8TF@cluster0.jngjwxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Connected to mongodb..."))
    .catch((err) => console.error("could not connect ot mongodb...", err));

const termSchema = new mongoose.Schema({
    name: String,    
    image: String,
    definition: String,
    relatedTerms: [String],
});

const Term = mongoose.model("Term", termSchema);



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

const upload = multer({ storage: storage });


app.get('/',(req, res)=>{
    res.sendFile(__dirname + "/public/terms.html");
});


app.get("/api/terms", async (req, res) => {
  try {
      const terms = await Term.find();
      //Removes images/. redundancy
      const termsWithoutPrefix = terms.map(term => ({
          ...term.toObject(),
          image: term.image.replace('images/', '')
      }));
      res.json(termsWithoutPrefix);
  } catch (error) {
      console.error("Error fetching terms:", error);
      res.status(500).send("Internal Server Error");
  }
});


const getTerms = async (res) => {
    const terms = await Term.find();
    res.send(terms);
};

app.get("/api/terms/:id", (req, res) => {
    getTerm(res, req.params.id);
});

const getTerm = async(res, id) => {
    const term = await Term.findOne({_id:id})
    res.send(term);
};


app.post("/api/terms", upload.single("image"), (req, res) => {
    const result = validateTerms(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const term = new Term({
        name:req.body.name,
        definition:req.body.definition,
        relatedTerms:req.body.relatedTerms.split(",")
    })
    
    if(req.file){
        term.image = req.file.filename;
    };

    createTerm(res, term);
});

const createTerm = async (res, term) => {
    const result = await term.save();
    res.send(term);
};

app.put("/api/terms/:id", upload.single("image"), (req, res) => {
    const result = validateTerms(req.body);
  
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }

    updateTerm(req, res);
  });

  const updateTerm = async (req, res) =>{
    let fieldsToUpdate = {
      name:req.body.name,
      definition:req.body.definition,
      relatedTerms:req.body.relatedTerms.split(",")
    }
    if (req.file) {
      fieldsToUpdate.image = "images/" + req.file.filename; 
    }

    const result = await Term.updateOne({ _id: req.params.id }, fieldsToUpdate);
    res.send(result);
  };

  app.delete("/api/terms/:id", (req,res)=>{
    removeTerms(res, req.params.id);
   
  });

  const removeTerms = async (res, id) =>{
    const term = await Term.findByIdAndDelete(id);
    res.send(term);
  };

const validateTerms = (terms) =>{
    const schema = Joi.object({
        _id: Joi.allow(""),
        name: Joi.string().min(3).required(),
        definition: Joi.string().min(3).required(),
        relatedTerms: Joi.allow(),

    });
    return schema.validate(terms);
};

app.listen(3001, () => {
    console.log("im listening");
});

