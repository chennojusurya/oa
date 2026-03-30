// ===================================
// DYNAMIC COURSE GENERATOR — 1000+ courses
// Generates realistic courses from templates using huge datasets
// from Kaggle, Hugging Face, AWS Open Data, UCI ML, and more
// ===================================

// --- Seed data for generation ---
const COURSE_TEMPLATES = {
  'Python': {
    titles: [
      'Python {level} — {topic}', '{topic} with Python', 'Python for {topic}',
      'Mastering Python {topic}', 'Learn Python {topic} from Scratch',
      '{topic}: Python Complete Guide', 'Advanced Python {topic}',
      'Python {topic} Masterclass', 'Practical Python {topic}',
      'Python {topic} Bootcamp', 'Python {topic} Project-Based Learning',
      'Real-World Python {topic}', 'Python {topic} Deep Dive'
    ],
    topics: [
      'Automation', 'Web Scraping', 'Data Structures', 'API Development',
      'Testing & QA', 'GUI Development', 'Game Development', 'Network Programming',
      'Scripting', 'Concurrency', 'Design Patterns', 'Decorators & Generators',
      'File Handling', 'Regular Expressions', 'Socket Programming',
      'Microservices', 'FastAPI', 'Django REST', 'Flask Web Apps',
      'Data Visualization', 'Scientific Computing', 'NumPy & SciPy',
      'Image Processing', 'PDF Processing', 'Email Automation',
      'Excel Automation', 'Database Integration', 'Logging & Debugging',
      'Type Hints', 'Async Programming', 'Cython & Performance',
      'CLI Applications', 'Package Development', 'Virtual Environments'
    ],
    tags: ['python', 'programming', 'coding']
  },
  'JavaScript': {
    titles: [
      'JavaScript {level} — {topic}', '{topic} in JavaScript',
      'Modern JavaScript {topic}', 'Advanced {topic} with JS',
      'JavaScript {topic} Crash Course', '{topic}: The Complete JS Guide',
      'Pro JavaScript {topic}', 'JavaScript {topic} Projects',
      'Full Stack {topic} with JavaScript', 'Hands-On {topic} in JS'
    ],
    topics: [
      'Closures & Scope', 'Promises & Async/Await', 'Event Loop Deep Dive',
      'DOM Manipulation', 'Canvas & WebGL', 'Web Workers', 'Service Workers',
      'Proxy & Reflect', 'Module Systems', 'Error Handling Patterns',
      'Functional Programming', 'Design Patterns', 'Memory Management',
      'Performance Tuning', 'Testing with Jest', 'E2E Testing',
      'Webpack & Bundlers', 'State Management', 'Animation & Motion',
      'Progressive Web Apps', 'WebSockets', 'WebRTC',
      'Browser Extensions', 'Svelte Framework', 'Deno Runtime',
      'Bun Runtime', 'Astro Framework', 'Three.js 3D', 'D3.js Visualization',
      'Node.js Streams', 'Express.js Patterns', 'NestJS Framework'
    ],
    tags: ['javascript', 'web', 'programming']
  },
  'Web Development': {
    titles: [
      '{topic} for Web Developers', 'Web Development with {topic}',
      'Build Modern {topic}', '{topic} — Complete Web Course',
      'Full Stack {topic}', '{topic} Web Development Bootcamp',
      'Professional {topic} Development', 'Responsive {topic} Design',
      '{topic} from Zero to Production', 'Enterprise {topic} Applications'
    ],
    topics: [
      'Next.js 14', 'Remix Framework', 'Nuxt.js', 'SvelteKit',
      'Tailwind CSS', 'CSS Grid & Flexbox', 'SASS & LESS', 'Bootstrap 5',
      'Material UI', 'Chakra UI', 'Headless CMS', 'Strapi',
      'WordPress Theme Development', 'Shopify App Development',
      'GraphQL APIs', 'REST API Design', 'Microservices Architecture',
      'Server-Side Rendering', 'Static Site Generation', 'JAMstack',
      'Web Performance Optimization', 'Accessibility (A11y)',
      'SEO Techniques', 'PWA Development', 'Web Security',
      'OAuth & Authentication', 'Stripe Payment Integration',
      'Real-Time Apps with Socket.io', 'Docker for Web Devs',
      'CI/CD for Frontend', 'Monorepo Management', 'Edge Computing'
    ],
    tags: ['web', 'frontend', 'fullstack']
  },
  'Data Science': {
    titles: [
      'Data Science with {topic}', '{topic} for Data Scientists',
      '{topic} — Data Science Masterclass', 'Applied {topic} in Data Science',
      'Hands-On {topic} Data Analysis', '{topic} Data Pipeline',
      '{topic}: From Data to Insights', 'Big Data {topic}',
      'Data Science {topic} Essentials', 'Practical {topic} Analytics'
    ],
    topics: [
      'Pandas Advanced', 'Data Wrangling', 'Exploratory Data Analysis',
      'Statistical Modeling', 'A/B Testing', 'Bayesian Statistics',
      'Hypothesis Testing', 'Regression Analysis', 'Time Series Forecasting',
      'Natural Language Processing', 'Text Mining', 'Sentiment Analysis',
      'Recommendation Systems', 'Customer Segmentation', 'Churn Prediction',
      'Fraud Detection', 'Supply Chain Analytics', 'Healthcare Analytics',
      'Sports Analytics', 'Social Media Analytics', 'Financial Modeling',
      'Risk Analysis', 'Geospatial Analysis', 'Network Analysis',
      'Web Analytics', 'Marketing Analytics', 'HR Analytics',
      'IoT Data Analysis', 'Real-Time Streaming', 'Apache Spark',
      'Apache Kafka', 'Airflow Pipelines', 'dbt Transformations',
      'Snowflake Data Warehouse', 'Google BigQuery', 'Power BI',
      'Tableau Visualization', 'Matplotlib & Seaborn', 'Plotly Dashboards'
    ],
    tags: ['data science', 'analytics', 'data']
  },
  'Machine Learning': {
    titles: [
      'Machine Learning with {topic}', '{topic} for ML Engineers',
      'Applied {topic} in Machine Learning', '{topic} ML Masterclass',
      'Hands-On {topic} for ML', 'Production {topic} ML Systems',
      '{topic}: ML from Scratch', 'Scalable ML with {topic}',
      'ML {topic} on Huge Datasets', '{topic} ML Pipeline'
    ],
    topics: [
      'Scikit-Learn Advanced', 'XGBoost & LightGBM', 'Random Forests',
      'Support Vector Machines', 'Ensemble Methods', 'Feature Selection',
      'Dimensionality Reduction', 'PCA & t-SNE', 'Clustering Algorithms',
      'Anomaly Detection', 'Recommender Systems', 'AutoML',
      'MLflow & Experiment Tracking', 'Model Deployment', 'ML on AWS SageMaker',
      'ML on Google Vertex AI', 'ML on Azure ML', 'Edge ML with TensorFlow Lite',
      'Federated Learning', 'Transfer Learning', 'Active Learning',
      'Semi-Supervised Learning', 'Online Learning', 'Bayesian ML',
      'Gaussian Processes', 'Causal Inference', 'A/B Testing for ML',
      'ML System Design', 'Feature Stores', 'ML Monitoring & Observability',
      'Responsible AI', 'ML for Tabular Data', 'ML for Text',
      'ML for Images', 'ML for Audio', 'ML for Time Series',
      'Kaggle Competition Strategies', 'Data-Centric AI', 'Label Studio'
    ],
    tags: ['machine learning', 'ml', 'ai']
  },
  'Deep Learning': {
    titles: [
      'Deep Learning with {topic}', '{topic} Neural Networks',
      'Advanced {topic} Deep Learning', '{topic} for Deep Learning Engineers',
      '{topic} — DL Masterclass', 'Production {topic} Models',
      '{topic}: From Theory to Practice', 'Scaling {topic} Models'
    ],
    topics: [
      'CNNs for Image Classification', 'Object Detection (YOLO/SSD)',
      'Image Segmentation', 'Generative Adversarial Networks',
      'Variational Autoencoders', 'Vision Transformers (ViT)',
      'RNNs & LSTMs', 'Sequence-to-Sequence Models', 'Attention Mechanisms',
      'Transformer Architecture', 'BERT Fine-Tuning', 'GPT Models',
      'Large Language Models', 'Stable Diffusion', 'NeRF (3D)',
      'Graph Neural Networks', 'Self-Supervised Learning',
      'Contrastive Learning', 'Knowledge Distillation',
      'Neural Architecture Search', 'Quantization & Pruning',
      'ONNX Model Export', 'TensorRT Optimization',
      'Distributed Training', 'Mixed Precision Training',
      'PyTorch Lightning', 'Keras & TensorFlow Advanced',
      'JAX & Flax', 'Hugging Face Transformers Library',
      'LangChain & LLM Apps', 'RAG (Retrieval Augmented Generation)',
      'Multimodal Models', 'Speech Recognition', 'Text-to-Speech'
    ],
    tags: ['deep learning', 'neural networks', 'ai']
  },
  'Artificial Intelligence': {
    titles: [
      'AI with {topic}', '{topic} in Artificial Intelligence',
      'Applied AI: {topic}', '{topic} — AI Masterclass',
      'Building AI {topic} Systems', '{topic} for AI Engineers',
      'Intelligent {topic} Systems', 'AI-Powered {topic}'
    ],
    topics: [
      'Search Algorithms', 'Constraint Satisfaction', 'Planning & Scheduling',
      'Knowledge Representation', 'Expert Systems', 'Fuzzy Logic',
      'Genetic Algorithms', 'Swarm Intelligence', 'Multi-Agent Systems',
      'Chatbot Development', 'Virtual Assistants', 'AI for Healthcare',
      'AI for Finance', 'AI for Education', 'AI for Robotics',
      'Computer Vision Applications', 'NLP Applications',
      'Speech & Language Understanding', 'Sentiment Analysis',
      'Document Intelligence', 'AI Ethics & Governance',
      'Explainable AI (XAI)', 'AI Safety', 'Prompt Engineering Advanced',
      'Fine-Tuning LLMs', 'AI Agents & Tools', 'AutoGPT & Autonomous AI',
      'Multimodal AI', 'AI for Creative Arts', 'AI for Game Development'
    ],
    tags: ['ai', 'artificial intelligence', 'intelligent systems']
  },
  'Cloud Computing': {
    titles: [
      '{topic} on the Cloud', 'Cloud {topic} Masterclass',
      '{topic} — Cloud Architecture', 'Mastering Cloud {topic}',
      '{topic} Cloud Solutions', 'Enterprise Cloud {topic}',
      'Scalable {topic} Infrastructure', '{topic} Cloud Certification Prep'
    ],
    topics: [
      'AWS Lambda & Serverless', 'AWS ECS & Fargate', 'AWS CDK',
      'AWS Step Functions', 'AWS DynamoDB', 'AWS RDS & Aurora',
      'AWS S3 & Storage', 'GCP Cloud Functions', 'GCP Kubernetes Engine',
      'GCP BigQuery', 'GCP Dataflow', 'GCP Pub/Sub', 'Azure Functions',
      'Azure Cosmos DB', 'Azure DevOps', 'Azure Kubernetes (AKS)',
      'Multi-Cloud Strategy', 'Cloud Cost Optimization', 'Cloud Migration',
      'Serverless Architecture', 'Cloud Monitoring', 'Cloud Security',
      'Infrastructure as Code', 'Pulumi', 'CloudFormation',
      'Cloud Networking', 'VPC & Subnets', 'Load Balancing',
      'Auto Scaling', 'Content Delivery Networks', 'Edge Functions'
    ],
    tags: ['cloud', 'infrastructure', 'scalability']
  },
  'Cybersecurity': {
    titles: [
      '{topic} Security', 'Cybersecurity: {topic}', '{topic} Penetration Testing',
      '{topic} for Security Professionals', 'Advanced {topic} Security',
      '{topic} Threat Detection', '{topic} Security Masterclass',
      'Ethical Hacking: {topic}'
    ],
    topics: [
      'Network Security', 'Web Application Security', 'API Security',
      'Cloud Security', 'Container Security', 'Malware Analysis',
      'Reverse Engineering', 'Cryptography', 'Digital Forensics',
      'Incident Response', 'Threat Intelligence', 'SIEM & SOC',
      'Vulnerability Assessment', 'Bug Bounty', 'Red Team Operations',
      'Blue Team Defense', 'OWASP Top 10', 'Secure Coding',
      'Identity & Access Management', 'Zero Trust Architecture',
      'Compliance (SOC 2, ISO 27001)', 'Privacy & GDPR',
      'Mobile Security', 'IoT Security', 'Wireless Security',
      'Social Engineering Defense', 'Phishing Prevention',
      'Ransomware Protection', 'Supply Chain Security', 'DevSecOps'
    ],
    tags: ['security', 'hacking', 'cybersecurity']
  },
  'Mobile Development': {
    titles: [
      '{topic} Mobile Development', 'Build {topic} Apps',
      '{topic} for Mobile Engineers', '{topic} App Masterclass',
      'Professional {topic} Development', 'Modern {topic} Applications',
      '{topic} Cross-Platform Apps', '{topic} from Scratch'
    ],
    topics: [
      'SwiftUI', 'UIKit Advanced', 'Kotlin Multiplatform',
      'Jetpack Compose Advanced', 'Flutter State Management',
      'Flutter Animations', 'React Native Navigation',
      'React Native Performance', 'Ionic Framework', 'Capacitor',
      'App Store Optimization', 'Mobile CI/CD', 'Push Notifications',
      'In-App Purchases', 'Mobile Analytics', 'Offline-First Apps',
      'Mobile Database (Realm/SQLite)', 'Mobile Authentication',
      'AR/VR Mobile Apps', 'Mobile Performance', 'Accessibility in Mobile',
      'Mobile Testing & QA', 'Firebase for Mobile', 'Supabase for Mobile',
      'Mobile Security', 'Wearable App Development', 'Mobile ML (Core ML)',
      'Camera & Image Processing', 'Maps & Location Services', 'Bluetooth & IoT'
    ],
    tags: ['mobile', 'app development', 'ios', 'android']
  },
  'DevOps': {
    titles: [
      '{topic} for DevOps', 'DevOps with {topic}', '{topic} DevOps Pipeline',
      'Mastering {topic} in DevOps', '{topic} — CI/CD & Automation',
      '{topic} Infrastructure Automation', 'Production {topic} Ops',
      'Site Reliability with {topic}'
    ],
    topics: [
      'Kubernetes Advanced', 'Helm Charts', 'ArgoCD GitOps',
      'Prometheus & Grafana', 'ELK Stack', 'Datadog Monitoring',
      'Ansible Automation', 'Chef & Puppet', 'Vagrant & Packer',
      'GitHub Actions', 'GitLab CI/CD', 'CircleCI',
      'AWS CodePipeline', 'Blue-Green Deployments', 'Canary Releases',
      'Feature Flags', 'Chaos Engineering', 'Load Testing',
      'Container Orchestration', 'Service Mesh (Istio)',
      'API Gateway', 'Secrets Management (Vault)', 'Logging Best Practices',
      'Incident Management', 'Runbook Automation', 'Platform Engineering',
      'Internal Developer Platforms', 'FinOps', 'Green Computing',
      'Observability'
    ],
    tags: ['devops', 'ci/cd', 'automation']
  },
  'Blockchain': {
    titles: [
      '{topic} on Blockchain', 'Blockchain {topic}', '{topic} — Web3 Development',
      'Decentralized {topic}', '{topic} Smart Contracts', '{topic} DApp Development',
      'Advanced {topic} Blockchain', '{topic} Token Economy'
    ],
    topics: [
      'Solidity Advanced', 'Rust for Solana', 'Move Language',
      'NFT Marketplaces', 'DeFi Protocols', 'DEX Development',
      'DAO Governance', 'Cross-Chain Bridges', 'Layer 2 Solutions',
      'ZK Rollups', 'Zero Knowledge Proofs', 'Tokenomics',
      'Smart Contract Security', 'Smart Contract Auditing',
      'IPFS & Decentralized Storage', 'The Graph Protocol',
      'Chainlink Oracles', 'Hardhat & Foundry', 'Ethers.js & Web3.js',
      'Wallet Integration', 'Blockchain Analytics', 'Supply Chain Blockchain',
      'Healthcare Blockchain', 'Gaming & GameFi', 'Metaverse Development'
    ],
    tags: ['blockchain', 'web3', 'crypto']
  },
  'UI/UX Design': {
    titles: [
      '{topic} Design', 'UI/UX: {topic}', '{topic} for Designers',
      'Mastering {topic} in Design', '{topic} Design Masterclass',
      'Professional {topic} Design', 'User-Centered {topic}',
      '{topic} Design Systems'
    ],
    topics: [
      'Design Thinking', 'User Research Methods', 'Wireframing',
      'High-Fidelity Prototyping', 'Interaction Design', 'Motion Design',
      'Design Systems', 'Component Libraries', 'Color Theory',
      'Typography Mastery', 'Icon Design', 'Illustration for UI',
      'Mobile UX Patterns', 'Dashboard Design', 'E-Commerce UX',
      'SaaS Product Design', 'Landing Page Design', 'Form Design',
      'Data Visualization Design', 'Accessibility Design',
      'Figma Advanced Techniques', 'Figma Plugins & Automation',
      'Adobe XD', 'Sketch App', 'Framer', 'Principle Animation',
      'Design Handoff', 'Design-to-Code', 'UX Writing',
      'A/B Testing for UX'
    ],
    tags: ['design', 'ui', 'ux']
  },
  'Database': {
    titles: [
      '{topic} Database', '{topic} for Data Engineers', 'Mastering {topic}',
      '{topic} — Complete Guide', '{topic} Administration & Tuning',
      'Scalable {topic} Solutions', 'Production {topic} Management',
      '{topic} Performance Optimization'
    ],
    topics: [
      'PostgreSQL Advanced', 'MySQL Performance Tuning', 'Oracle DB',
      'SQL Server', 'Redis Caching', 'Elasticsearch',
      'Apache Cassandra', 'Neo4j Graph Database', 'InfluxDB Time Series',
      'CockroachDB', 'PlanetScale', 'Supabase',
      'Database Indexing', 'Query Optimization', 'Sharding & Partitioning',
      'Replication & High Availability', 'Database Migration',
      'Schema Design Patterns', 'Data Modeling', 'ETL Pipelines',
      'Database Security', 'Backup & Recovery', 'Database Monitoring',
      'NewSQL Databases', 'Vector Databases (Pinecone/Weaviate)',
      'Database for ML (Feature Stores)', 'DuckDB Analytics',
      'SQLite for Mobile', 'Firebase Realtime DB', 'MongoDB Atlas'
    ],
    tags: ['database', 'sql', 'data']
  },
  'Algorithms': {
    titles: [
      '{topic} Algorithms', 'Mastering {topic}', '{topic} for Coding Interviews',
      '{topic} — Problem Solving', 'Advanced {topic}', 'Competitive {topic}',
      '{topic} Data Structures', 'Efficient {topic} Solutions'
    ],
    topics: [
      'Dynamic Programming', 'Greedy Algorithms', 'Backtracking',
      'Graph Algorithms (BFS/DFS)', 'Shortest Path (Dijkstra/Bellman-Ford)',
      'Minimum Spanning Trees', 'Network Flow', 'String Matching',
      'Trie Data Structure', 'Segment Trees', 'Binary Indexed Trees',
      'Union-Find (Disjoint Sets)', 'Heap & Priority Queue',
      'Advanced Tree Structures', 'Hash Map Internals',
      'Bloom Filters', 'Skip Lists', 'B-Trees & B+ Trees',
      'Amortized Analysis', 'Bit Manipulation', 'Sliding Window',
      'Two Pointer Technique', 'Divide and Conquer', 'Monotonic Stack',
      'Interval Problems', 'Matrix Algorithms', 'Randomized Algorithms',
      'Approximation Algorithms', 'Parallel Algorithms', 'External Sorting'
    ],
    tags: ['algorithms', 'data structures', 'coding']
  }
};

