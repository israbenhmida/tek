// controllers/user.js
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { auth, invalidateRefreshToken } from '../middlewares/auth.js';
import { signAccessToken, signRefreshToken , verifyRefreshToken} from "../middlewares/auth.js";
import challenged from "../models/challenged.js";
import Company from "../models/company.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { validationResult } from "express-validator";
import ExcelJS from 'exceljs'

// Fonction pour créer un nouvel utilisateur
export async function createUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      firstname,
      lastname,
      phone,
      email,
      password,
      role,
      field,
      country,
      address,
      need,
      description,
      status,
      gender,
      securityQuestions
    } = req.body;
// Récupérer le chemin de l'image téléchargée
let imageUser;
if (req.files && req.file.filename) {
  imageUser = req.files.filename;
}
    // Hacher le mot de passe avec bcrypt
    const hashPass = await bcrypt.hash(password, 10);

    let user;

    if (role === "challenged") {
      user = await challenged.create({
        firstname,
        lastname,
        phone,
        email,
        password: hashPass,
        role,
        address,
        country,
        gender,
        status,
        securityQuestions,
        imageUser
      });
    } else if (role === "company") {
      user = await Company.create({
        firstname,
        phone,
        email,
        password: hashPass,
        role,
        address,
        country,
        need,
        description,
        field,
        securityQuestions, 
        imageUser
      });
    } else if (role === "admin" || role === "superAdmin") {
      // Vérifiez si l'utilisateur est autorisé à créer cet utilisateur
      if (!req.user.superAdmin && role === "superAdmin") {
        return res.status(403).json({ message: "Unauthorized action" });
      }

      user = await User.create({
        firstname,
        lastname,
        phone,
        email,
        password: hashPass,
        role: role === "admin" ? "admin" : "superAdmin",
      });
    }

    // Vérifiez si l'utilisateur est créé avec succès
    if (!user) {
      return res.status(500).json({ message: "User creation failed" });
    }

    // Générer des tokens
    const accessToken = await signAccessToken(user.id); 
    const refreshToken = await signRefreshToken(user.id);

    // Envoyer les tokens dans la réponse
    return res.status(201).json({ user, accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating user", error });
  }
}

// Fonction pour ajouter un nouvel administrateur
export async function addAdmin(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { firstname, lastname, phone, email, password } = req.body;

    const connect = req.auth.userId;
    console.log(connect);

    const Super = await User.findById(connect);
    const test = Super.role == "superAdmin";

    if (!test) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Hacher le mot de passe avec bcrypt
    const hashPass = await bcrypt.hash(password, 10);

    // Créer un nouvel administrateur
    const admin = await User.create({
      firstname,
      lastname,
      phone,
      email,
      password: hashPass,
      role: "admin",
    });

    // Générer des tokens
    const accessToken = await signAccessToken(admin.id);
    const refreshToken = await signRefreshToken(admin.id);

    // Envoyer les tokens dans la réponse
    await sendWelcomeEmail(admin);

    return res.status(201).json({ admin, accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error adding admin", error });
  }
}


export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "No user found",
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({
        message: "Password does not match",
      });
    }

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id); // Ajout du jeton de rafraîchissement

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken, // Ajout du jeton de rafraîchissement dans la réponse
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error logging in",
      error,
    });
  }
}
export async function registerGoogleUser(req, res) {
  try {
    console.log("Request Body:", req.body);  // Ajoutez cette ligne pour imprimer le corps de la requête

    const { firstname, email } = req.body;

    // Vérifier si l'e-mail est présent dans le corps de la requête
    if (!email) {
      return res.status(400).json({ message: 'Email is required in the request body' });
    }

    // Vérifier si l'utilisateur avec l'e-mail donné existe déjà
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      // L'utilisateur existe déjà, générer des tokens et renvoyer la réponse de connexion réussie
      const accessToken = await signAccessToken(existingUser.id);
      const refreshToken = await signRefreshToken(existingUser.id);

      return res.status(200).json({ user: existingUser, accessToken, refreshToken });
    }

    // Si l'utilisateur n'existe pas, créer un nouvel utilisateur
    const user = new User({
      firstname,
      email: email.toLowerCase(),
      role: 'challenged',
    });

    // Manually save the user without validation
    await user.save({ validateBeforeSave: false });

    // Générer des tokens pour le nouvel utilisateur
    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);

    // Renvoyer la réponse avec les tokens
    return res.status(201).json({ user, accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error registering Google user', error });
  }
}

