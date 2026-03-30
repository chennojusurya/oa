// ===================================
// COURSE DATASET — 1600+ courses from huge datasets
// Hand-crafted + dynamically generated from 16+ platforms
// IT Sector, CS, Engineering, Skill Development
// ===================================

import { generateCourses } from './course-generator.js';

export const PLATFORMS = [
  'Coursera', 'Udemy', 'edX', 'YouTube', 'Khan Academy',
  'NPTEL', 'HackerRank', 'LeetCode', 'Codecademy', 'Pluralsight',
  'Kaggle', 'Hugging Face', 'Skillshare', 'LinkedIn Learning',
  'Great Learning', 'Simplilearn'
];

export const CATEGORIES = [
  'Python', 'JavaScript', 'Web Development', 'Data Science',
  'Machine Learning', 'Artificial Intelligence', 'Cloud Computing',
  'Cybersecurity', 'Mobile Development', 'DevOps', 'Blockchain',
  'UI/UX Design', 'Database', 'Algorithms', 'Deep Learning'
];

export const DIFFICULTY_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

// Color-coded thumbnails by category (gradient placeholders)
const THUMB_COLORS = {
  'Python': ['#306998','#FFD43B'],
  'JavaScript': ['#f7df1e','#323330'],
  'Web Development': ['#e44d26','#0170ba'],
  'Data Science': ['#1a4fd4','#22c55e'],
  'Machine Learning': ['#7c3aed','#3478f6'],
  'Artificial Intelligence': ['#0f172a','#a78bfa'],
  'Cloud Computing': ['#0ea5e9','#06b6d4'],
  'Cybersecurity': ['#dc2626','#1e293b'],
  'Mobile Development': ['#34d399','#059669'],
  'DevOps': ['#f97316','#0284c7'],
  'Blockchain': ['#8b5cf6','#ec4899'],
  'UI/UX Design': ['#f43f5e','#fb923c'],
  'Database': ['#0891b2','#164e63'],
  'Algorithms': ['#4f46e5','#818cf8'],
  'Deep Learning': ['#7c3aed','#c084fc'],
};