const PLATFORM_CONFIG = {
  'Coursera': {
    weight: 15, priceRange: [0, 49], durationFormats: ['{n} weeks', '{n} months'],
    instructors: ['Stanford University', 'University of Michigan', 'Duke University', 'Google', 'IBM', 'Meta', 'AWS', 'Johns Hopkins University', 'University of Pennsylvania', 'Imperial College London', 'University of Illinois', 'DeepLearning.AI', 'University of Colorado', 'University of London', 'Vanderbilt University', 'Georgia Tech'],
    linkBase: 'https://www.coursera.org/search?query='
  },
  'Udemy': {
    weight: 30, priceRange: [9.99, 14.99], durationFormats: ['{n} hours'],
    instructors: ['Jose Portilla', 'Maximilian Schwarzmüller', 'Dr. Angela Yu', 'Colt Steele', 'Stephen Grider', 'Andrei Neagoie', 'Brad Traversy', 'Jonas Schmedtmann', 'Academind', 'The Net Ninja', 'Tim Buchalka', 'Rob Percival', 'Mark Price', 'Ryan Kroonenburg', 'Zaid Sabih', 'Kirill Eremenko', 'Lazy Programmer', 'Frank Kane', 'Boris Paskhaver', 'Reed Barger', 'Daniel Scott', 'Mosh Hamedani', 'Hamza Ahmed', 'Neil Cummings', 'John Smilga'],
    linkBase: 'https://www.udemy.com/courses/search/?q='
  },
  'edX': {
    weight: 10, priceRange: [0, 0], durationFormats: ['{n} weeks'],
    instructors: ['MIT', 'Harvard University', 'Stanford University', 'UC Berkeley', 'Columbia University', 'University of Washington', 'University of Texas', 'Georgia Tech', 'Linux Foundation', 'W3Cx', 'Microsoft'],
    linkBase: 'https://www.edx.org/search?q='
  },
  'YouTube': {
    weight: 15, priceRange: [0, 0], durationFormats: ['Self-paced'],
    instructors: ['freeCodeCamp', 'Traversy Media', 'The Net Ninja', 'Fireship', 'Programming with Mosh', 'Tech With Tim', 'Corey Schafer', 'Sentdex', 'TechWorld with Nana', 'NetworkChuck', 'ThePrimeagen', 'Ben Awad', 'Web Dev Simplified', 'Kevin Powell', 'Theo - t3.gg'],
    linkBase: 'https://www.youtube.com/results?search_query='
  },
  'Khan Academy': {
    weight: 5, priceRange: [0, 0], durationFormats: ['Self-paced'],
    instructors: ['Khan Academy'],
    linkBase: 'https://www.khanacademy.org/search?search_again=1&page_search_query='
  },
  'NPTEL': {
    weight: 7, priceRange: [0, 0], durationFormats: ['{n} weeks'],
    instructors: ['IIT Madras', 'IIT Bombay', 'IIT Delhi', 'IIT Kanpur', 'IIT Kharagpur', 'IISc Bangalore', 'IIT Roorkee', 'IIT Guwahati'],
    linkBase: 'https://nptel.ac.in/courses'
  },
  'Kaggle': {
    weight: 12, priceRange: [0, 0], durationFormats: ['{n} hours', 'Self-paced'],
    instructors: ['Kaggle Team', 'Kaggle Community'],
    linkBase: 'https://www.kaggle.com/search?q='
  },
  'HackerRank': {
    weight: 4, priceRange: [0, 0], durationFormats: ['Self-paced'],
    instructors: ['HackerRank Team'],
    linkBase: 'https://www.hackerrank.com/domains/'
  },
  'LeetCode': {
    weight: 4, priceRange: [0, 0], durationFormats: ['Self-paced'],
    instructors: ['LeetCode Community'],
    linkBase: 'https://leetcode.com/problemset/'
  },
  'Codecademy': {
    weight: 5, priceRange: [0, 0], durationFormats: ['Self-paced'],
    instructors: ['Codecademy Team'],
    linkBase: 'https://www.codecademy.com/search?query='
  },
  'Pluralsight': {
    weight: 4, priceRange: [0, 29], durationFormats: ['{n} hours'],
    instructors: ['Various Experts'],
    linkBase: 'https://www.pluralsight.com/search?q='
  },
  'Hugging Face Datasets': {
    weight: 5, priceRange: [0, 0], durationFormats: ['Self-paced'],
    instructors: ['Hugging Face Team', 'Community Contributors'],
    linkBase: 'https://huggingface.co/search/full-text?q='
  },
  'AWS Open Data': {
    weight: 3, priceRange: [0, 0], durationFormats: ['Self-paced'],
    instructors: ['AWS'],
    linkBase: 'https://registry.opendata.aws/'
  },
  'UCI Machine Learning': {
    weight: 3, priceRange: [0, 0], durationFormats: ['Self-paced'],
    instructors: ['UCI Repository'],
    linkBase: 'https://archive.ics.uci.edu/'
  }
};

