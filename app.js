require("dotenv").config();   // load .env before anything else
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const { Groq } = require("groq-sdk");
const { User, Law } = require("./usermodel");

const app = express();

// ✅ Initialize OpenAI once
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ---------------- Chatbot ----------------
app.get("/chatbot", (req, res) => {
  res.render("Chatbot");
});

app.post("/chatbot", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are a legal assistant for women in India...",
        },
        { role: "user", content: userMessage },
      ],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error("❌ Groq Error:", err);
    res.status(500).json({ reply: "⚠️ Something went wrong with Groq." });
  }
});

// ---------------- Pages ----------------
app.get("/", (req, res) => {
  res.render("landingpage");
});

app.get("/RightAndLaws", (req, res) => {
  const laws = [
    {
      title: "Right to Protection",
      description:
        "You have the right to be protected from violence and abuse under the Protection of Women from Domestic Violence Act, 2005.",
      section: "Domestic Violence Act, 2005",
      category: "Safety",
      link: "https://www.indiacode.nic.in/handle/123456789/15709",
    },
    {
      title: "Right to Residence",
      description:
        "You have the right to reside in your matrimonial home and cannot be evicted without due process of law.",
      section: "Section 17, Domestic Violence Act",
      category: "Residence",
      link: "https://indiankanoon.org/search/?formInput=right%20to%20residence",
    },
    {
      title: "Right to Legal Aid",
      description:
        "Free legal assistance is available through Legal Services Authorities and protection officers.",
      section: "Legal Services Authorities Act",
      category: "Legal Aid",
      link: "https://dlwb.delhi.gov.in/dlwb/free-legal-aid-center",
    },
    {
      title: "Right to Information",
      description:
        "You have the right to know about available services, legal procedures, and your constitutional rights.",
      section: "RTI Act, 2005",
      category: "Information",
      link: "https://rti.dopt.gov.in/",
    },
    {
      title: "Right to Maintenance",
      description:
        "You are entitled to financial support for yourself and your children from your spouse.",
      section: "Section 125, CrPC",
      category: "Maintenance",
      link: "https://www.thedivorcelawfirm.in/pdf/Right-to-Maintenance.pdf",
    },
    {
      title: "Right to Emergency Services",
      description:
        "Immediate access to emergency services, shelter homes, counseling, and temporary support.",
      section: "Protection Officers & Local Authorities",
      category: "Emergency",
      link: "https://ijrpr.com/uploads/V6ISSUE6/IJRPR48272.pdf",
    },
    {
      title: "Right Against Harassment at Workplace",
      description:
        "You are protected against sexual harassment at the workplace under the POSH Act, 2013.",
      section: "Sexual Harassment of Women at Workplace Act, 2013",
      category: "Workplace",
      link: "https://jotwani.com/mental-harassment-at-workplace",
    },
    {
      title: "Right Against Dowry",
      description:
        "Giving or demanding dowry is illegal and punishable under the Dowry Prohibition Act, 1961.",
      section: "Dowry Prohibition Act, 1961",
      category: "Marriage",
      link: "https://www.indiacode.nic.in/bitstream/123456789/5556/1/dowry_prohibition.pdf",
    },
    {
      title: "Right to Maternity Benefits",
      description:
        "Women are entitled to maternity leave and job protection under the Maternity Benefit Act, 1961.",
      section: "Maternity Benefit Act, 1961",
      category: "Workplace",
      link: "https://labour.gov.in/sites/default/files/the_maternity_benefit_act_1961_0.pdf",
    },
  ];

  res.render("RightAndLaws", { laws });
});

app.get("/FirGuide", (req, res) => res.render("FirGuide"));
app.get("/FindHelp", (req, res) => res.render("FindHelp"));
app.get("/Blog", (req, res) => res.render("Blog"));

app.post("/request-help", (req, res) => {
  console.log("Help Request Received:", req.body);
  res.redirect("/FindHelp?success=1");
});

// ---------------- Start Server ----------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
