var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const auth = require('../authentification/auth');
const userController = require('../controller/UserController')
const historiqueController = require('../controller/HistoriqueAchatController')
router.get('/', userController.getUtilisateurs);

router.get('/transactions',auth, historiqueController.getHistorique );

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const client = new MongoClient('mongodb+srv://tsanta:ETU001146@cluster0.6oftdrm.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true });
    await client.connect();
    const db = client.db("hiu");
    let user = await db.collection("user").findOne({ email: email });
    if (!user) 
    {
        return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

   

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) 
    {
        return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    if (user.estValide !== "par-admin") 
    {
        return res.status(401).json({ message: "Utilisateur non validé" });
    }

    const token = jwt.sign({ id: user._id }, "Tsanta", { expiresIn: 86400 });

    res.status(200).json({ user: user, token: token });

    client.close();
});

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

router.post('/register', async (req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConf = req.body.passwordConf;
    const fonction = req.body.fonction;
    const numero = req.body.numero;
    const adresse = req.body.adresse;
    

    if (password !== passwordConf) {
        console.log({ message: "Les mots de passe ne correspondent pas" });
        return res.status(400).json({ message: "Les mots de passe ne correspondent pas" });
    }

    if (!emailRegex.test(email)) {
        console.log({ message: "Adresse e-mail non valide" });
        return res.status(400).json({ message: "Adresse e-mail non valide" });
    }

    if (!/[A-Z]/.test(password)) {
        console.log({ message: "Le mot de passe doit contenir au moins une lettre majuscule" });
        return res.status(400).json({ message: "Le mot de passe doit contenir au moins une lettre majuscule" });
    }

    if (!/[a-z]/.test(password)) {
        console.log({ message: "Le mot de passe doit contenir au moins une lettre minuscule" });
        return res.status(400).json({ message: "Le mot de passe doit contenir au moins une lettre minuscule" });
    }

    if (!/[0-9]/.test(password)) {
        console.log({ message: "Le mot de passe doit contenir au moins un chiffre" });
        return res.status(400).json({ message: "Le mot de passe doit contenir au moins un chiffre" });
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
        console.log({ message: "Le mot de passe doit contenir au moins un caractère spécial" });
        return res.status(400).json({ message: "Le mot de passe doit contenir au moins un caractère spécial" });
    }

    if (password.length < 8) {
        console.log({ message: "Le mot de passe doit contenir au moins 8 caractères" });
        return res.status(400).json({ message: "Le mot de passe doit contenir au moins 8 caractères" });
    }

    const client = new MongoClient('mongodb+srv://tsanta:ETU001146@cluster0.6oftdrm.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true });
    await client.connect();
    const db = client.db("hiu");

    const emailExists = await db.collection("user").findOne({ email: email });

    if (emailExists) 
    {
        console.log({ message: "E-mail est déjà utilisée" });
        return res.status(400).json({ message: "E-mail est déjà utilisée" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = {
        nom,
        prenom,
        profil : "https://firebasestorage.googleapis.com/v0/b/hiu-interne.appspot.com/o/avatar.png?alt=media&token=d0b3db12-8fee-4482-ad2f-d7c237e908c4",
        role: "user" ,
        fonction,
        email,
        password : hash ,
        numero ,
        adresse ,
        estValide : "non",
        ability : [
            {
                action : "manage",
                subject : "for-user"
            }
        ]
    };

    const { insertedId } = await db.collection("user").insertOne(newUser);

    const token = jwt.sign({ id: insertedId }, "Tsanta", { expiresIn: 86400 });

    const verificationLink = `http://localhost:3000/user/verify?token=${token}`;
    

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "healthycar00reply@gmail.com",
            pass: "hswviujoemmcbvcg"
        }
    });
    
    const mailOptions = {
        from: "healthycar00reply@gmail.com",
        to: email,
        subject: 'Validation de compte',
        text: `Cliquez sur ce lien pour valider votre compte: ${verificationLink}`,
        html: `<p>Cliquez sur ce lien pour valider votre compte: <a href="${verificationLink}">${verificationLink}</a></p>`,
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log({ message: error });
            return res.status(400).json({ message: error });
        }else{
            console.log({ message: "vous allez recevoir un email de verification pour confirmer votre inscription" });
            res.status(201).json({ user: newUser , message: "vous allez recevoir un email de verification pour confirmer votre inscription" });
        }
    });
    client.close();
});


