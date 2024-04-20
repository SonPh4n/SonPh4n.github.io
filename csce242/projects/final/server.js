
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
    difficultyLevel: String,
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
      const termsData = await Term.find();  
      res.json(termsData);  
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

  if (req.body.relatedTerms && typeof req.body.relatedTerms === 'string') {
      req.body.relatedTerms = req.body.relatedTerms.split(',');
  }

  const { error } = validateTerms(req.body);
  if (error) {
      console.error("Validation error:", error.details[0].message);
      return res.status(400).send(error.details[0].message);
  }

  const term = new Term({
      name: req.body.name,
      definition: req.body.definition,
      relatedTerms: req.body.relatedTerms,
      difficultyLevel: req.body.difficultyLevel,
      image: req.file ? req.file.filename : undefined
  });

  term.save()
      .then(savedTerm => res.send(savedTerm))
      .catch(saveError => {
          console.error("Error saving term:", saveError);
          res.status(500).send("Error saving term");
      });
});


app.put("/api/terms/:id", upload.single("image"), (req, res) => {
  const result = validateTerms(req.body);

  if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
  }

  updateTerm(req, res);
});

const updateTerm = async (req, res) => {
  let relatedTerms = req.body.relatedTerms;
  if (typeof relatedTerms === 'string') {
      relatedTerms = relatedTerms.split(",");
  }

  let fieldsToUpdate = {
      name: req.body.name,
      definition: req.body.definition,
      relatedTerms: relatedTerms,
      difficultyLevel: req.body.difficultyLevel 
  };

  if (req.file) {
      fieldsToUpdate.image = req.file.filename;
  }

  try {
      const updatedTerm = await Term.findByIdAndUpdate(req.params.id, fieldsToUpdate, { new: true });
      if (!updatedTerm) {
          res.status(404).send("Term not found");
          return;
      }
      res.json(updatedTerm);
  } catch (error) {
      console.error("Failed to update term:", error);
      res.status(500).send("Internal Server Error");
  }
};


  app.delete("/api/terms/:id", (req,res)=>{
    removeTerms(res, req.params.id);
   
  });

  const removeTerms = async (res, id) =>{
    const term = await Term.findByIdAndDelete(id);
    res.send(term);
  };

  const validateTerms = (terms) => {
    const schema = Joi.object({
        _id: Joi.allow(""),
        name: Joi.string().min(3).required(),
        definition: Joi.string().min(3).required(),
        relatedTerms: Joi.array().items(Joi.string()), 
        image: Joi.string().allow(""),
        difficultyLevel: Joi.string().valid('Beginner', 'Intermediate', 'Expert').required()

    });
    return schema.validate(terms);
};


app.listen(3001, () => {
    console.log("im listening");
});


