const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const { User, Law } = require("./usermodel"); 
const { link } = require("fs");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Landing Page
app.get("/", (req, res) => { res.render("landingpage"); });

app.get("/RightAndLaws", (req, res) => {
  const laws = [
    {
      title: "Right to Protection",
      description: "You have the right to be protected from violence and abuse under the Protection of Women from Domestic Violence Act, 2005.",
      section: "Domestic Violence Act, 2005",
      category: "Safety",
      link: "https://www.indiacode.nic.in/handle/123456789/15709"
    },
    {
      title: "Right to Residence",
      description: "You have the right to reside in your matrimonial home and cannot be evicted without due process of law.",
      section: "Section 17, Domestic Violence Act",
      category: "Residence",
      link:"https://indiankanoon.org/search/?formInput=right%20to%20residence"
    },
    {
      title: "Right to Legal Aid",
      description: "Free legal assistance is available through Legal Services Authorities and protection officers.",
      section: "Legal Services Authorities Act",
      category: "Legal Aid",
      link:"https://dlwb.delhi.gov.in/dlwb/free-legal-aid-center#:~:text=The%20Delhi%20Legal%20Services%20Authority,all%20who%20deservedly%20approach%20it."
    },
    {
      title: "Right to Information",
      description: "You have the right to know about available services, legal procedures, and your constitutional rights.",
      section: "RTI Act, 2005",
      category: "Information",
      link:"https://rti.dopt.gov.in/"
    },
    {
      title: "Right to Maintenance",
      description: "You are entitled to financial support for yourself and your children from your spouse.",
      section: "Section 125, CrPC",
      category: "Maintenance",
      link:"https://www.thedivorcelawfirm.in/pdf/Right-to-Maintenance.pdf"
    },
    {
      title: "Right to Emergency Services",
      description: "Immediate access to emergency services, shelter homes, counseling, and temporary support.",
      section: "Protection Officers & Local Authorities",
      category: "Emergency",
      link:"https://ijrpr.com/uploads/V6ISSUE6/IJRPR48272.pdf"
    },
    {
    title: "Right Against Harassment at Workplace",
    description: "You are protected against sexual harassment at the workplace under the POSH Act, 2013.",
    section: "Sexual Harassment of Women at Workplace Act, 2013",
    category: "Workplace",
    link:"https://jotwani.com/mental-harassment-at-workplace-understanding-its-implications-and-legal-safeguards-in-india/"
  },
  {
    title:"Right Against Dowry",
    description:"Giving or demanding dowry is illegal and punishable under the Dowry Prohibition Act, 1961.",
    section:"Dowry Prohibition Act, 1961",
    category:"Marriage",
    link:"https://www.indiacode.nic.in/bitstream/123456789/5556/1/dowry_prohibition.pdf"
  },
   {
    title: "Right to Maternity Benefits",
    description: "Women are entitled to maternity leave and job protection under the Maternity Benefit Act, 1961.",
    section: "Maternity Benefit Act, 1961",
    category: "Workplace",
    link:"https://labour.gov.in/sites/default/files/the_maternity_benefit_act_1961_0.pdf"
  }
  ];

  res.render("RightAndLaws", { laws });
});

// FIR Guide Page
app.get("/FirGuide", (req, res) => {
  res.render("FirGuide");
});

// Find Help Page
app.get("/FindHelp", (req, res) => {
  res.render("FindHelp");
});

app.post("/request-help", (req, res) => {
  const { name, email, phone, message } = req.body;
  console.log("Help Request Received:", req.body);

  // Redirect back to FindHelp page with a success flag
  res.redirect("/FindHelp?success=1");
});

app.get("/Blog",(req,res)=>{
  res.render("Blog");
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