router.get('/verify', async (req, res) => {
    const token = req.query.token;
    if (!token) { return res.status(401).json({ message: 'Aucun token, autorisation refusée' }); }
    try {
        const client = new MongoClient('mongodb+srv://tsanta:ETU001146@cluster0.6oftdrm.mongodb.net/?retryWrites=true&w=majority',{ useUnifiedTopology: true });
        await client.connect();
        const db = client.db("hiu");
        const decoded = jwt.verify(token, 'Tsanta');
        const user = await db.collection("user").findOne({ _id: new ObjectId(decoded.id) });
        if (!user) { return res.status(404).json({ message: 'Utilisateur non trouvé' }); }
        await db.collection("user").updateOne({ _id: new ObjectId(decoded.id) }, { $set: { estValide: "par-email" } });
        res.status(200).json({ message: "En attente de validation de l'Administrateur , vous allez etres notifié par email " });
    } catch (err) {
        res.status(400).json({ message: 'Token non valide' });
    }
});


router.get('/pending', async (req, res) => {
    try {
        const client = new MongoClient('mongodb+srv://tsanta:ETU001146@cluster0.6oftdrm.mongodb.net/?retryWrites=true&w=majority',{ useUnifiedTopology: true });
        await client.connect();
        const db = client.db("hiu");
        const users = await db.collection("user").find({estValide: {$ne: 'par-admin'}}).toArray(); 
        res.status(200).json(users); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.get('/all', async (req, res) => {
    try {
        const client = new MongoClient('mongodb+srv://tsanta:ETU001146@cluster0.6oftdrm.mongodb.net/?retryWrites=true&w=majority',{ useUnifiedTopology: true });
        await client.connect();
        const db = client.db("hiu");
        const users = await db.collection("user").find().toArray(); 
        res.status(200).json(users); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.get('/:idUser', async (req, res) => {
    try {
        const client = new MongoClient('mongodb+srv://tsanta:ETU001146@cluster0.6oftdrm.mongodb.net/?retryWrites=true&w=majority',{ useUnifiedTopology: true });
        await client.connect();
        const db = client.db("hiu");
        const token = jwt.sign({ id: req.params.idUser }, "Tsanta", { expiresIn: 86400 });
        res.status(200).json(token); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.put('/validate/:idUser', auth ,  async (req, res) => {

        const idadmin = req.user.id;
        const client = new MongoClient('mongodb+srv://tsanta:ETU001146@cluster0.6oftdrm.mongodb.net/?retryWrites=true&w=majority',{ useUnifiedTopology: true });
        await client.connect();
        const idUser = req.params.idUser;
        const db = client.db("hiu");

        const admin = await db.collection("user").findOne({ _id: new ObjectId(idadmin) });
        if (admin.role !== "admin") { return res.status(404).json({ message: 'Non autorisé' }); }

        const user = await db.collection("user").findOneAndUpdate({ _id: new ObjectId(idUser) }, { $set: { estValide: "par-admin" } }, { returnOriginal: false });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "healthycar00reply@gmail.com",
                pass: "hswviujoemmcbvcg"
            }
        });
        
        const mailOptions = {
            from: "healthycar00reply@gmail.com",
            to: user.value.email,
            subject: 'Authorisation',
            html: `<h1>Votr compte a été validé par l'administrateur</h1>`,
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                return res.status(400).json({ message: error });
            }else{
                res.status(201).json({  message: "Inscription finalisé" });
            }
        });
        client.close();

});


module.exports = router;