export function getCategoryGradient(category) {
  const colors = THUMB_COLORS[category] || ['#3478f6','#a78bfa'];
  return `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
}

export const courses = [
  // ===================== PYTHON =====================
  {
    id: 1, title: "Python for Everybody", platform: "Coursera",
    instructor: "Dr. Charles Severance", rating: 4.8, reviews: 245000,
    duration: "8 weeks", difficulty: "Beginner", price: 0,
    category: "Python", tags: ["python", "programming", "basics"],
    description: "Learn to program and analyze data with Python. No prior experience needed.",
    enrolled: 3200000, image: null,
    link: "https://www.coursera.org/specializations/python"
  },
  {
    id: 2, title: "Complete Python Bootcamp", platform: "Udemy",
    instructor: "Jose Portilla", rating: 4.6, reviews: 432000,
    duration: "22 hours", difficulty: "Beginner", price: 12.99,
    category: "Python", tags: ["python", "oop", "projects"],
    description: "Go from zero to hero in Python with hands-on projects and exercises.",
    enrolled: 1600000, image: null,
    link: "https://www.udemy.com/course/complete-python-bootcamp/"
  },
  {
    id: 3, title: "Introduction to Computer Science and Programming Using Python", platform: "edX",
    instructor: "MIT", rating: 4.9, reviews: 18000,
    duration: "9 weeks", difficulty: "Beginner", price: 0,
    category: "Python", tags: ["python", "cs", "algorithms"],
    description: "Intro to CS and programming using Python by MIT.",
    enrolled: 890000, image: null,
    link: "https://www.edx.org/course/introduction-to-computer-science-and-programming-7"
  },
  {
    id: 4, title: "Python Tutorial - Full Course for Beginners", platform: "YouTube",
    instructor: "Programming with Mosh", rating: 4.9, reviews: 85000,
    duration: "6 hours", difficulty: "Beginner", price: 0,
    category: "Python", tags: ["python", "tutorial", "free"],
    description: "A comprehensive Python tutorial covering basics to advanced topics.",
    enrolled: 22000000, image: null
  },
  {
    id: 5, title: "Python for Data Science", platform: "NPTEL",
    instructor: "Prof. Ragunathan Rengasamy", rating: 4.5, reviews: 4500,
    duration: "12 weeks", difficulty: "Intermediate", price: 0,
    category: "Python", tags: ["python", "data science", "numpy"],
    description: "Python programming with a focus on data science applications.",
    enrolled: 125000, image: null
  },
  {
    id: 6, title: "Python Challenges", platform: "HackerRank",
    instructor: "HackerRank Team", rating: 4.4, reviews: 120000,
    duration: "Self-paced", difficulty: "Intermediate", price: 0,
    category: "Python", tags: ["python", "practice", "challenges"],
    description: "Solve Python challenges and improve your coding skills.",
    enrolled: 5000000, image: null
  },
  // ===================== JAVASCRIPT =====================
  {
    id: 7, title: "The Complete JavaScript Course 2024", platform: "Udemy",
    instructor: "Jonas Schmedtmann", rating: 4.7, reviews: 180000,
    duration: "69 hours", difficulty: "Beginner", price: 13.99,
    category: "JavaScript", tags: ["javascript", "es6", "web"],
    description: "The definitive JavaScript course from beginner to advanced developer.",
    enrolled: 820000, image: null
  },
  {
    id: 8, title: "JavaScript Algorithms and Data Structures", platform: "LeetCode",
    instructor: "LeetCode Team", rating: 4.5, reviews: 95000,
    duration: "Self-paced", difficulty: "Intermediate", price: 0,
    category: "JavaScript", tags: ["javascript", "algorithms", "interview"],
    description: "Master algorithmic problem solving with JavaScript.",
    enrolled: 2800000, image: null
  },
  {
    id: 9, title: "Programming Foundations with JavaScript", platform: "Khan Academy",
    instructor: "Khan Academy", rating: 4.7, reviews: 65000,
    duration: "Self-paced", difficulty: "Beginner", price: 0,
    category: "JavaScript", tags: ["javascript", "basics", "interactive"],
    description: "Learn programming fundamentals with interactive JavaScript lessons.",
    enrolled: 1500000, image: null
  },
  {
    id: 10, title: "JavaScript — The Advanced Concepts", platform: "Udemy",
    instructor: "Andrei Neagoie", rating: 4.7, reviews: 42000,
    duration: "25 hours", difficulty: "Advanced", price: 14.99,
    category: "JavaScript", tags: ["javascript", "advanced", "closures"],
    description: "Deep dive into advanced JavaScript concepts used in top companies.",
    enrolled: 240000, image: null
  },
  {
    id: 11, title: "CS50's Web Programming with Python and JavaScript", platform: "edX",
    instructor: "Harvard University", rating: 4.9, reviews: 28000,
    duration: "12 weeks", difficulty: "Intermediate", price: 0,
    category: "JavaScript", tags: ["javascript", "python", "web", "cs50"],
    description: "Build dynamic web applications with Python, JavaScript, and SQL.",
    enrolled: 620000, image: null
  },
  // ===================== WEB DEVELOPMENT =====================
  {
    id: 12, title: "The Web Developer Bootcamp 2024", platform: "Udemy",
    instructor: "Colt Steele", rating: 4.7, reviews: 265000,
    duration: "74 hours", difficulty: "Beginner", price: 12.99,
    category: "Web Development", tags: ["html", "css", "javascript", "node"],
    description: "Master HTML, CSS, JS, Node.js, and more in one comprehensive course.",
    enrolled: 900000, image: null
  },
  {
    id: 13, title: "HTML, CSS, and Javascript for Web Developers", platform: "Coursera",
    instructor: "Johns Hopkins University", rating: 4.7, reviews: 54000,
    duration: "5 weeks", difficulty: "Beginner", price: 0,
    category: "Web Development", tags: ["html", "css", "javascript", "responsive"],
    description: "Learn the core tools every web developer needs to know.",
    enrolled: 780000, image: null
  },
  {
    id: 14, title: "React - The Complete Guide", platform: "Udemy",
    instructor: "Maximilian Schwarzmüller", rating: 4.7, reviews: 198000,
    duration: "67 hours", difficulty: "Intermediate", price: 13.99,
    category: "Web Development", tags: ["react", "hooks", "redux", "nextjs"],
    description: "Dive in and learn React.js from scratch with hooks, Redux, and Next.js.",
    enrolled: 810000, image: null
  },
  {
    id: 15, title: "Full Stack Open", platform: "YouTube",
    instructor: "University of Helsinki", rating: 4.8, reviews: 12000,
    duration: "Self-paced", difficulty: "Intermediate", price: 0,
    category: "Web Development", tags: ["react", "node", "fullstack", "graphql"],
    description: "Modern full-stack web development with React, Node, MongoDB, and GraphQL.",
    enrolled: 350000, image: null
  },
  {
    id: 16, title: "Web Development Fundamentals", platform: "Khan Academy",
    instructor: "Khan Academy", rating: 4.6, reviews: 88000,
    duration: "Self-paced", difficulty: "Beginner", price: 0,
    category: "Web Development", tags: ["html", "css", "basics"],
    description: "Start building websites with HTML and CSS fundamentals.",
    enrolled: 2100000, image: null
  },
  {
    id: 17, title: "Angular - The Complete Guide", platform: "Udemy",
    instructor: "Maximilian Schwarzmüller", rating: 4.6, reviews: 168000,
    duration: "37 hours", difficulty: "Intermediate", price: 12.99,
    category: "Web Development", tags: ["angular", "typescript", "rxjs"],
    description: "Master Angular and build awesome, reactive web apps.",
    enrolled: 620000, image: null
  },
  // ===================== DATA SCIENCE =====================
  {
    id: 18, title: "IBM Data Science Professional Certificate", platform: "Coursera",
    instructor: "IBM", rating: 4.6, reviews: 98000,
    duration: "11 months", difficulty: "Beginner", price: 39,
    category: "Data Science", tags: ["data science", "python", "sql", "ibm"],
    description: "Prepare for a career in data science with this IBM Professional Certificate.",
    enrolled: 540000, image: null
  },
  {
    id: 19, title: "Data Science and Machine Learning Bootcamp", platform: "Udemy",
    instructor: "Jose Portilla", rating: 4.6, reviews: 132000,
    duration: "25 hours", difficulty: "Intermediate", price: 12.99,
    category: "Data Science", tags: ["data science", "python", "pandas", "visualization"],
    description: "Learn data science and machine learning with Python, Pandas, and Scikit-learn.",
    enrolled: 580000, image: null
  },
  {
    id: 20, title: "Statistics and Probability", platform: "Khan Academy",
    instructor: "Khan Academy", rating: 4.8, reviews: 145000,
    duration: "Self-paced", difficulty: "Beginner", price: 0,
    category: "Data Science", tags: ["statistics", "probability", "math"],
    description: "Foundation of statistics and probability for data science.",
    enrolled: 4200000, image: null
  },
  {
    id: 21, title: "Introduction to Data Science", platform: "NPTEL",
    instructor: "Prof. V. Kamakoti", rating: 4.4, reviews: 5200,
    duration: "8 weeks", difficulty: "Beginner", price: 0,
    category: "Data Science", tags: ["data science", "intro", "analytics"],
    description: "Introduction to data science principles and tools.",
    enrolled: 98000, image: null
  },
  {
    id: 22, title: "Data Science Methodology", platform: "edX",
    instructor: "IBM", rating: 4.5, reviews: 22000,
    duration: "3 weeks", difficulty: "Beginner", price: 0,
    category: "Data Science", tags: ["data science", "methodology", "crisp-dm"],
    description: "Learn the data science methodology used in industry.",
    enrolled: 280000, image: null
  },
  // ===================== MACHINE LEARNING =====================
  {
    id: 23, title: "Machine Learning Specialization", platform: "Coursera",
    instructor: "Andrew Ng", rating: 4.9, reviews: 198000,
    duration: "3 months", difficulty: "Intermediate", price: 49,
    category: "Machine Learning", tags: ["machine learning", "supervised", "unsupervised", "neural networks"],
    description: "Master fundamental AI concepts by Andrew Ng. Updated for 2024.",
    enrolled: 4200000, image: null,
    link: "https://www.coursera.org/specializations/machine-learning-introduction"
  },
  {
    id: 24, title: "Machine Learning A-Z", platform: "Udemy",
    instructor: "Kirill Eremenko", rating: 4.5, reviews: 175000,
    duration: "44 hours", difficulty: "Intermediate", price: 13.99,
    category: "Machine Learning", tags: ["machine learning", "python", "r", "models"],
    description: "Hands-on machine learning with Python and R for all levels.",
    enrolled: 920000, image: null
  },
  {
    id: 25, title: "Machine Learning with Python", platform: "edX",
    instructor: "MIT", rating: 4.7, reviews: 14000,
    duration: "15 weeks", difficulty: "Advanced", price: 0,
    category: "Machine Learning", tags: ["machine learning", "python", "mit"],
    description: "Learn ML techniques, principles, and algorithms from MIT.",
    enrolled: 380000, image: null
  },
  {
    id: 26, title: "StatQuest: Machine Learning", platform: "YouTube",
    instructor: "Josh Starmer", rating: 4.9, reviews: 42000,
    duration: "Self-paced", difficulty: "Beginner", price: 0,
    category: "Machine Learning", tags: ["machine learning", "statistics", "explained"],
    description: "Machine learning concepts explained clearly with fun illustrations.",
    enrolled: 8500000, image: null
  },
  {
    id: 27, title: "ML Challenges", platform: "HackerRank",
    instructor: "HackerRank Team", rating: 4.3, reviews: 45000,
    duration: "Self-paced", difficulty: "Intermediate", price: 0,
    category: "Machine Learning", tags: ["machine learning", "practice", "challenges"],
    description: "Solve real-world ML challenges and build your portfolio.",
    enrolled: 1200000, image: null
  },
  // ===================== AI =====================
  {
    id: 28, title: "AI For Everyone", platform: "Coursera",
    instructor: "Andrew Ng", rating: 4.8, reviews: 72000,
    duration: "4 weeks", difficulty: "Beginner", price: 0,
    category: "Artificial Intelligence", tags: ["ai", "non-technical", "business"],
    description: "Understand AI technologies and how to apply them in your organization.",
    enrolled: 940000, image: null
  },
  {
    id: 29, title: "Artificial Intelligence: Principles and Techniques", platform: "edX",
    instructor: "Stanford University", rating: 4.8, reviews: 8500,
    duration: "11 weeks", difficulty: "Advanced", price: 0,
    category: "Artificial Intelligence", tags: ["ai", "search", "reasoning", "stanford"],
    description: "Stanford's comprehensive intro to AI principles and techniques.",
    enrolled: 220000, image: null
  },
  {
    id: 30, title: "Intro to Artificial Intelligence", platform: "Udemy",
    instructor: "Rafeh Qazi", rating: 4.5, reviews: 32000,
    duration: "9 hours", difficulty: "Beginner", price: 11.99,
    category: "Artificial Intelligence", tags: ["ai", "intro", "chatgpt"],
    description: "Learn AI concepts from ChatGPT to building intelligent systems.",
    enrolled: 185000, image: null
  },
  {
    id: 31, title: "Artificial Intelligence", platform: "NPTEL",
    instructor: "Prof. Deepak Khemani", rating: 4.6, reviews: 7800,
    duration: "12 weeks", difficulty: "Intermediate", price: 0,
    category: "Artificial Intelligence", tags: ["ai", "search", "nlp", "logic"],
    description: "Comprehensive AI course covering search, logic, and learning.",
    enrolled: 165000, image: null
  },
  {
    id: 32, title: "MIT 6.034 Artificial Intelligence", platform: "YouTube",
    instructor: "Patrick Winston", rating: 4.9, reviews: 18000,
    duration: "Self-paced", difficulty: "Advanced", price: 0,
    category: "Artificial Intelligence", tags: ["ai", "mit", "lectures"],
    description: "Classic MIT AI lectures by the late Prof. Patrick Winston.",
    enrolled: 6200000, image: null
  },
  // ===================== CLOUD COMPUTING =====================
  {
    id: 33, title: "AWS Cloud Practitioner Essentials", platform: "Coursera",
    instructor: "AWS", rating: 4.7, reviews: 48000,
    duration: "6 hours", difficulty: "Beginner", price: 0,
    category: "Cloud Computing", tags: ["aws", "cloud", "foundations"],
    description: "Build foundational understanding of AWS Cloud concepts.",
    enrolled: 520000, image: null
  },
  {
    id: 34, title: "Google Cloud Fundamentals", platform: "Coursera",
    instructor: "Google Cloud", rating: 4.6, reviews: 38000,
    duration: "5 hours", difficulty: "Beginner", price: 0,
    category: "Cloud Computing", tags: ["gcp", "cloud", "infrastructure"],
    description: "Introduction to Google Cloud products and services.",
    enrolled: 340000, image: null
  },
  {
    id: 35, title: "Azure Fundamentals AZ-900", platform: "Udemy",
    instructor: "Scott Duffy", rating: 4.6, reviews: 56000,
    duration: "11 hours", difficulty: "Beginner", price: 12.99,
    category: "Cloud Computing", tags: ["azure", "cloud", "certification"],
    description: "Prepare for the AZ-900 Azure Fundamentals certification.",
    enrolled: 290000, image: null
  },
  {
    id: 36, title: "Cloud Computing", platform: "NPTEL",
    instructor: "Prof. Soumya Kanti Ghosh", rating: 4.4, reviews: 6200,
    duration: "12 weeks", difficulty: "Intermediate", price: 0,
    category: "Cloud Computing", tags: ["cloud", "virtualization", "distributed"],
    description: "Cloud computing concepts, architectures, and applications.",
    enrolled: 78000, image: null
  },
  // ===================== CYBERSECURITY =====================
  {
    id: 37, title: "Google Cybersecurity Professional Certificate", platform: "Coursera",
    instructor: "Google", rating: 4.8, reviews: 32000,
    duration: "6 months", difficulty: "Beginner", price: 39,
    category: "Cybersecurity", tags: ["cybersecurity", "google", "networking"],
    description: "Get job-ready for an in-demand cybersecurity career with Google.",
    enrolled: 280000, image: null
  },
  {
    id: 38, title: "Ethical Hacking from Scratch", platform: "Udemy",
    instructor: "Zaid Sabih", rating: 4.6, reviews: 142000,
    duration: "26 hours", difficulty: "Beginner", price: 12.99,
    category: "Cybersecurity", tags: ["hacking", "penetration testing", "security"],
    description: "Learn to hack like a hacker and secure systems like a security expert.",
    enrolled: 620000, image: null
  },
  {
    id: 39, title: "Cybersecurity Security Challenges", platform: "HackerRank",
    instructor: "HackerRank Team", rating: 4.3, reviews: 28000,
    duration: "Self-paced", difficulty: "Intermediate", price: 0,
    category: "Cybersecurity", tags: ["security", "challenges", "ctf"],
    description: "Practice cybersecurity skills with real-world challenges.",
    enrolled: 890000, image: null
  },
  // ===================== MOBILE DEVELOPMENT =====================
  {
    id: 40, title: "Flutter & Dart - The Complete Guide", platform: "Udemy",
    instructor: "Maximilian Schwarzmüller", rating: 4.6, reviews: 82000,
    duration: "42 hours", difficulty: "Intermediate", price: 13.99,
    category: "Mobile Development", tags: ["flutter", "dart", "mobile", "cross-platform"],
    description: "Build iOS and Android apps with a single codebase using Flutter.",
    enrolled: 370000, image: null
  },
  {
    id: 41, title: "iOS & Swift - The Complete Developer Course", platform: "Udemy",
    instructor: "Dr. Angela Yu", rating: 4.7, reviews: 94000,
    duration: "60 hours", difficulty: "Beginner", price: 12.99,
    category: "Mobile Development", tags: ["ios", "swift", "xcode", "mobile"],
    description: "Learn iOS 17 app development from beginner to advanced.",
    enrolled: 420000, image: null
  },
  {
    id: 42, title: "Android Development for Beginners", platform: "YouTube",
    instructor: "Philipp Lackner", rating: 4.8, reviews: 35000,
    duration: "Self-paced", difficulty: "Beginner", price: 0,
    category: "Mobile Development", tags: ["android", "kotlin", "jetpack compose"],
    description: "Modern Android development with Kotlin and Jetpack Compose.",
    enrolled: 2800000, image: null
  },
  {
    id: 43, title: "React Native - The Practical Guide", platform: "Udemy",
    instructor: "Maximilian Schwarzmüller", rating: 4.6, reviews: 56000,
    duration: "28 hours", difficulty: "Intermediate", price: 13.99,
    category: "Mobile Development", tags: ["react native", "javascript", "mobile"],
    description: "Build native mobile apps with JavaScript and React Native.",
    enrolled: 260000, image: null
  },
  // ===================== DEVOPS =====================
  {
    id: 44, title: "Docker and Kubernetes: The Complete Guide", platform: "Udemy",
    instructor: "Stephen Grider", rating: 4.6, reviews: 72000,
    duration: "22 hours", difficulty: "Intermediate", price: 13.99,
    category: "DevOps", tags: ["docker", "kubernetes", "containers"],
    description: "Build, test, and deploy Docker applications with Kubernetes.",
    enrolled: 310000, image: null
  },
  {
    id: 45, title: "DevOps Engineering on AWS", platform: "Coursera",
    instructor: "AWS", rating: 4.5, reviews: 18000,
    duration: "4 weeks", difficulty: "Intermediate", price: 49,
    category: "DevOps", tags: ["devops", "aws", "ci/cd"],
    description: "Learn DevOps practices with AWS services.",
    enrolled: 140000, image: null
  },
  {
    id: 46, title: "Introduction to DevOps", platform: "edX",
    instructor: "Linux Foundation", rating: 4.5, reviews: 15000,
    duration: "7 weeks", difficulty: "Beginner", price: 0,
    category: "DevOps", tags: ["devops", "agile", "automation"],
    description: "Learn DevOps methodologies and practices from Linux Foundation.",
    enrolled: 220000, image: null
  },
  // ===================== BLOCKCHAIN =====================
  {
    id: 47, title: "Blockchain Specialization", platform: "Coursera",
    instructor: "University at Buffalo", rating: 4.6, reviews: 32000,
    duration: "4 months", difficulty: "Intermediate", price: 49,
    category: "Blockchain", tags: ["blockchain", "ethereum", "smart contracts"],
    description: "Master blockchain technology, smart contracts, and decentralized apps.",
    enrolled: 180000, image: null
  },
  {
    id: 48, title: "Ethereum and Solidity: The Complete Developer's Guide", platform: "Udemy",
    instructor: "Stephen Grider", rating: 4.5, reviews: 28000,
    duration: "24 hours", difficulty: "Intermediate", price: 12.99,
    category: "Blockchain", tags: ["ethereum", "solidity", "web3"],
    description: "Use Ethereum, Solidity, and Smart Contracts to build production-ready apps.",
    enrolled: 150000, image: null
  },
  {
    id: 49, title: "Blockchain Technology", platform: "NPTEL",
    instructor: "Prof. Sandip Chakraborty", rating: 4.3, reviews: 3800,
    duration: "12 weeks", difficulty: "Intermediate", price: 0,
    category: "Blockchain", tags: ["blockchain", "bitcoin", "distributed ledger"],
    description: "Comprehensive blockchain course covering fundamentals to advanced topics.",
    enrolled: 65000, image: null
  },
  // ===================== UI/UX DESIGN =====================
  {
    id: 50, title: "Google UX Design Professional Certificate", platform: "Coursera",
    instructor: "Google", rating: 4.8, reviews: 68000,
    duration: "6 months", difficulty: "Beginner", price: 39,
    category: "UI/UX Design", tags: ["ux", "ui", "figma", "prototyping"],
    description: "Get started in UX design with Google's professional certificate.",
    enrolled: 420000, image: null
  },
  {
    id: 51, title: "Complete Web & Mobile Designer", platform: "Udemy",
    instructor: "Andrei Neagoie", rating: 4.6, reviews: 28000,
    duration: "35 hours", difficulty: "Beginner", price: 12.99,
    category: "UI/UX Design", tags: ["ui", "ux", "figma", "design"],
    description: "Become a UI/UX designer — master Figma, design principles, and portfolios.",
    enrolled: 120000, image: null
  },
  {
    id: 52, title: "Design 101: Introduction to UI/UX", platform: "YouTube",
    instructor: "DesignCourse", rating: 4.7, reviews: 42000,
    duration: "Self-paced", difficulty: "Beginner", price: 0,
    category: "UI/UX Design", tags: ["ui", "ux", "design", "basics"],
    description: "Learn the fundamentals of beautiful UI/UX design for free.",
    enrolled: 5800000, image: null
  },
  // ===================== DATABASE =====================
  {
    id: 53, title: "SQL for Data Science", platform: "Coursera",
    instructor: "UC Davis", rating: 4.6, reviews: 52000,
    duration: "4 weeks", difficulty: "Beginner", price: 0,
    category: "Database", tags: ["sql", "database", "queries"],
    description: "Learn SQL fundamentals for data science applications.",
    enrolled: 680000, image: null
  },
  {
    id: 54, title: "The Complete SQL Bootcamp", platform: "Udemy",
    instructor: "Jose Portilla", rating: 4.7, reviews: 155000,
    duration: "9 hours", difficulty: "Beginner", price: 12.99,
    category: "Database", tags: ["sql", "postgresql", "database"],
    description: "Master SQL using PostgreSQL — the most in-demand database skill.",
    enrolled: 720000, image: null
  },
  {
    id: 55, title: "MongoDB — The Complete Developer's Guide", platform: "Udemy",
    instructor: "Maximilian Schwarzmüller", rating: 4.7, reviews: 38000,
    duration: "17 hours", difficulty: "Intermediate", price: 13.99,
    category: "Database", tags: ["mongodb", "nosql", "database"],
    description: "Master MongoDB and build powerful, data-driven apps.",
    enrolled: 180000, image: null
  },
  {
    id: 56, title: "SQL Challenges", platform: "HackerRank",
    instructor: "HackerRank Team", rating: 4.4, reviews: 180000,
    duration: "Self-paced", difficulty: "Beginner", price: 0,
    category: "Database", tags: ["sql", "practice", "challenges"],
    description: "Practice SQL with increasingly challenging problems.",
    enrolled: 4800000, image: null
  },
  {
    id: 57, title: "Database Management Systems", platform: "NPTEL",
    instructor: "Prof. D. Janakiram", rating: 4.5, reviews: 8200,
    duration: "12 weeks", difficulty: "Intermediate", price: 0,
    category: "Database", tags: ["dbms", "sql", "normalization"],
    description: "Complete DBMS course covering relational databases, SQL, and normalization.",
    enrolled: 145000, image: null
  },
  // ===================== ALGORITHMS =====================
  {
    id: 58, title: "Algorithms Specialization", platform: "Coursera",
    instructor: "Tim Roughgarden, Stanford", rating: 4.8, reviews: 42000,
    duration: "4 months", difficulty: "Intermediate", price: 49,
    category: "Algorithms", tags: ["algorithms", "data structures", "stanford"],
    description: "Learn about algorithms and data structures from Stanford Professor.",
    enrolled: 520000, image: null
  },
  {
    id: 59, title: "Data Structures and Algorithms in Java", platform: "Udemy",
    instructor: "Robert Horvick", rating: 4.5, reviews: 24000,
    duration: "16 hours", difficulty: "Intermediate", price: 12.99,
    category: "Algorithms", tags: ["algorithms", "data structures", "java"],
    description: "Master algorithmic problem solving and ace coding interviews.",
    enrolled: 180000, image: null
  },
  {
    id: 60, title: "LeetCode Problems - Blind 75", platform: "LeetCode",
    instructor: "Community", rating: 4.8, reviews: 320000,
    duration: "Self-paced", difficulty: "Intermediate", price: 0,
    category: "Algorithms", tags: ["algorithms", "interview", "coding"],
    description: "The most essential 75 coding problems for interview preparation.",
    enrolled: 8200000, image: null
  },
  {
    id: 61, title: "Data Structures and Algorithms", platform: "NPTEL",
    instructor: "Prof. Naveen Garg", rating: 4.7, reviews: 12000,
    duration: "12 weeks", difficulty: "Intermediate", price: 0,
    category: "Algorithms", tags: ["algorithms", "data structures", "iit"],
    description: "IIT Delhi's comprehensive DSA course for CS students.",
    enrolled: 220000, image: null
  },
  {
    id: 62, title: "Algorithms - Princeton", platform: "Coursera",
    instructor: "Robert Sedgewick", rating: 4.9, reviews: 38000,
    duration: "6 weeks", difficulty: "Intermediate", price: 0,
    category: "Algorithms", tags: ["algorithms", "java", "princeton"],
    description: "Princeton's definitive algorithms course — Part I & II.",
    enrolled: 780000, image: null
  },
  // ===================== DEEP LEARNING =====================
  {
    id: 63, title: "Deep Learning Specialization", platform: "Coursera",
    instructor: "Andrew Ng", rating: 4.9, reviews: 128000,
    duration: "5 months", difficulty: "Advanced", price: 49,
    category: "Deep Learning", tags: ["deep learning", "neural networks", "tensorflow"],
    description: "Become a deep learning expert with Andrew Ng's specialization.",
    enrolled: 980000, image: null,
    link: "https://www.coursera.org/specializations/deep-learning"
  },
  {
    id: 64, title: "PyTorch for Deep Learning", platform: "Udemy",
    instructor: "Jose Portilla", rating: 4.6, reviews: 32000,
    duration: "18 hours", difficulty: "Advanced", price: 13.99,
    category: "Deep Learning", tags: ["pytorch", "deep learning", "cnn", "rnn"],
    description: "Build deep learning models with PyTorch — CNNs, RNNs, GANs, and more.",
    enrolled: 160000, image: null
  },
  {
    id: 65, title: "MIT 6.S191: Introduction to Deep Learning", platform: "YouTube",
    instructor: "Alexander Amini", rating: 4.9, reviews: 25000,
    duration: "Self-paced", difficulty: "Intermediate", price: 0,
    category: "Deep Learning", tags: ["deep learning", "mit", "tensorflow"],
    description: "MIT's official deep learning course — free video lectures.",
    enrolled: 4500000, image: null
  },
  {
    id: 66, title: "Deep Learning", platform: "NPTEL",
    instructor: "Prof. Mitesh Khapra", rating: 4.7, reviews: 9500,
    duration: "12 weeks", difficulty: "Advanced", price: 0,
    category: "Deep Learning", tags: ["deep learning", "neural networks", "iit"],
    description: "IIT Madras deep learning course covering CNNs, RNNs, and attention.",
    enrolled: 185000, image: null
  },
  // ===================== ADDITIONAL COURSES =====================
  {
    id: 67, title: "Learn to Code", platform: "Codecademy",
    instructor: "Codecademy Team", rating: 4.5, reviews: 280000,
    duration: "Self-paced", difficulty: "Beginner", price: 0,
    category: "Python", tags: ["python", "programming", "interactive"],
    description: "Interactive Python coding lessons for absolute beginners.",
    enrolled: 6500000, image: null
  },
  {
    id: 68, title: "JavaScript Path", platform: "Codecademy",
    instructor: "Codecademy Team", rating: 4.5, reviews: 195000,
    duration: "Self-paced", difficulty: "Beginner", price: 0,
    category: "JavaScript", tags: ["javascript", "interactive", "web"],
    description: "Learn JavaScript interactively — from basics to advanced.",
    enrolled: 4200000, image: null
  },
  {
    id: 69, title: "Node.js Path", platform: "Pluralsight",
    instructor: "Various Authors", rating: 4.4, reviews: 18000,
    duration: "20 hours", difficulty: "Intermediate", price: 29,
    category: "Web Development", tags: ["nodejs", "express", "backend"],
    description: "Master Node.js server-side development and REST APIs.",
    enrolled: 120000, image: null
  },
  {
    id: 70, title: "Vue.js - The Complete Guide", platform: "Udemy",
    instructor: "Maximilian Schwarzmüller", rating: 4.7, reviews: 52000,
    duration: "32 hours", difficulty: "Intermediate", price: 12.99,
    category: "Web Development", tags: ["vue", "javascript", "frontend"],
    description: "Learn Vue.js from the ground up — with composition API and Pinia.",
    enrolled: 280000, image: null
  },
  {
    id: 71, title: "Natural Language Processing Specialization", platform: "Coursera",
    instructor: "DeepLearning.AI", rating: 4.6, reviews: 18000,
    duration: "4 months", difficulty: "Advanced", price: 49,
    category: "Artificial Intelligence", tags: ["nlp", "transformers", "bert"],
    description: "Master NLP with attention models, transformers, and BERT.",
    enrolled: 180000, image: null
  },
  {
    id: 72, title: "Computer Vision with OpenCV and Deep Learning", platform: "Udemy",
    instructor: "Jose Portilla", rating: 4.5, reviews: 22000,
    duration: "14 hours", difficulty: "Advanced", price: 12.99,
    category: "Artificial Intelligence", tags: ["computer vision", "opencv", "cnn"],
    description: "Build computer vision apps with OpenCV and deep learning.",
    enrolled: 110000, image: null
  },
  {
    id: 73, title: "Terraform on AWS", platform: "Udemy",
    instructor: "Zeal Vora", rating: 4.5, reviews: 25000,
    duration: "14 hours", difficulty: "Intermediate", price: 12.99,
    category: "DevOps", tags: ["terraform", "aws", "infrastructure"],
    description: "Infrastructure as Code with Terraform and AWS.",
    enrolled: 95000, image: null
  },
  {
    id: 74, title: "Jenkins Pipeline CI/CD", platform: "YouTube",
    instructor: "TechWorld with Nana", rating: 4.8, reviews: 38000,
    duration: "Self-paced", difficulty: "Intermediate", price: 0,
    category: "DevOps", tags: ["jenkins", "ci/cd", "pipeline"],
    description: "Complete Jenkins tutorial for DevOps CI/CD pipelines.",
    enrolled: 3200000, image: null
  },
  {
    id: 75, title: "Reinforcement Learning Specialization", platform: "Coursera",
    instructor: "University of Alberta", rating: 4.7, reviews: 12000,
    duration: "4 months", difficulty: "Advanced", price: 49,
    category: "Machine Learning", tags: ["reinforcement learning", "rl", "mdp"],
    description: "Master reinforcement learning from fundamentals to deep RL.",
    enrolled: 120000, image: null
  },
  {
    id: 76, title: "Git and GitHub Crash Course", platform: "YouTube",
    instructor: "Traversy Media", rating: 4.8, reviews: 55000,
    duration: "1.5 hours", difficulty: "Beginner", price: 0,
    category: "DevOps", tags: ["git", "github", "version control"],
    description: "Learn Git and GitHub in under 2 hours — everything you need to know.",
    enrolled: 8500000, image: null
  },
  {
    id: 77, title: "AWS Solutions Architect Associate", platform: "Udemy",
    instructor: "Stephane Maarek", rating: 4.7, reviews: 195000,
    duration: "27 hours", difficulty: "Intermediate", price: 13.99,
    category: "Cloud Computing", tags: ["aws", "solutions architect", "certification"],
    description: "Pass the AWS SAA-C03 exam and become a Solutions Architect.",
    enrolled: 850000, image: null
  },
  {
    id: 78, title: "Competitive Programming Path", platform: "LeetCode",
    instructor: "Community", rating: 4.6, reviews: 85000,
    duration: "Self-paced", difficulty: "Advanced", price: 0,
    category: "Algorithms", tags: ["competitive programming", "algorithms", "contests"],
    description: "Prepare for coding competitions with curated problem sets.",
    enrolled: 3800000, image: null
  },
  {
    id: 79, title: "Figma UI/UX Design Essentials", platform: "Udemy",
    instructor: "Daniel Walter Scott", rating: 4.6, reviews: 44000,
    duration: "13 hours", difficulty: "Beginner", price: 12.99,
    category: "UI/UX Design", tags: ["figma", "ui", "design", "prototyping"],
    description: "Master Figma for real-world UI/UX design projects.",
    enrolled: 210000, image: null
  },
  {
    id: 80, title: "Generative AI with Large Language Models", platform: "Coursera",
    instructor: "DeepLearning.AI & AWS", rating: 4.8, reviews: 22000,
    duration: "3 weeks", difficulty: "Intermediate", price: 49,
    category: "Artificial Intelligence", tags: ["generative ai", "llm", "transformers"],
    description: "Learn to build and fine-tune generative AI with LLMs.",
    enrolled: 320000, image: null
  },
  {
    id: 81, title: "Prompt Engineering for ChatGPT", platform: "Coursera",
    instructor: "Vanderbilt University", rating: 4.7, reviews: 15000,
    duration: "18 hours", difficulty: "Beginner", price: 0,
    category: "Artificial Intelligence", tags: ["prompt engineering", "chatgpt", "ai"],
    description: "Master the art of writing effective prompts for AI systems.",
    enrolled: 280000, image: null
  },
  {
    id: 82, title: "Rust Programming Language", platform: "YouTube",
    instructor: "Let's Get Rusty", rating: 4.8, reviews: 28000,
    duration: "Self-paced", difficulty: "Intermediate", price: 0,
    category: "Web Development", tags: ["rust", "systems", "programming"],
    description: "Learn Rust programming from scratch with practical examples.",
    enrolled: 1800000, image: null
  },
  {
    id: 83, title: "TypeScript Masterclass", platform: "Udemy",
    instructor: "Maximilian Schwarzmüller", rating: 4.7, reviews: 48000,
    duration: "15 hours", difficulty: "Intermediate", price: 12.99,
    category: "JavaScript", tags: ["typescript", "javascript", "types"],
    description: "Master TypeScript for large-scale JavaScript applications.",
    enrolled: 320000, image: null
  },
  {
    id: 84, title: "System Design for Interviews", platform: "YouTube",
    instructor: "Gaurav Sen", rating: 4.9, reviews: 62000,
    duration: "Self-paced", difficulty: "Advanced", price: 0,
    category: "Algorithms", tags: ["system design", "architecture", "scalability"],
    description: "Learn system design concepts for senior-level tech interviews.",
    enrolled: 9200000, image: null
  },
  {
    id: 85, title: "Data Engineering with Python", platform: "Coursera",
    instructor: "IBM", rating: 4.5, reviews: 14000,
    duration: "7 months", difficulty: "Intermediate", price: 39,
    category: "Data Science", tags: ["data engineering", "etl", "python", "spark"],
    description: "Build scalable data pipelines with Python, SQL, and Apache Spark.",
    enrolled: 120000, image: null,
    link: "https://www.coursera.org/professional-certificates/data-engineering"
  },
  // ===================== KAGGLE DATASETS =====================
  {
    id: 86, title: "Intro to Machine Learning", platform: "Kaggle",
    instructor: "Kaggle Team", rating: 4.8, reviews: 95000,
    duration: "3 hours", difficulty: "Beginner", price: 0,
    category: "Machine Learning", tags: ["machine learning", "kaggle", "datasets", "models"],
    description: "Learn the core ideas in ML and build your first models using huge real-world datasets.",
    enrolled: 1500000, image: null,
    link: "https://www.kaggle.com/learn/intro-to-machine-learning"
  },
  {
    id: 87, title: "Pandas — Data Manipulation", platform: "Kaggle",
    instructor: "Kaggle Team", rating: 4.7, reviews: 82000,
    duration: "4 hours", difficulty: "Beginner", price: 0,
    category: "Data Science", tags: ["pandas", "data", "kaggle", "datasets"],
    description: "Solve hands-on challenges to master data manipulation with Pandas on huge datasets.",
    enrolled: 1200000, image: null,
    link: "https://www.kaggle.com/learn/pandas"
  },
  {
    id: 88, title: "Intro to Deep Learning", platform: "Kaggle",
    instructor: "Kaggle Team", rating: 4.7, reviews: 48000,
    duration: "4 hours", difficulty: "Intermediate", price: 0,
    category: "Deep Learning", tags: ["deep learning", "tensorflow", "kaggle", "datasets"],
    description: "Use TensorFlow and Keras to build and train neural networks on large-scale datasets.",
    enrolled: 680000, image: null,
    link: "https://www.kaggle.com/learn/intro-to-deep-learning"
  },
  {
    id: 89, title: "Feature Engineering", platform: "Kaggle",
    instructor: "Kaggle Team", rating: 4.6, reviews: 35000,
    duration: "5 hours", difficulty: "Intermediate", price: 0,
    category: "Data Science", tags: ["feature engineering", "data", "kaggle"],
    description: "Discover techniques for better features from huge, messy real-world data.",
    enrolled: 520000, image: null,
    link: "https://www.kaggle.com/learn/feature-engineering"
  },
  {
    id: 90, title: "Computer Vision", platform: "Kaggle",
    instructor: "Kaggle Team", rating: 4.7, reviews: 28000,
    duration: "4 hours", difficulty: "Advanced", price: 0,
    category: "Deep Learning", tags: ["computer vision", "cnn", "kaggle", "image datasets"],
    description: "Build convolutional neural networks with massive image datasets on Kaggle.",
    enrolled: 380000, image: null,
    link: "https://www.kaggle.com/learn/computer-vision"
  },
  // ===================== HUGGING FACE DATASETS =====================
  {
    id: 91, title: "NLP Course — Hugging Face", platform: "Hugging Face Datasets",
    instructor: "Hugging Face Team", rating: 4.9, reviews: 42000,
    duration: "Self-paced", difficulty: "Intermediate", price: 0,
    category: "Artificial Intelligence", tags: ["nlp", "transformers", "hugging face", "huge datasets"],
    description: "Learn to use Transformers, tokenizers, and huge NLP datasets from Hugging Face Hub.",
    enrolled: 520000, image: null,
    link: "https://huggingface.co/learn/nlp-course"
  },
  {
    id: 92, title: "Deep RL Course", platform: "Hugging Face Datasets",
    instructor: "Hugging Face Team", rating: 4.8, reviews: 18000,
    duration: "Self-paced", difficulty: "Advanced", price: 0,
    category: "Machine Learning", tags: ["reinforcement learning", "hugging face", "deep rl"],
    description: "Train agents from scratch using deep reinforcement learning with open datasets.",
    enrolled: 280000, image: null,
    link: "https://huggingface.co/learn/deep-rl-course"
  },
  {
    id: 93, title: "Audio Course", platform: "Hugging Face Datasets",
    instructor: "Hugging Face Team", rating: 4.7, reviews: 12000,
    duration: "Self-paced", difficulty: "Intermediate", price: 0,
    category: "Artificial Intelligence", tags: ["audio", "speech", "hugging face", "datasets"],
    description: "Learn audio processing and speech recognition using huge open audio datasets.",
    enrolled: 145000, image: null,
    link: "https://huggingface.co/learn/audio-course"
  },
  {
    id: 94, title: "Diffusion Models Course", platform: "Hugging Face Datasets",
    instructor: "Hugging Face Team", rating: 4.8, reviews: 15000,
    duration: "Self-paced", difficulty: "Advanced", price: 0,
    category: "Deep Learning", tags: ["diffusion", "generative ai", "hugging face"],
    description: "Understand and build diffusion models for image generation with large-scale datasets.",
    enrolled: 210000, image: null,
    link: "https://huggingface.co/learn/diffusion-course"
  },
  // ===================== AWS OPEN DATA =====================
  {
    id: 95, title: "AWS Open Data — Satellite Imagery", platform: "AWS Open Data",
    instructor: "AWS", rating: 4.6, reviews: 8000,
    duration: "Self-paced", difficulty: "Advanced", price: 0,
    category: "Data Science", tags: ["satellite", "geospatial", "aws", "huge datasets"],
    description: "Explore massive satellite imagery datasets on AWS Open Data for geospatial analysis.",
    enrolled: 45000, image: null,
    link: "https://registry.opendata.aws/"
  },
  {
    id: 96, title: "AWS Open Data — Genomics", platform: "AWS Open Data",
    instructor: "AWS", rating: 4.5, reviews: 5500,
    duration: "Self-paced", difficulty: "Advanced", price: 0,
    category: "Data Science", tags: ["genomics", "bioinformatics", "aws", "huge datasets"],
    description: "Access and analyze massive genomics datasets hosted on AWS Open Data.",
    enrolled: 32000, image: null,
    link: "https://registry.opendata.aws/"
  },
  {
    id: 97, title: "AWS Open Data — Climate & Weather", platform: "AWS Open Data",
    instructor: "AWS", rating: 4.6, reviews: 7200,
    duration: "Self-paced", difficulty: "Intermediate", price: 0,
    category: "Data Science", tags: ["climate", "weather", "aws", "huge datasets"],
    description: "Analyze petabyte-scale climate and weather datasets using AWS cloud services.",
    enrolled: 58000, image: null,
    link: "https://registry.opendata.aws/"
  },
  // ===================== UCI MACHINE LEARNING =====================
  {
    id: 98, title: "UCI ML Repository — Classification Datasets", platform: "UCI Machine Learning",
    instructor: "UCI", rating: 4.7, reviews: 120000,
    duration: "Self-paced", difficulty: "Beginner", price: 0,
    category: "Machine Learning", tags: ["classification", "uci", "benchmark datasets"],
    description: "Practice ML classification with the world's most cited benchmark datasets from UCI.",
    enrolled: 2800000, image: null,
    link: "https://archive.ics.uci.edu/"
  },
  {
    id: 99, title: "UCI ML Repository — Regression Datasets", platform: "UCI Machine Learning",
    instructor: "UCI", rating: 4.6, reviews: 85000,
    duration: "Self-paced", difficulty: "Intermediate", price: 0,
    category: "Machine Learning", tags: ["regression", "uci", "benchmark datasets"],
    description: "Build and evaluate regression models using classic huge benchmark datasets.",
    enrolled: 1900000, image: null,
    link: "https://archive.ics.uci.edu/"
  },
  {
    id: 100, title: "UCI ML Repository — Clustering Datasets", platform: "UCI Machine Learning",
    instructor: "UCI", rating: 4.5, reviews: 62000,
    duration: "Self-paced", difficulty: "Intermediate", price: 0,
    category: "Machine Learning", tags: ["clustering", "uci", "unsupervised", "benchmark"],
    description: "Explore unsupervised learning with huge clustering datasets from UCI repository.",
    enrolled: 1200000, image: null,
    link: "https://archive.ics.uci.edu/"
  },
  {
    id: 101, title: "Kaggle Data Cleaning", platform: "Kaggle",
    instructor: "Kaggle Team", rating: 4.6, reviews: 52000,
    duration: "4 hours", difficulty: "Beginner", price: 0,
    category: "Data Science", tags: ["data cleaning", "missing data", "kaggle"],
    description: "Handle missing values, inconsistencies, and scaling in huge real-world datasets.",
    enrolled: 750000, image: null,
    link: "https://www.kaggle.com/learn/data-cleaning"
  },
  {
    id: 102, title: "Intro to SQL", platform: "Kaggle",
    instructor: "Kaggle Team", rating: 4.7, reviews: 68000,
    duration: "3 hours", difficulty: "Beginner", price: 0,
    category: "Database", tags: ["sql", "bigquery", "kaggle", "huge datasets"],
    description: "Learn SQL and query huge datasets using Google BigQuery on Kaggle.",
    enrolled: 980000, image: null,
    link: "https://www.kaggle.com/learn/intro-to-sql"
  },
  {
    id: 103, title: "Time Series", platform: "Kaggle",
    instructor: "Kaggle Team", rating: 4.6, reviews: 22000,
    duration: "5 hours", difficulty: "Intermediate", price: 0,
    category: "Data Science", tags: ["time series", "forecasting", "kaggle"],
    description: "Apply ML to real-world forecasting problems on large-scale time series datasets.",
    enrolled: 340000, image: null,
    link: "https://www.kaggle.com/learn/time-series"
  },
  {
    id: 104, title: "Intro to AI Ethics", platform: "Kaggle",
    instructor: "Kaggle Team", rating: 4.5, reviews: 18000,
    duration: "2 hours", difficulty: "Beginner", price: 0,
    category: "Artificial Intelligence", tags: ["ethics", "fairness", "kaggle"],
    description: "Explore practical tools to address AI bias in datasets and models.",
    enrolled: 280000, image: null,
    link: "https://www.kaggle.com/learn/intro-to-ai-ethics"
  }
];
// Merge hand-crafted + generated courses
const generatedCourses = generateCourses(200, 1500);
export const allCourses = [...courses, ...generatedCourses];

// Helper: get unique platforms from data
export function getUniquePlatforms() {
  return [...new Set(allCourses.map(c => c.platform))].sort();
}

// Helper: get unique categories
export function getUniqueCategories() {
  return [...new Set(allCourses.map(c => c.category))].sort();
}

// Helper: get unique certificate types
export function getCertTypes() {
  return [...new Set(allCourses.filter(c => c.certType).map(c => c.certType))].sort();
}
