# Java Developer Portfolio — Sushant Nikam

A responsive, static portfolio website built with plain HTML, CSS, and JavaScript. It can be hosted directly on **GitHub Pages**—no Node.js, build step, backend, or paid service required.

## Features

- Responsive layout for desktop, tablet, and mobile
- Projects with GitHub, live demo, and case-study links
- Skills grouped by category
- Experience timeline
- Education and certifications
- About section and contact links
- Easy content editing from one file: `data.js`
- No external JavaScript libraries or build tools

## Preview locally

Open `index.html` in a browser. For a local HTTP server, run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Personalize before publishing

1. Open `data.js`.
2. Replace `YOUR_EMAIL@example.com`, `YOUR_GITHUB_USERNAME`, and `YOUR_LINKEDIN_USERNAME`.
3. Replace sample project repository links with your real repositories.
4. Update project descriptions, technologies, and statuses to match what you have actually built.
5. Add your real experience, education, and completed certifications.
6. Remove the planned RAG project until it is actually underway or completed.
7. Add your resume PDF at `assets/resume.pdf`, or change/remove the resume button.
8. Check every link and proofread the content.

**Do not publish secrets, employer-confidential details, or claims you cannot demonstrate.**

## Publish on GitHub Pages

1. Create a GitHub repository, for example `java-developer-portfolio`.
2. Upload the contents of this folder to the repository root. `index.html` must be at the root.
3. Open the repository on GitHub and go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/(root)`, then click **Save**.
6. Wait for the deployment to complete. Your site will be available at a URL similar to:
   `https://YOUR_GITHUB_USERNAME.github.io/java-developer-portfolio/`

If you name the repository exactly `YOUR_GITHUB_USERNAME.github.io`, GitHub Pages can publish it as your account's root site.

## Add a project

Add another object to the `projects` array in `data.js`:

```js
{
  title: "Your Project",
  category: "Backend · Java",
  status: "Live",
  icon: "◇",
  description: "What it does and the problem it solves.",
  tech: ["Java", "Spring Boot", "PostgreSQL"],
  github: "https://github.com/YOUR_GITHUB_USERNAME/your-project",
  demo: "https://your-live-demo.example",
  caseStudy: ""
}
```

Use an empty string for a link you don't have yet. Update the existing sample project entries rather than leaving placeholder content on the public site.

## License

You may adapt this template for your personal portfolio. Add your preferred license if you plan to redistribute it.
