
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


// app.get("/api/terms", async (req, res) => {
//   try {
//       const terms = await Term.find();
//       //Removes images/. redundancy
//       const termsWithoutPrefix = terms.map(term => ({
//           ...term.toObject(),
//           image: term.image.replace('images/', '')
//       }));
//       res.json(termsWithoutPrefix);
//   } catch (error) {
//       console.error("Error fetching terms:", error);
//       res.status(500).send("Internal Server Error");
//   }
// });

app.get("/api/terms", async (req, res) => {
  try {
      const terms = await Term.find();  
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
    termsData.push(term)
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
      fieldsToUpdate.image_name = "images/" + req.file.filename; 
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

  let termsData = [
    {
      "_id": 1,
      "name": "Julienne",
      "definition": "A culinary knife cut in which the food item is cut into long thin strips, similar to matchsticks. Common items to be julienned are carrots for carrots julienne, celery for céléris remoulade, potatoes for julienne fries, or cucumbers for naengmyeon.",
      "image": "images/julienne.jpg",
      "relatedTerms": ["Chop", "Dice", "Mince"],
      "difficultyLevel": "Intermediate"
    },
    {
      "_id": 2,
      "name": "Sauté",
      "definition": "To cook food over high heat, usually in butter or oil. Many recipes begin by instructing you to saute onions and garlic in olive oil.",
      "image": "images/saute.jpg",
      "relatedTerms": ["Fry", "Stir-Fry", "Pan-Fry"],
      "difficultyLevel": "Beginner"
    },
    {
      "_id": 3,
      "name": "Blanching",
      "definition": "Blanching is a cooking process in which a food, usually a vegetable or fruit, is scalded in boiling water, removed after a brief timed interval, and finally plunged into iced water or placed under cold running water to halt the cooking process. Blanching foods helps reduce quality loss over time.",
      "image": "images/blanching.jpg",
      "relatedTerms": ["Boiling", "Cooling", "Preserving"],
      "difficultyLevel": "Beginner"
    },
    {
      "_id": 4,
      "name": "Broil",
      "definition": "Broiling is a dry-heat cooking method that involves exposing food to direct, intense heat from an overhead broiler element or flame. It's a bit like upside-down grilling.",
      "image": "images/broil.jpg",
      "relatedTerms": ["Grilling", "Roasting", "Baking"],
      "difficultyLevel": "Intermediate"
    },
    {
      "_id": 5,
      "name": "Simmering",
      "definition": "Simmering is a food preparation technique by which foods are cooked in hot liquids kept just below the boiling point of water and above poaching temperature. To create a steady simmer, a liquid is brought to a boil, then its heat source is reduced to a lower, constant intensity.",
      "image": "images/simmering.jpg",
      "relatedTerms": ["Boiling", "Poaching", "Steaming"],
      "difficultyLevel": "Beginner"
    },
    {
      "_id": 6,
      "name": "Roasting",
      "definition": "Roasting is a cooking method that involves cooking food, typically meat, poultry, and vegetables, in an oven or over a fire. By exposing the food to high heat, roasting can create a flavorful crust on the outside while keeping the interior moist.",
      "image": "images/roasting.jpg",
      "relatedTerms": ["Baking", "Grilling", "Broiling"],
      "difficultyLevel": "Beginner"
    },
    {
      "_id": 7,
      "name": "Dicing",
      "definition": "Dicing is a culinary knife cut in which the food item is cut into small blocks or dice. This may be done for aesthetic reasons or to create uniformly sized pieces to ensure even cooking. Dicing allows for distribution of flavour and texture throughout the dish, as well as a somewhat quicker cooking time.",
      "image": "images/dicing.jpg",
      "relatedTerms": ["Chopping", "Minicing", "Slicing"],
      "difficultyLevel": "Intermediate"
    },
    {
      "_id": 8,
      "name": "Beating",
      "definition": "Beating is the process of rapidly mixing or stirring ingredients until they are blended. Beating incorporates air into the mixture and can be done by hand or with a mixer.",
      "image": "images/beating.jpg",
      "relatedTerms": ["Whisking", "Mixing", "Stirring"],
      "difficultyLevel": "Beginner"
    }
   
  ]