export async function checkGoogleUserExistence(req, res) {
  try {
    const { email } = req.query;

    // Vérifiez si l'utilisateur avec l'e-mail donné existe déjà
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    return res.status(200).json({ exists: !!existingUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error checking Google user existence', error });
  }
}

export async function registerGitHubUser(req, res) {
  try {
    console.log('Request Body:', req.body);

    const { githubId, username, email } = req.body;

    // Check if the email is present in the request body
    if (!email) {
      return res.status(400).json({ message: 'Email is required in the request body' });
    }

    // Check if the user with the given email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      // User already exists, generate tokens and return successful login response
      const accessToken = await signAccessToken(existingUser.id);
      const refreshToken = await signRefreshToken(existingUser.id);

      return res.status(200).json({ user: existingUser, accessToken, refreshToken });
    }

    // If the user does not exist, create a new user
    const user = new User({
      githubId,
      username,
      email: email.toLowerCase(),
      role: 'challenged',
    });

    // Manually save the user without validation
    await user.save({ validateBeforeSave: false });

    // Generate tokens for the new user
    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);

    // Return the response with tokens
    return res.status(201).json({ user, accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error registering GitHub user', error });
  }
}

// Fonction pour rafraîchir le jeton d'accès
export async function refreshAccessToken(req, res) {
  try {
    // Récupérer le jeton de rafraîchissement depuis le corps de la requête
    const { refreshToken } = req.body;

    // Vérifier le jeton de rafraîchissement
    const userId = await verifyRefreshToken(refreshToken);

    // Générer un nouveau jeton d'accès
    const accessToken = await signAccessToken(userId);

    // Répondre avec le nouveau jeton d'accès
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error refreshing access token", error });
  }
}
export async function logout(req, res) {
  try {
    const userId = req.auth.userId;

    // Invalidate the refresh token
    await invalidateRefreshToken(userId);

    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    return res.status(500).json({ message: 'Error logging out', error });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    const users2 = [];

    for (let i = 0; i < users.length; i++) {
      if (users[i].role === "company" || users[i].role === "challenged") {
        users2.push(users[i]);
      }
      console.log(users[i]);
    }

    res.status(200).send(users2);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
}

export async function getAllAdminUsers(req, res) {
  try {
    const users = await User.find();
    const users2 = [];

    for (let i = 0; i < users.length; i++) {
      if (users[i].role === "company" || users[i].role === "challenged" || users[i].role === "admin") {
        users2.push(users[i]);
      }
      console.log(users[i]);
    }

    res.status(200).send(users2);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
}



export async function updateUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const  connect  = req.auth.userId;
  const  userId  = req.params.user;

  const updateData = req.body;

  try {
    console.log("Updating user with ID:", userId);
    console.log("Update data:", updateData);

    const admin = await User.findById(connect);


    const testad= admin.role=="admin" ;



    const verify = await User.findById(userId);

    

    if (!admin.role=="superAdmin" || ! admin.role=="admin") {
      return res.status(401).json({ message: "Unauthorized action" });
    }


    if (testad && verify.role == "superAdmin"  ) {
      return res.status(401).json({ message: "Unauthorized " });
    }



    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User updated successfully:", updatedUser);

    return res.json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating user", error });
  }
}

export function updateProfile(req, res) {
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(req.auth.userId)) {
    return res.status(400).json({ error: 'Invalid userId' });
  }

  if (req.file && req.file.filename) {
    const imagePath = req.file.filename;
    updateData.imageUser = imagePath;
  }

  User.findById(req.auth.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (user.role === 'challenged') {
        challenged
          .findOneAndUpdate({ _id: req.auth.userId }, updateData, { new: true })
          .then((updatedChallenged) => {
            res.status(200).json(updatedChallenged);
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      } else if (user.role === 'company') {
        Company.findOneAndUpdate({ _id: req.auth.userId }, updateData, { new: true })
          .then((updatedCompany) => {
            res.status(200).json(updatedCompany);
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}



export async function exportXls(req, res) {
  try {
    const users = await User.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Users');

    worksheet.columns = [
      {header : "FirstName", key :"firstname", width : 30},
      {header : "LastName", key :"lastname", width : 30},
      {header : "Phone", key :"phone", width : 14},
      {header : "Email", key :"email", width : 30},
      {header : "Role", key :"role", width : 30}
    ]

users.map((value,idx)=>{

  worksheet.addRow({
    firstname: value.firstname,
    lastname: value.lastname,
    phone: value.phone,
    email: value.email,
    role: value.role
  })
}
)


res.setHeader('Content-Type',
 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

 res.setHeader('Content-Disposition',
  'attachment;filename=users.xlsx');



workbook.xlsx.write(res);
console.log('Excel file created successfully:');

  } catch (error) {
    console.log(error);
  }
}



export async function getAllChallenged(req, res) {
  try {
    const users = await User.find();
    const users2 = [];

    for (let i = 0; i < users.length; i++) {
      if ( users[i].role === "challenged" ) {
        users2.push(users[i]);
      }
      console.log(users[i]);
    }

    res.status(200).send(users2);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }

}


export async function getAllAdmin(req, res) {
  try {
    const users = await User.find();
    const users2 = [];

    for (let i = 0; i < users.length; i++) {
      if ( users[i].role === "admin" ) {
        users2.push(users[i]);
      }
      console.log(users[i]);
    }

    res.status(200).send(users2);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }

}


export async function getAllCompany(req, res) {
  try {
    const users = await User.find();
    const users2 = [];

    for (let i = 0; i < users.length; i++) {
      if ( users[i].role === "company" ) {
        users2.push(users[i]);
      }
      console.log(users[i]);
    }

    res.status(200).send(users2);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }

}



export async function getAllAdminUserss(req, res) {
  try {
    const users = await User.find();
    const users2 = [];

    for (let i = 0; i < users.length; i++) {
      if (users[i].role === "company" ) {
        users2.push(users[i]);
      }
      console.log(users[i]);
    }

    res.status(200).send(users2);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
}

// Fonction pour supprimer un utilisateur
export async function deleteUser(req, res) {
  const { userid } = req.body;
  try {
    // Suppression de l'utilisateur avec l'ID donné
    const deletionResult = await User.deleteOne({ id: userid });

    // Vérification si l'utilisateur a été supprimé avec succès
    if (deletionResult.deletedCount === 1) {
      // Répondre avec un statut 200 et un message de succès si la suppression réussit
      return res.status(200).json({ status: "Ok", data: "Deleted" });
    } else {
      // Répondre avec un statut 404 si l'utilisateur n'a pas été trouvé
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Gérez les erreurs en renvoyant une réponse d'erreur
    console.error(error);
    return res.status(500).json({ message: "Error deleting user", error });
  }
}









/*

export async function deleteUser(req, res) {


  const  connect  = req.auth.userId;

  const { user } = req.params;


  const admin = await User.findById(connect);


  const testad= admin.role=="admin" ;



  const verify = await User.findById(user);

  

 /* if (!admin.role=="superAdmin" || ! admin.role=="admin") {
    return res.status(401).json({ message: "Unauthorized action" });
  }*/

/*
  if (testad && verify.role == "superAdmin"  ) {
    return res.status(401).json({ message: "Unauthorized " });
  }


  try {
    console.log("Deleting user with ID:", user);

    const userToDelete = await User.findById(user);

    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }



  if (!admin.role=="superAdmin" || ! admin.role=="admin") {
    return res.status(401).json({ message: "Unauthorized action" });
  }


  if (testad && verify.role == "superAdmin"  ) {
    return res.status(401).json({ message: "Unauthorized " });
  }


    const deletedUser = await User.findByIdAndDelete(user);

  

    return res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting user", error });
  }
}*/

export async function getUser(req, res, next) {
  const { userId } = req.params;

  try {
    console.log("Fetching user with ID:", userId);
    const user = await User.findById(userId);

    if (!user) {
      console.log("User not found");
      return next(); // Appeler next sans passer d'erreur active le middleware notFoundError
    }

    console.log("User found:", user);
    return res.json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching user", error });
  }
}


////////////////////////////////////////////////////////
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true pour TLS
  auth: {
    user: "tektaicontact@gmail.com",
    pass: "fvuzgaepgwbfidnz",
  },
});

async function sendWelcomeEmail(user) {

  
    // Définir les options d'e-mail
    let mailOptions = {
      from: "TEKTAI",
      to: user.email,
      subject: "Welcome to Our Application!",
      text: `Dear , ${user.firstname}!`,
      html: `<!doctype html>
  <html lang="en-US">
  <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>Welcome Email Template</title>
      <meta name="description" content="Welcome Email Template.">
      <style type="text/css">
          a:hover {text-decoration: underline !important;}
      </style>
  </head>
  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #ffffff;" leftmargin="0">
      <!--100% body table-->
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#ffffff"
          style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
          <tr>
              <td>
                  <table style="background-color: #ffffff; max-width:670px;  margin:0 auto;" width="100%" border="0"
                      align="center" cellpadding="0" cellspacing="0">
                      <tr>
                          <td style="height:80px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="text-align:center;">
                              <h1 style="color:#2a4d69; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Welcome to Our Platform</h1>
                              <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                              <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                  Thank you for joining our platform. We are excited to have you as a member of our community.
                              </p>
                              <a href="#" style="background:#0dcaf0;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Get Started</a>
                          </td>
                      </tr>
                      <tr>
                          <td style="height:40px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="text-align:center;">
                              <p style="font-size:14px; color:#a0aec0; line-height:18px; margin:0 0 0;">&copy; <strong>www.tektai.com</strong></p>
                          </td>
                      </tr>
                      <tr>
                          <td style="height:80px;">&nbsp;</td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
      <!--/100% body table-->
  </body>
  </html>
  `,
    };
  
    // Envoyer l'e-mail
    let info = await transporter.sendMail(mailOptions);
  
    console.log("Message sent: %s", info.messageId);
  }

  export async function SendCodeForgot(req, res, next) {
    const userMail = await User.findOne({ email: req.body.email.toLowerCase() });
    console.log(userMail);
  
    if (!userMail) {
      res.status(202).json({
        message: "email not found",
      });
    } else {
      var RandomXCode = Math.floor(1000 + Math.random() * 9000);
      console.log(RandomXCode);
      //
  
      var mailOptions = {
        from: "TEKTAI",
        to: req.body.email,
        text: "Forget Password?",
        subject: "Password Reset",
        html: `<!DOCTYPE html>
        <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
          <head>
            <title></title>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <meta content="width=device-width, initial-scale=1.0" name="viewport" />
            <!--[if mso]>
            <xml>
              <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
                <o:AllowPNG/>
              </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
            <!--[if !mso]>
            <!-->
            <link href="https://fonts.googleapis.com/css?family=Abril+Fatface" rel="stylesheet" type="text/css" />
            <link href="https://fonts.googleapis.com/css?family=Alegreya" rel="stylesheet" type="text/css" />
            <link href="https://fonts.googleapis.com/css?family=Arvo" rel="stylesheet" type="text/css" />
            <link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css" />
            <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css" />
            <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" type="text/css" />
            <!--
            <![endif]-->
            <style>
              * {
                box-sizing: border-box;
              }
        
              body {
                margin: 0;
                padding: 0;
              }
        
              a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: inherit !important;
              }
        
              #MessageViewBody a {
                color: inherit;
                text-decoration: none;
              }
        
              p {
                line-height: inherit
              }
        
              .desktop_hide,
              .desktop_hide table {
                mso-hide: all;
                display: none;
                max-height: 0px;
                overflow: hidden;
              }
        
              @media (max-width:520px) {
                .desktop_hide table.icons-inner {
                  display: inline-block !important;
                }
        
                .icons-inner {
                  text-align: center;
                }
        
                .icons-inner td {
                  margin: 0 auto;
                }
        
                .image_block img.big,
                .row-content {
                  width: 100% !important;
                }
        
                .mobile_hide {
                  display: none;
                }
        
                .stack .column {
                  width: 100%;
                  display: block;
                }
        
                .mobile_hide {
                  min-height: 0;
                  max-height: 0;
                  max-width: 0;
                  overflow: hidden;
                  font-size: 0px;
                }
        
                .desktop_hide,
                .desktop_hide table {
                  display: table !important;
                  max-height: none !important;
                }
              }
            </style>
          </head>
          <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
            <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;" width="100%">
              <tbody>
                <tr>
                  <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5;" width="100%">
                      <tbody>
                        <tr>
                          <td>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                              <tbody>
                                <tr>
                                  <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                                    <table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                      <tr>
                                        <td class="pad" style="padding-bottom:10px;width:100%;padding-right:0px;padding-left:0px;">
                                          <br>
                                          <br>
                                          <br>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5;" width="100%">
                      <tbody>
                        <tr>
                          <td>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 500px;" width="500">
                              <tbody>
                                <tr>
                                  <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 15px; padding-bottom: 20px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                                    <table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                      <tr>
                                        <td class="pad" style="padding-bottom:5px;padding-left:5px;padding-right:5px;width:100%;">
                                          <div align="center" class="alignment" style="line-height:10px">
                                            <img alt="reset-password" class="big" src="https://i.ibb.co/9g5fBQW/gif-resetpass.gif" style="display: block; height: auto; border: 0; width: 350px; max-width: 100%;" title="reset-password" width="350" />
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                      <tr>
                                        <td class="pad" style="text-align:center;width:100%;">
                                          <h1 style="margin: 0; color: #393d47; direction: ltr; font-family: Tahoma, Verdana, Segoe, sans-serif; font-size: 25px; font-weight: normal; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;">
                                            <strong>Forgot your password?</strong>
                                          </h1>
                                        </td>
                                      </tr>
                                    </table>
                                    <table border="0" cellpadding="10" cellspacing="0" class="text_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                                      <tr>
                                        <td class="pad">
                                          <div style="font-family: Tahoma, Verdana, sans-serif">
                                            <div class="" style="font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 18px; color: #393d47; line-height: 1.5;">
                                              <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 21px;">
                                                <span style="font-size:14px;">
                                                  <span style="">Not to worry, we got you! </span>
                                                  <span style="">Let’s get you a new password.</span>
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table border="0" cellpadding="15" cellspacing="0" class="button_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                      <tr>
                                        <td class="pad">
                                          <div align="center" class="alignment">
                                            <!--[if mso]>
                                                  <v:roundrect
                                                    xmlns:v="urn:schemas-microsoft-com:vml"
                                                    xmlns:w="urn:schemas-microsoft-com:office:word" href="www.yourwebsite.com" style="height:58px;width:272px;v-text-anchor:middle;" arcsize="35%" strokeweight="0.75pt" strokecolor="#FFC727" fillcolor="#ffc727">
                                                    <w:anchorlock/>
                                                    <v:textbox inset="0px,0px,0px,0px">
                                                      <center style="color:#393d47; font-family:Tahoma, Verdana, sans-serif; font-size:18px">
                                                        <![endif]-->
                                            <a style="text-decoration:none;display:inline-block;color:#393d47;background-color:#ffc727;border-radius:20px;width:auto;border-top:1px solid #FFC727;font-weight:undefined;border-right:1px solid #FFC727;border-bottom:1px solid #FFC727;border-left:1px solid #FFC727;padding-top:10px;padding-bottom:10px;font-family:Tahoma, Verdana, Segoe, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;" target="_blank">
                                              <span style="padding-left:50px;padding-right:50px;font-size:18px;display:inline-block;letter-spacing:normal;">
                                                <span style="word-break: break-word;">
                                                  <span data-mce-style="" style="line-height: 36px;">
                                                    <strong>${RandomXCode}</strong>
                                                  </span>
                                                </span>
                                              </span>
                                            </a>
                                            <!--[if mso]>
                                                      </center>
                                                    </v:textbox>
                                                  </v:roundrect>
                                                  <![endif]-->
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table border="0" cellpadding="0" cellspacing="0" class="text_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                                      <tr>
                                        <td class="pad" style="padding-bottom:5px;padding-left:10px;padding-right:10px;padding-top:10px;">
                                          <div style="font-family: Tahoma, Verdana, sans-serif">
                                            <div class="" style="font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; text-align: center; mso-line-height-alt: 18px; color: #393d47; line-height: 1.5;">
                                              <p style="margin: 0; mso-line-height-alt: 19.5px;">
                                                <span style="font-size:13px;">If you didn’t request to change your password, simply ignore this email.</span>
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5;" width="100%">
                      <tbody>
                        <tr>
                          <td>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                              <tbody>
                                <tr>
                                  <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                                    <table border="0" cellpadding="15" cellspacing="0" class="text_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                                      <tr>
                                        <td class="pad">
                                          <div style="font-family: Tahoma, Verdana, sans-serif">
                                            <div class="" style="font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #393d47; line-height: 1.2;">
                                              <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;">
                                                <span style="font-size:10px;">If you continue to have problems</span>
                                                <br />
                                                <span style="font-size:10px;">please feel free to contact us at discoverytn@zohomail.com. </span>
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                      <tbody>
                        <tr>
                          <td>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                              <tbody>
                                <tr>
                                  <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 5px; padding-bottom: 5px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                                    <table border="0" cellpadding="0" cellspacing="0" class="icons_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                      <tr>
                                        <td class="pad" style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
                                          <table cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                            <tr>
                                              <td class="alignment" style="vertical-align: middle; text-align: center;">
                                                <!--[if vml]>
                                                      <table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                                        <![endif]-->
                                                <!--[if !vml]>
                                                        <!-->
                                                <table cellpadding="0" cellspacing="0" class="icons-inner" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;">
                                                  <!--
                                                          <![endif]-->
                                                  <tr></tr>
                                                </table>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- End -->
          </body>
        </html>`,
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.json({ message: "error sending" });
          console.log(error);
        } else {
          res.status(200).json({
            message: "haw el mail wselek jawk behi erfess",
          });
          User.findOneAndUpdate(
            { email: req.body.email },
            { codeForget: RandomXCode },
            { new: true }
          )
            .then((updatedUser) => {
              console.log(updatedUser); // log the updated user document
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  }
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  export async function VerifCodeForgot(req, res, next) {
    const { email, codeForget } = req.body;
    if (!email || !codeForget) {
      return res.status(400).json({ error: "Something is missing" });
    } else {
      const user = await User.findOne({ email: req.body.email });
      console.log(req.body.email);
      console.log("Code enter by the User ==> " + req.body.codeForget);
      console.log("Code ons the Database ==> " + user.codeForget);
      //////////////////////////////////////////////////////
      if (req.body.codeForget == user.codeForget && user.codeForget != "") {
        return res.status(200).json({ message: "Code Has been verified!" });
      }
      //////////////////////////////////////////////////////////
      if (req.body.codeForget != user.codeForget && user.codeForget != "") {
        console.log("Sorry! The code is incorrect!");
        return res.status(402).json({ message: "Sorry! The code is incorrect!" });
      }
      if (user.codeForget == "") {
        return res
          .status(401)
          .json({ message: "Sorry! There is no code in Database!" });
      }
    }
  }
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  export async function ChangePasswordForgot(req, res, next) {
    const { email, codeForget, password } = req.body;
    if (!email || !codeForget || !password) {
      return res.status(422).json({ error: "Something is missing" });
    } else {
      //
      const user = await User.findOne({ email: req.body.email });
      if (req.body.codeForget == user.codeForget && user.codeForget != "") {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(400).json({
              error: err,
            });
          } else {
            user.password = hash;
            user.codeForget = "";
            user.save().then((user) => {
              return res
                .status(200)
                .json({ message: "Congratulations, Password changed!" });
            });
          }
        });
      } else {
        return res.status(402).json({ message: "Sorry! The code is incorrect!" });
      }
    }
  }
  export async function VerifyAnswers(req, res, next) {
    try {
      const { email, questions } = req.body;
  
      const user = await User.findOne({ email: email.toLowerCase() });
  
      if (!user) {
        return res.status(202).json({
          message: "email not found",
        });
      }
  
      // Récupération des réponses aux questions de sécurité enregistrées pour cet utilisateur
      const securityQuestions = user.securityQuestions;
  
      // Vérification que les réponses fournies par l'utilisateur correspondent à celles enregistrées dans la base de données
      const isAnswersMatch = securityQuestions.every((question, index) => {
        // Comparaison insensible à la casse des réponses
        return question === questions[index];
      });
  
      if (isAnswersMatch) {
        // Réponses correctes
        return res.status(200).json({
          message: "Réponses correctes aux questions de sécurité",
        });
      } else {
        // Réponses incorrectes
        return res.status(401).json({
          message: "Réponses incorrectes aux questions de sécurité",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la vérification des réponses:", error);
      return res.status(500).json({
        message: "Erreur lors de la vérification des réponses",
        error: error,
      });
    }
  }