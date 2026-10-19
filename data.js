/*
  EDIT THIS FILE to personalize your portfolio.
  Replace placeholder links and sample entries with accurate information.
  Project fields: title, category, status, icon, description, tech, github, demo, caseStudy
  Use an empty string for links that are not ready yet.
*/
window.PORTFOLIO_DATA = {
  profile: {
    name: "Sushant Nikam",
    role: "Java Backend Developer",
    email: "YOUR_EMAIL@example.com",
    github: "https://github.com/YOUR_GITHUB_USERNAME",
    linkedin: "https://www.linkedin.com/in/YOUR_LINKEDIN_USERNAME/",
    resume: "assets/resume.pdf",
    about: "I'm a Java backend developer who enjoys building practical applications with Spring Boot, working through engineering challenges, and learning how to make software more reliable. I’m especially interested in backend architecture, API design, databases, testing, deployment, and useful AI integrations.",
    interests: ["Backend Engineering", "System Design", "Problem Solving", "AI Integration", "Continuous Learning"]
  },
  projects: [
    {
      title: "AI-Powered DSA Practice Platform",
      category: "Backend · AI Integration",
      status: "In development",
      icon: "⌘",
      description: "A coding-practice platform designed to generate programming questions, accept Java submissions, and evaluate solutions against test cases.",
      tech: ["Java", "Spring Boot", "JPA", "Ollama", "H2 / PostgreSQL"],
      github: "https://github.com/YOUR_GITHUB_USERNAME/YOUR_DSA_REPOSITORY",
      demo: "",
      caseStudy: ""
    },
    {
      title: "German Exam & Speaking Practice Platform",
      category: "Full application · AI APIs",
      status: "In development",
      icon: "◖",
      description: "A language-practice application for generating exam material and supporting listening and speaking workflows through AI and audio services.",
      tech: ["Java", "Spring Boot", "PostgreSQL", "AI APIs", "Audio"],
      github: "https://github.com/YOUR_GITHUB_USERNAME/YOUR_GERMAN_APP_REPOSITORY",
      demo: "",
      caseStudy: ""
    },
    {
      title: "RAG Document Assistant",
      category: "Optional future project",
      status: "Planned",
      icon: "✳",
      description: "A proposed document Q&A application that retrieves relevant source passages and grounds answers in a collection of technical documents.",
      tech: ["Java", "Spring AI", "PostgreSQL", "pgvector"],
      github: "",
      demo: "",
      caseStudy: ""
    }
  ],
  skills: [
    { title: "Backend Development", items: ["Java", "Spring Boot", "REST APIs", "Spring Data JPA", "Maven"] },
    { title: "Databases", items: ["SQL", "PostgreSQL", "MySQL", "H2", "Database Design"] },
    { title: "Testing & Quality", items: ["JUnit", "Mockito", "API Testing", "Debugging", "Exception Handling"] },
    { title: "Tools & Deployment", items: ["Git", "Linux", "Docker", "Nginx", "GitHub Actions"] },
    { title: "AI Integration", items: ["LLM APIs", "Ollama", "Prompt Design", "RAG (learning / if applicable)"] },
    { title: "Core Concepts", items: ["OOP", "Data Structures", "Algorithms", "Concurrency", "System Design"] }
  ],
  experience: [
    {
      role: "Java Developer",
      company: "YOUR COMPANY NAME",
      dates: "YYYY – Present",
      description: "Replace this sample with your real responsibilities: the applications you work on, APIs or services you develop, database work, testing, production support, and measurable outcomes. Do not include confidential company information."
    }
  ],
  education: [
    {
      qualification: "YOUR DEGREE / QUALIFICATION",
      institution: "YOUR COLLEGE / UNIVERSITY",
      details: "Graduation year · Relevant coursework or achievement",
      label: "Education"
    },
    {
      qualification: "CERTIFICATION OR COURSE",
      institution: "ISSUING ORGANIZATION",
      details: "Completion year · Add only completed, relevant credentials",
      label: "Certification"
    }
  ]
};
