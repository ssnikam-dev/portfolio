/*
  EDIT THIS FILE to personalize your portfolio.
  Replace placeholder links and sample entries with accurate information.
  Project fields: title, category, status, icon, description, tech, github, demo, caseStudy
  Use an empty string for links that are not ready yet.
*/
window.PORTFOLIO_DATA = {
  profile: {
    name: "Sushant Nikam",
    role: "Java Full Stack Developer",
    email: "sushantnikam2040@gmail.com",
    github: "https://github.com/ssnikam-dev/",
    linkedin: "https://www.linkedin.com/in/sushant-nikam-127a90134/",
    resume: "assets/resume.pdf",
    about: "I'm a Java Full Stack developer who enjoys building practical applications with Spring Boot, working through engineering challenges, and learning how to make software more reliable. I’m especially interested in backend and cloud architecture, API design, databases, testing, deployment, and useful AI integrations.",
    interests: ["Backend Engineering", "System Design", "Problem Solving", "AI Integration", "Continuous Learning"]
  },
  projects: [
    {
      title: "Kartly",
      category: "Scalable E-Commerce React+Microservices",
      status: "Completed",
      icon: "⌘",
      description: "A modern multi-role e-commerce platform: shop as a customer, sell and fulfil as a seller, and configure the whole marketplace as an admin.",
      tech: ["Java", "Spring Boot", "React", "Microservices", "PostgreSQL","AWS S3","Kafka"],
      github: "https://github.com/ssnikam-dev/Kartly",
      demo: "https://kartly-smoky.vercel.app/",
      caseStudy: ""
    },
    {
      title: "FoodSwift",
      category: "Cloud-Native Food Delivery | Angular + Microservices",
      status: "Completed",
      icon: "◖",
      description: "A cloud-native food delivery platform featuring user authentication, restaurant listings, menu management, cart functionality, order placement, and order tracking, built with Angular and Java microservices and deployed on Kubernetes",
      tech: [
    "Angular",
    "Java",
    "Spring Boot",
    "Microservices",
    "PostgreSQL",
    "Docker",
    "Kubernetes"
  ],
      github: "https://github.com/ssnikam-dev/FoodSwift",
      demo: "https://food-swift-seven.vercel.app/restaurant-listing",
      caseStudy: ""
    },
   { title: "ReactiveBill", category: "Reactive REST API | Spring WebFlux + R2DBC",
     status: "Completed",
      icon: "↻", description: "A non-blocking invoice management REST API built with Spring WebFlux, Project Reactor, and Spring Data R2DBC. Features reactive CRUD operations, invoice lifecycle management, status-based summaries, and comprehensive reactive testing.",
       tech: [ "Java 17", "Spring Boot 3.3", "Spring WebFlux", "Project Reactor", "Spring Data R2DBC", "PostgreSQL", "Gradle", "Docker Compose", "JUnit 5", "Mockito", "StepVerifier", "WebTestClient" ],
        github: "https://github.com/ssnikam-dev/ReactiveBill",
         demo: "https://reactivebill.onrender.com/swagger-ui.html",
          caseStudy: "" }
  ],
  skills: [
    { title: "Backend Development", items: ["Java", "Spring Boot","Microservices","Reactive Programming" ,"REST APIs", "Spring Data JPA", "Maven"] },
    { title: "Frontend Development", items: ["Angular", "React", "Typescript", "JavaScript", "CSS"] },
    { title: "Databases", items: ["SQL", "PostgreSQL", "MySQL","MongoDB", "H2", "Database Design"] },
    { title: "Testing & Quality", items: ["JUnit", "Mockito","RestAssured", "API Testing", "Debugging", "Exception Handling"] },
    { title: "Tools & Deployment", items: ["Git", "Linux", "Docker","Kubernetes","AWS", "Nginx", "GitHub Actions"] },
    { title: "AI Integration", items: ["LLM APIs", "Ollama", "Prompt Design", "RAG"] },
  ],
  
experience: [
  { role: "Software Developer", company: "Trinity Enterprises International Limited", dates: "Nov 2023 – Present", description: [ "Develop scalable full-stack applications and backend services using Java 8/17/21, Spring Boot, React, and REST APIs to support core business operations.", "Design and implement maintainable backend architectures using Hibernate, JPA, Criteria API, and PostgreSQL, ensuring efficient data access and reliable transaction processing.", "Build end-to-end business features, including user registration, billing and invoicing, reporting and analytics, user management, and administrative workflows.", "Design and prototype React-based user interfaces and a microservices-oriented architecture to improve application modularity, scalability, and maintainability.", "Integrate external APIs and third-party services to support identity verification, secure data exchange, and interoperability between applications.", "Implement data protection and privacy controls, including encryption, hashing, masking, and secure handling of sensitive information.", "Develop Spring Batch jobs for bulk data processing, migration, transformation, and secure data handling, using OpenBao for secrets management.", "Identify and remediate application security vulnerabilities, including XSS, SQL injection, CSRF, and insecure CORS configurations, following secure coding practices.", "Implement role-based access control using Spring Security, custom authentication and authorization filters, and Redis-backed session management.", "Improve application performance through SQL tuning, database indexing, query optimization, and Redis caching to reduce response times and improve scalability.", "Write unit and integration tests using JUnit 5 and Mockito to validate business logic, improve code quality, and reduce regression risks.", "Troubleshoot complex issues across frontend integrations, backend services, REST APIs, and database layers to maintain application stability.", "Collaborate with DevOps, database, and cross-functional engineering teams to investigate and resolve high-priority production incidents (P1/P2).", "Participate in code reviews, technical design discussions, effort estimation, requirements analysis, and mentoring junior developers to improve engineering quality and team productivity.", "Maintain API documentation, technical specifications, and release notes to support integrations, deployments, and knowledge sharing." ] }, { role: "Software Developer Intern", company: "Trinity Enterprises International Limited", dates: "May 2023 – Oct 2023", description: [ "Debugged and resolved application defects in billing and financial transaction modules, improving functionality and overall application reliability.", "Developed and enhanced business application features, including employee management, leave processing, payroll calculations, and salary slip generation.", "Created dynamic reports and printable documents using JasperReports to support business reporting and operational requirements.", "Wrote and optimized SQL queries for data retrieval, business logic, reporting, and database operations.", "Collaborated with senior developers to understand existing application architecture, implement feature enhancements, review code, and troubleshoot technical issues." ] }
  ],
  education: [
    {
      qualification: "Master of Computer Applications",
      institution: "Manipal University Jaipur",
      details: "Graduation year · 2025-2027",
      label: "Education"
    },
     {
      qualification: "Bachelor Of Engineering",
      institution: "A.C.Patil College Of Engineering",
      details: "Graduation year · 2018-2021 | 8.42 CGPA",
      label: "Education"
    },
  ]
};
