// ===================================
// CAREER PATH MAPPINGS
// Maps career goals to structured learning roadmaps
// ===================================

export const careerPaths = {
  "Data Scientist": {
    title: "Data Scientist",
    description: "Analyze complex data to help organizations make better decisions using statistics, ML, and visualization.",
    totalDuration: "8-12 months",
    steps: [
      {
        level: "beginner",
        title: "Foundations",
        description: "Build a strong foundation in Python, statistics, and basic data manipulation.",
        duration: "2-3 months",
        skills: ["Python", "Statistics", "SQL", "Data Manipulation"],
        courseTags: ["python", "basics", "statistics", "sql", "data science"]
      },
      {
        level: "intermediate",
        title: "Core Data Science",
        description: "Master data analysis, visualization, and machine learning fundamentals.",
        duration: "3-4 months",
        skills: ["Pandas", "Visualization", "Machine Learning", "Feature Engineering"],
        courseTags: ["data science", "machine learning", "pandas", "visualization", "python"]
      },
      {
        level: "advanced",
        title: "Specialization",
        description: "Deep dive into advanced ML, deep learning, and big data technologies.",
        duration: "2-3 months",
        skills: ["Deep Learning", "NLP", "Big Data", "Cloud"],
        courseTags: ["deep learning", "neural networks", "nlp", "data engineering"]
      },
      {
        level: "projects",
        title: "Portfolio Projects",
        description: "Build real-world projects: EDA, predictive modeling, dashboards, ML deployment.",
        duration: "1-2 months",
        skills: ["End-to-End Projects", "Deployment", "Communication"],
        courseTags: ["projects", "data science", "portfolio"]
      }
    ]
  },
  "Full Stack Developer": {
    title: "Full Stack Developer",
    description: "Build complete web applications — frontend, backend, databases, and deployment.",
    totalDuration: "6-10 months",
    steps: [
      {
        level: "beginner",
        title: "Web Fundamentals",
        description: "Learn HTML, CSS, JavaScript, and basic responsive web design.",
        duration: "2-3 months",
        skills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
        courseTags: ["html", "css", "javascript", "basics", "web"]
      },
      {
        level: "intermediate",
        title: "Frontend & Backend",
        description: "Master a frontend framework (React/Vue) and backend (Node.js/Express).",
        duration: "3-4 months",
        skills: ["React", "Node.js", "REST APIs", "Databases"],
        courseTags: ["react", "node", "fullstack", "express", "mongodb"]
      },
      {
        level: "advanced",
        title: "Advanced Patterns",
        description: "Learn testing, authentication, TypeScript, and performance optimization.",
        duration: "1-2 months",
        skills: ["TypeScript", "Testing", "Security", "Performance"],
        courseTags: ["typescript", "advanced", "security", "nextjs"]
      },
      {
        level: "projects",
        title: "Full Stack Projects",
        description: "Build and deploy complete applications: e-commerce, social platforms, SaaS.",
        duration: "1-2 months",
        skills: ["Deployment", "Docker", "CI/CD"],
        courseTags: ["fullstack", "projects", "docker", "deployment"]
      }
    ]
  },
  "Machine Learning Engineer": {
    title: "Machine Learning Engineer",
    description: "Design, build, and deploy machine learning models at scale.",
    totalDuration: "9-14 months",
    steps: [
      {
        level: "beginner",
        title: "Math & Programming",
        description: "Strengthen Python, linear algebra, calculus, and probability fundamentals.",
        duration: "2-3 months",
        skills: ["Python", "Linear Algebra", "Calculus", "Probability"],
        courseTags: ["python", "math", "statistics", "probability"]
      },
      {
        level: "intermediate",
        title: "Machine Learning",
        description: "Master supervised/unsupervised learning, model evaluation, and scikit-learn.",
        duration: "3-4 months",
        skills: ["Supervised Learning", "Unsupervised Learning", "Feature Engineering", "Model Evaluation"],
        courseTags: ["machine learning", "supervised", "unsupervised", "python"]
      },
      {
        level: "advanced",
        title: "Deep Learning & MLOps",
        description: "Build neural networks, deploy models, and learn MLOps practices.",
        duration: "3-4 months",
        skills: ["Deep Learning", "TensorFlow/PyTorch", "MLOps", "Cloud"],
        courseTags: ["deep learning", "tensorflow", "pytorch", "mlops", "aws"]
      },
      {
        level: "projects",
        title: "ML Projects",
        description: "End-to-end ML projects: recommendation systems, NLP apps, computer vision.",
        duration: "1-3 months",
        skills: ["Model Deployment", "API Development", "Monitoring"],
        courseTags: ["machine learning", "projects", "deployment"]
      }
    ]
  },
  "Cloud Architect": {
    title: "Cloud Architect",
    description: "Design and manage scalable, secure cloud infrastructure for organizations.",
    totalDuration: "8-12 months",
    steps: [
      {
        level: "beginner",
        title: "Cloud Foundations",
        description: "Understand cloud concepts, networking basics, and chose a cloud provider.",
        duration: "2-3 months",
        skills: ["Cloud Concepts", "Networking", "Linux", "Virtualization"],
        courseTags: ["cloud", "aws", "foundations", "networking"]
      },
      {
        level: "intermediate",
        title: "Cloud Services & Architecture",
        description: "Master core services: compute, storage, databases, and serverless.",
        duration: "3-4 months",
        skills: ["AWS/Azure/GCP", "Databases", "Serverless", "Security"],
        courseTags: ["aws", "azure", "gcp", "cloud", "solutions architect"]
      },
      {
        level: "advanced",
        title: "DevOps & Infrastructure as Code",
        description: "Learn Terraform, Docker, Kubernetes, and CI/CD pipelines.",
        duration: "2-3 months",
        skills: ["Terraform", "Docker", "Kubernetes", "CI/CD"],
        courseTags: ["devops", "docker", "kubernetes", "terraform", "ci/cd"]
      },
      {
        level: "projects",
        title: "Architecture Projects",
        description: "Design multi-tier architectures, migrate applications, and get certified.",
        duration: "1-2 months",
        skills: ["Architecture Design", "Cost Optimization", "Certification"],
        courseTags: ["cloud", "architecture", "certification"]
      }
    ]
  },
  "Cybersecurity Analyst": {
    title: "Cybersecurity Analyst",
    description: "Protect systems and networks from cyber threats through monitoring, analysis, and response.",
    totalDuration: "6-10 months",
    steps: [
      {
        level: "beginner",
        title: "Security Fundamentals",
        description: "Learn networking, operating systems, and core security concepts.",
        duration: "2-3 months",
        skills: ["Networking", "Linux", "Security Concepts", "CompTIA Security+"],
        courseTags: ["cybersecurity", "networking", "security", "google"]
      },
      {
        level: "intermediate",
        title: "Offensive & Defensive Security",
        description: "Master penetration testing, threat detection, and incident response.",
        duration: "2-3 months",
        skills: ["Penetration Testing", "SIEM", "Forensics", "Vulnerability Assessment"],
        courseTags: ["hacking", "penetration testing", "security", "ctf"]
      },
      {
        level: "advanced",
        title: "Advanced Threat Hunting",
        description: "Specialize in malware analysis, reverse engineering, and cloud security.",
        duration: "2-3 months",
        skills: ["Malware Analysis", "Cloud Security", "Automation"],
        courseTags: ["security", "advanced", "cloud", "automation"]
      },
      {
        level: "projects",
        title: "Security Projects",
        description: "CTF challenges, security audits, and building defensive tools.",
        duration: "1-2 months",
        skills: ["CTF", "Bug Bounty", "Security Automation"],
        courseTags: ["security", "challenges", "ctf", "projects"]
      }
    ]
  },
  "Mobile App Developer": {
    title: "Mobile App Developer",
    description: "Build native and cross-platform mobile applications for iOS and Android.",
    totalDuration: "6-10 months",
    steps: [
      {
        level: "beginner",
        title: "Programming Foundations",
        description: "Learn a core language (Dart/JavaScript/Swift/Kotlin) and programming basics.",
        duration: "1-2 months",
        skills: ["Programming Basics", "Version Control", "UI Fundamentals"],
        courseTags: ["programming", "basics", "javascript", "dart"]
      },
      {
        level: "intermediate",
        title: "Mobile Framework",
        description: "Master a mobile framework: Flutter, React Native, or native (Swift/Kotlin).",
        duration: "3-4 months",
        skills: ["Flutter/React Native", "State Management", "Navigation", "APIs"],
        courseTags: ["flutter", "react native", "mobile", "ios", "android"]
      },
      {
        level: "advanced",
        title: "Advanced Mobile",
        description: "Implement offline support, push notifications, animations, and testing.",
        duration: "1-2 months",
        skills: ["Animations", "Testing", "Performance", "Native Modules"],
        courseTags: ["mobile", "advanced", "testing", "performance"]
      },
      {
        level: "projects",
        title: "App Portfolio",
        description: "Build and publish apps: social, e-commerce, utility, and games.",
        duration: "1-2 months",
        skills: ["App Store Deployment", "Analytics", "Monetization"],
        courseTags: ["mobile", "projects", "deployment"]
      }
    ]
  },
  "AI Engineer": {
    title: "AI Engineer",
    description: "Build and deploy AI systems including LLMs, computer vision, and NLP applications.",
    totalDuration: "10-14 months",
    steps: [
      {
        level: "beginner",
        title: "AI Foundations",
        description: "Learn Python, math fundamentals, and understand what AI can do.",
        duration: "2-3 months",
        skills: ["Python", "Math", "AI Concepts", "Data Handling"],
        courseTags: ["python", "ai", "basics", "non-technical"]
      },
      {
        level: "intermediate",
        title: "Machine Learning & Deep Learning",
        description: "Master classical ML, neural networks, and modern deep learning frameworks.",
        duration: "4-5 months",
        skills: ["Machine Learning", "Deep Learning", "TensorFlow", "PyTorch"],
        courseTags: ["machine learning", "deep learning", "neural networks", "tensorflow"]
      },
      {
        level: "advanced",
        title: "Generative AI & Specialization",
        description: "Work with LLMs, prompt engineering, fine-tuning, and specialized AI domains.",
        duration: "2-3 months",
        skills: ["LLMs", "Prompt Engineering", "Fine-tuning", "Computer Vision"],
        courseTags: ["generative ai", "llm", "prompt engineering", "computer vision", "nlp"]
      },
      {
        level: "projects",
        title: "AI Projects",
        description: "Build AI apps: chatbots, image generators, recommendation engines, AI agents.",
        duration: "2-3 months",
        skills: ["Deployment", "API Integration", "Production AI"],
        courseTags: ["ai", "projects", "deployment"]
      }
    ]
  },
  "UI/UX Designer": {
    title: "UI/UX Designer",
    description: "Create user-centered digital experiences through research, design, and prototyping.",
    totalDuration: "5-8 months",
    steps: [
      {
        level: "beginner",
        title: "Design Fundamentals",
        description: "Learn design thinking, color theory, typography, and basic tools.",
        duration: "1-2 months",
        skills: ["Design Thinking", "Color Theory", "Typography", "Composition"],
        courseTags: ["ui", "ux", "design", "basics"]
      },
      {
        level: "intermediate",
        title: "UX Design & Figma",
        description: "Master UX research, wireframing, prototyping, and Figma.",
        duration: "2-3 months",
        skills: ["Figma", "Wireframing", "Prototyping", "User Research"],
        courseTags: ["figma", "ux", "prototyping", "ui"]
      },
      {
        level: "advanced",
        title: "Advanced Design",
        description: "Design systems, micro-interactions, accessibility, and design leadership.",
        duration: "1-2 months",
        skills: ["Design Systems", "Accessibility", "Motion Design", "Handoff"],
        courseTags: ["design", "advanced", "accessibility", "motion"]
      },
      {
        level: "projects",
        title: "Portfolio",
        description: "Build a portfolio of redesigns, case studies, and original designs.",
        duration: "1-2 months",
        skills: ["Case Studies", "Portfolio", "Presentation"],
        courseTags: ["design", "portfolio", "projects"]
      }
    ]
  }
};

// Helper: get all career goal names
export function getCareerGoals() {
  return Object.keys(careerPaths);
}

// Helper: skill-to-career mapping
export const skillToCareerMap = {
  "Python": ["Data Scientist", "Machine Learning Engineer", "AI Engineer"],
  "JavaScript": ["Full Stack Developer", "Mobile App Developer"],
  "Web Development": ["Full Stack Developer"],
  "Data Science": ["Data Scientist"],
  "Machine Learning": ["Machine Learning Engineer", "AI Engineer", "Data Scientist"],
  "Artificial Intelligence": ["AI Engineer", "Machine Learning Engineer"],
  "Cloud Computing": ["Cloud Architect"],
  "Cybersecurity": ["Cybersecurity Analyst"],
  "Mobile Development": ["Mobile App Developer"],
  "DevOps": ["Cloud Architect", "Full Stack Developer"],
  "Blockchain": ["Full Stack Developer"],
  "UI/UX Design": ["UI/UX Designer"],
  "Database": ["Full Stack Developer", "Data Scientist", "Cloud Architect"],
  "Algorithms": ["Full Stack Developer", "Machine Learning Engineer"],
  "Deep Learning": ["AI Engineer", "Machine Learning Engineer"]
};