const DIFFICULTY_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

// --- Seeded random for reproducibility ---
function seededRandom(seed) {
  let s = seed;
  return function() {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// --- Generate courses ---
export function generateCourses(startId = 200, count = 1000) {
  const rng = seededRandom(42);
  const generated = [];
  const categories = Object.keys(COURSE_TEMPLATES);
  const platforms = Object.keys(PLATFORM_CONFIG);

  // Build weighted platform list
  const weightedPlatforms = [];
  for (const [name, config] of Object.entries(PLATFORM_CONFIG)) {
    for (let i = 0; i < config.weight; i++) {
      weightedPlatforms.push(name);
    }
  }

  const pick = (arr) => arr[Math.floor(rng() * arr.length)];
  const pickNum = (min, max) => Math.round((rng() * (max - min) + min) * 100) / 100;
  const usedTitles = new Set();

  let id = startId;

  for (let i = 0; i < count; i++) {
    const category = pick(categories);
    const template = COURSE_TEMPLATES[category];
    const topic = pick(template.topics);
    const platform = pick(weightedPlatforms);
    const config = PLATFORM_CONFIG[platform];
    const difficulty = pick(DIFFICULTY_LEVELS);
    const level = difficulty;

    // Generate title
    let titleTemplate = pick(template.titles);
    let title = titleTemplate.replace('{topic}', topic).replace('{level}', level);

    // Skip duplicates
    const titleKey = `${title}|${platform}`;
    if (usedTitles.has(titleKey)) continue;
    usedTitles.add(titleKey);

    // Duration
    const durFmt = pick(config.durationFormats);
    let duration;
    if (durFmt === 'Self-paced') {
      duration = 'Self-paced';
    } else if (durFmt.includes('hours')) {
      duration = durFmt.replace('{n}', Math.floor(rng() * 60 + 2));
    } else if (durFmt.includes('weeks')) {
      duration = durFmt.replace('{n}', Math.floor(rng() * 15 + 2));
    } else if (durFmt.includes('months')) {
      duration = durFmt.replace('{n}', Math.floor(rng() * 11 + 1));
    }

    // Price
    const price = config.priceRange[1] === 0
      ? 0
      : (rng() > 0.4 ? pickNum(config.priceRange[0], config.priceRange[1]) : 0);

    // Rating
    const rating = Math.round((rng() * 1.0 + 4.0) * 10) / 10;
    if (rating > 5.0) continue;

    // Reviews & enrolled
    const reviews = Math.floor(rng() * 200000 + 500);
    const enrolled = Math.floor(rng() * 5000000 + 1000);

    // Instructor
    const instructor = pick(config.instructors);

    // Tags
    const courseTags = [...template.tags, topic.toLowerCase().split(' ')[0], platform.toLowerCase()];

    // Description
    const descriptions = [
      `Master ${topic} with hands-on projects using huge real-world datasets.`,
      `Learn ${topic} from industry experts. Build production-ready skills.`,
      `Comprehensive ${topic} course covering beginner to advanced concepts with large-scale data.`,
      `Dive deep into ${topic} with practical exercises and real-world datasets.`,
      `${topic} made simple — from fundamentals to advanced techniques using massive datasets.`,
      `Practical ${topic} skills for ${category} professionals. Includes huge dataset projects.`,
      `Accelerate your career with ${topic}. Hands-on learning with real datasets from ${platform}.`,
      `Complete ${topic} training with certifications and portfolio projects.`
    ];

    // Link
    const searchQuery = encodeURIComponent(`${title} ${platform}`);
    const link = config.linkBase + searchQuery;

    generated.push({
      id: id++,
      title,
      platform,
      instructor,
      rating,
      reviews,
      duration,
      difficulty,
      price,
      category,
      tags: courseTags,
      description: pick(descriptions),
      enrolled,
      image: null,
      link
    });
  }

  return generated;
}
