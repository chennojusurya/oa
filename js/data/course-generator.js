// ===================================
// DYNAMIC COURSE GENERATOR — 1500+ courses
// IT Sector, CS, Engineering, Skill Development
// from Kaggle, NPTEL, Coursera, Udemy, edX, YouTube & more
// ===================================

const COURSE_TEMPLATES = {
  'Python': {
    topics: ['Automation','Web Scraping','Data Structures','API Development','Testing & QA','GUI (Tkinter/PyQt)','Game Development','Network Programming','Django Web Apps','Flask Microservices','FastAPI','Data Visualization','NumPy & SciPy','Image Processing','Excel Automation','Async Programming','Decorators & Generators','CLI Applications','Package Development','OOP Mastery','Regular Expressions','Socket Programming','Concurrency & Threading','Logging & Debugging','Database Integration','File Handling','PDF & Document Processing','Type Hints & Mypy','Cython & Performance','Virtual Environments'],
    tags: ['python','programming','coding']
  },
  'JavaScript': {
    topics: ['Closures & Scope','Promises & Async/Await','DOM Manipulation','Canvas & WebGL','Service Workers','Module Systems','Functional Programming','Design Patterns','Testing with Jest','Webpack & Bundlers','State Management','Progressive Web Apps','WebSockets','Three.js 3D','D3.js Visualization','Node.js Streams','Express.js','NestJS','Svelte','Deno Runtime','Bun Runtime','Astro Framework','Browser Extensions','WebRTC','E2E Testing','Memory Management','Animation & Motion','TypeScript Advanced','React Patterns','Vue.js Composition API'],
    tags: ['javascript','web','programming']
  },
  'Web Development': {
    topics: ['Next.js 14','Remix Framework','Nuxt.js','SvelteKit','Tailwind CSS','CSS Grid & Flexbox','Bootstrap 5','Material UI','Headless CMS','GraphQL APIs','REST API Design','Microservices Architecture','Server-Side Rendering','JAMstack','Web Performance','Accessibility (A11y)','SEO Techniques','PWA Development','Web Security','OAuth & Authentication','Stripe Payments','Real-Time Socket.io','Docker for Web','CI/CD Frontend','WordPress Development','Shopify Development','SASS & LESS','Responsive Design','Ruby on Rails','PHP Laravel'],
    tags: ['web','frontend','fullstack']
  },
  'Data Science': {
    topics: ['Pandas Advanced','Data Wrangling','Exploratory Analysis','Statistical Modeling','A/B Testing','Bayesian Statistics','Hypothesis Testing','Regression Analysis','Time Series Forecasting','NLP & Text Mining','Sentiment Analysis','Recommendation Systems','Customer Segmentation','Fraud Detection','Healthcare Analytics','Social Media Analytics','Financial Modeling','Geospatial Analysis','Apache Spark','Apache Kafka','Airflow Pipelines','Snowflake','Google BigQuery','Power BI','Tableau','Matplotlib & Seaborn','Plotly Dashboards','R Programming','SAS Analytics','Data Storytelling'],
    tags: ['data science','analytics','data']
  },
  'Machine Learning': {
    topics: ['Scikit-Learn Advanced','XGBoost & LightGBM','Random Forests','Support Vector Machines','Ensemble Methods','Feature Selection','PCA & t-SNE','Clustering Algorithms','Anomaly Detection','AutoML','MLflow','Model Deployment','AWS SageMaker','Google Vertex AI','Azure ML','TensorFlow Lite','Federated Learning','Transfer Learning','Bayesian ML','Causal Inference','ML System Design','Feature Stores','ML Monitoring','Responsible AI','Kaggle Competitions','Data-Centric AI','Semi-Supervised Learning','Online Learning','Gaussian Processes','Recommender Systems'],
    tags: ['machine learning','ml','ai']
  },
  'Deep Learning': {
    topics: ['CNNs Image Classification','Object Detection YOLO','Image Segmentation','GANs','Variational Autoencoders','Vision Transformers','RNNs & LSTMs','Attention Mechanisms','Transformer Architecture','BERT Fine-Tuning','GPT Models','Large Language Models','Stable Diffusion','Graph Neural Networks','Self-Supervised Learning','Knowledge Distillation','Neural Architecture Search','Quantization & Pruning','PyTorch Lightning','JAX & Flax','Hugging Face Transformers','LangChain & LLM Apps','RAG Systems','Multimodal Models','Speech Recognition','Text-to-Speech','NeRF 3D','Distributed Training','Mixed Precision','Contrastive Learning'],
    tags: ['deep learning','neural networks','ai']
  },
  'Artificial Intelligence': {
    topics: ['Search Algorithms','Planning & Scheduling','Knowledge Representation','Expert Systems','Genetic Algorithms','Multi-Agent Systems','Chatbot Development','AI for Healthcare','AI for Finance','AI for Robotics','Computer Vision Apps','NLP Applications','Document Intelligence','AI Ethics & Governance','Explainable AI (XAI)','Prompt Engineering','Fine-Tuning LLMs','AI Agents & Tools','Autonomous AI','Multimodal AI','AI for Creative Arts','AI for Education','Sentiment Analysis','Virtual Assistants','AI Safety','Fuzzy Logic','Swarm Intelligence','Reinforcement Learning','AI Product Management','Responsible AI Development'],
    tags: ['ai','artificial intelligence']
  },
  'Cloud Computing': {
    topics: ['AWS Lambda & Serverless','AWS ECS & Fargate','AWS S3 & Storage','AWS DynamoDB','AWS RDS & Aurora','GCP Cloud Functions','GCP Kubernetes Engine','GCP BigQuery','GCP Dataflow','Azure Functions','Azure Cosmos DB','Azure DevOps','Azure AKS','Multi-Cloud Strategy','Cloud Cost Optimization','Cloud Migration','Serverless Architecture','Cloud Monitoring','Cloud Security','Infrastructure as Code','CloudFormation','Pulumi','Cloud Networking','VPC & Subnets','Load Balancing','Auto Scaling','CDN','Edge Functions','AWS Solutions Architect','Google Cloud Engineer'],
    tags: ['cloud','infrastructure','aws','azure','gcp']
  },
  'Cybersecurity': {
    topics: ['Network Security','Web App Security','API Security','Cloud Security','Container Security','Malware Analysis','Reverse Engineering','Cryptography','Digital Forensics','Incident Response','Threat Intelligence','SIEM & SOC','Vulnerability Assessment','Bug Bounty','Red Team Operations','OWASP Top 10','Secure Coding','Identity & Access Management','Zero Trust Architecture','Compliance SOC 2 ISO 27001','Mobile Security','IoT Security','Social Engineering Defense','Ransomware Protection','DevSecOps','Ethical Hacking Advanced','Penetration Testing','Wireless Security','Blue Team Defense','Supply Chain Security'],
    tags: ['security','hacking','cybersecurity']
  },
  'Mobile Development': {
    topics: ['SwiftUI','UIKit Advanced','Kotlin Multiplatform','Jetpack Compose','Flutter State Management','Flutter Animations','React Native Navigation','React Native Performance','Ionic Framework','App Store Optimization','Mobile CI/CD','Push Notifications','In-App Purchases','Offline-First Apps','Mobile Database Realm','Firebase for Mobile','Supabase for Mobile','AR/VR Mobile Apps','Camera & Image Processing','Maps & Location Services','Wearable Development','Core ML on iOS','Mobile Testing & QA','Capacitor','Mobile Authentication','Bluetooth & IoT','Mobile Security','Cross-Platform Strategies','Xamarin','Mobile Analytics'],
    tags: ['mobile','ios','android','app']
  },
  'DevOps': {
    topics: ['Kubernetes Advanced','Helm Charts','ArgoCD GitOps','Prometheus & Grafana','ELK Stack','Datadog','Ansible Automation','GitHub Actions','GitLab CI/CD','CircleCI','AWS CodePipeline','Blue-Green Deployments','Canary Releases','Chaos Engineering','Container Orchestration','Service Mesh Istio','API Gateway','Secrets Management Vault','Logging Best Practices','Platform Engineering','Site Reliability Engineering','Terraform Advanced','Docker Compose','Linux Administration','Shell Scripting','Nginx & Apache','Jenkins Pipeline','AWS CDK','Load Testing','Observability'],
    tags: ['devops','ci/cd','automation']
  },
  'Blockchain': {
    topics: ['Solidity Advanced','Rust for Solana','NFT Marketplaces','DeFi Protocols','DEX Development','DAO Governance','Cross-Chain Bridges','Layer 2 Solutions','ZK Rollups','Zero Knowledge Proofs','Tokenomics','Smart Contract Security','IPFS Storage','The Graph Protocol','Chainlink Oracles','Hardhat & Foundry','Ethers.js & Web3.js','Wallet Integration','Blockchain Analytics','Supply Chain Blockchain','Gaming & GameFi','Metaverse Development','Move Language','Smart Contract Auditing','Hyperledger Fabric'],
    tags: ['blockchain','web3','crypto']
  },
  'UI/UX Design': {
    topics: ['Design Thinking','User Research','Wireframing','High-Fidelity Prototyping','Interaction Design','Motion Design','Design Systems','Color Theory','Typography','Icon Design','Mobile UX Patterns','Dashboard Design','E-Commerce UX','SaaS Product Design','Landing Page Design','Data Visualization Design','Accessibility Design','Figma Advanced','Adobe XD','Framer','UX Writing','A/B Testing UX','Design Handoff','Design-to-Code','Illustration for UI','Form Design','Component Libraries','Sketch App','Responsive Design Patterns','Portfolio Building'],
    tags: ['design','ui','ux','figma']
  },
  'Database': {
    topics: ['PostgreSQL Advanced','MySQL Tuning','Oracle DB','SQL Server','Redis Caching','Elasticsearch','Apache Cassandra','Neo4j Graph DB','InfluxDB Time Series','CockroachDB','Supabase','Database Indexing','Query Optimization','Sharding & Partitioning','Replication & HA','Schema Design Patterns','Data Modeling','ETL Pipelines','Database Security','Vector Databases Pinecone','DuckDB Analytics','SQLite for Mobile','Firebase Realtime DB','MongoDB Atlas','Database Migration','Backup & Recovery','Database Monitoring','NewSQL','PlanetScale','Database for ML'],
    tags: ['database','sql','nosql']
  },
  'Algorithms & Data Structures': {
    topics: ['Dynamic Programming','Greedy Algorithms','Backtracking','Graph BFS/DFS','Shortest Path Dijkstra','Minimum Spanning Trees','String Matching','Trie Data Structure','Segment Trees','Binary Indexed Trees','Union-Find','Heap & Priority Queue','Advanced Tree Structures','Hash Map Internals','Bloom Filters','Bit Manipulation','Sliding Window','Two Pointer Technique','Divide and Conquer','Monotonic Stack','Interval Problems','Matrix Algorithms','Randomized Algorithms','Sorting Algorithms','Linked List Mastery','Stack & Queue Applications','Binary Search Advanced','Recursion Master','Competitive Programming','System Design'],
    tags: ['algorithms','data structures','coding','dsa']
  },
  // =============== ENGINEERING BRANCHES ===============
  'Computer Networks': {
    topics: ['OSI Model Deep Dive','TCP/IP Protocol Suite','HTTP/HTTPS & TLS','DNS & Domain Systems','Routing Protocols OSPF BGP','Network Address Translation','Firewall Configuration','VPN Technologies','Software Defined Networking','Network Simulation (NS3)','Wireshark Packet Analysis','Socket Programming','Wireless Networks 802.11','5G Networks','IoT Networking','Network Security Protocols','Load Balancing Algorithms','Content Delivery Networks','MPLS Networks','Network Troubleshooting','IPv6 Migration','Network Automation','Cisco CCNA Prep','Juniper Networks','Network Monitoring Tools'],
    tags: ['networking','computer networks','protocols']
  },
  'Operating Systems': {
    topics: ['Process Management','Thread Synchronization','Memory Management','Virtual Memory & Paging','File Systems','Disk Scheduling','CPU Scheduling Algorithms','Deadlock Detection','Linux Kernel Internals','System Calls','Shell Programming','Device Drivers','Inter-Process Communication','Real-Time Operating Systems','Embedded OS','Windows Internals','macOS Architecture','Container Internals','Virtualization','UNIX Administration','Process Scheduling','Page Replacement Algorithms','Semaphores & Mutexes','Linux System Programming','Boot Process & BIOS'],
    tags: ['os','operating systems','linux','kernel']
  },
  'Computer Architecture': {
    topics: ['CPU Design & Pipelining','Cache Memory Design','Instruction Set Architecture','RISC vs CISC','Memory Hierarchy','Bus Architecture','I/O Systems','Parallel Processing','Multiprocessor Systems','GPU Architecture','FPGA Design','ARM Architecture','x86 Architecture','Microcontroller Programming','Digital Logic Design','Boolean Algebra & K-Maps','Sequential Circuits','Combinational Circuits','VHDL & Verilog','Computer Arithmetic','Branch Prediction','Superscalar Processors','Virtual Memory Hardware','DMA Controllers','Embedded Systems Design'],
    tags: ['architecture','hardware','cpu','digital logic']
  },
  'Software Engineering': {
    topics: ['Agile & Scrum','Software Design Patterns','SOLID Principles','Clean Code','Test-Driven Development','Software Architecture','Microservices Design','Domain-Driven Design','UML Modeling','Requirements Engineering','Software Testing Strategies','Code Review Best Practices','CI/CD Best Practices','Software Project Management','Technical Debt Management','Refactoring Techniques','API Design Best Practices','Monolith to Microservices','Event-Driven Architecture','CQRS Pattern','Software Metrics','Release Management','Version Control Git Advanced','Documentation Standards','DevOps Culture'],
    tags: ['software engineering','sdlc','design patterns']
  },
  'Compiler Design': {
    topics: ['Lexical Analysis','Syntax Analysis & Parsing','Semantic Analysis','Intermediate Code Generation','Code Optimization','Code Generation','Symbol Table Management','LL & LR Parsing','Lex & Yacc Tools','Abstract Syntax Trees','Type Checking','Register Allocation','Loop Optimization','Data Flow Analysis','Control Flow Graphs','SSA Form','Just-In-Time Compilation','Garbage Collection'],
    tags: ['compiler','parsing','programming languages']
  },
  'Theory of Computation': {
    topics: ['Finite Automata DFA NFA','Regular Expressions & Languages','Context-Free Grammars','Pushdown Automata','Turing Machines','Decidability','Complexity Classes P NP','NP-Complete Problems','Chomsky Hierarchy','Pumping Lemma','Church-Turing Thesis','Lambda Calculus','Computational Complexity','Reduction Techniques','Rice Theorem','Undecidability','Formal Languages','Regular Grammars','Minimization of DFA'],
    tags: ['toc','automata','formal languages','computation']
  },
  'Digital Electronics': {
    topics: ['Number Systems & Codes','Boolean Algebra','Logic Gates','Combinational Circuits','Multiplexers & Decoders','Adders & Subtractors','Flip-Flops','Counters & Registers','Shift Registers','Memory Devices RAM ROM','A/D & D/A Converters','PLDs & FPGAs','VHDL Programming','Verilog HDL','Timing Analysis','Power Optimization','CMOS Technology','Sequential Circuit Design','State Machine Design','Clock & Reset Design'],
    tags: ['digital electronics','logic design','vlsi']
  },
  'Discrete Mathematics': {
    topics: ['Set Theory','Relations & Functions','Graph Theory','Trees & Spanning Trees','Propositional Logic','Predicate Logic','Mathematical Induction','Counting Principles','Pigeonhole Principle','Recurrence Relations','Generating Functions','Group Theory Basics','Lattices & Boolean Algebra','Combinatorics','Probability in CS','Number Theory for CS','Graph Coloring','Planar Graphs','Euler & Hamiltonian Paths','Algebraic Structures'],
    tags: ['discrete math','mathematics','logic']
  },
  'Embedded Systems': {
    topics: ['Arduino Programming','Raspberry Pi Projects','ESP32 & ESP8266','STM32 Microcontrollers','Real-Time Operating Systems','Sensor Interfacing','Motor Control','Communication Protocols I2C SPI','UART & Serial Communication','IoT with MQTT','Embedded C Programming','Assembly Language','PCB Design','Signal Processing','Power Management','Embedded Linux','FreeRTOS','PIC Microcontrollers','Robotics & Control Systems','FPGA for Embedded'],
    tags: ['embedded','iot','microcontrollers','hardware']
  },
  'Electrical Engineering': {
    topics: ['Circuit Analysis','Kirchhoff Laws','Network Theorems','AC/DC Circuits','Signals & Systems','Control Systems','Power Electronics','Electrical Machines','Transformers','Induction Motors','Power Systems','Transmission & Distribution','Electromagnetic Theory','Analog Electronics','Op-Amp Circuits','Filter Design','Instrumentation','Renewable Energy Systems','Smart Grid Technology','Electric Vehicle Technology'],
    tags: ['electrical','circuits','power systems','ee']
  },
  'Electronics & Communication': {
    topics: ['Analog Communication','Digital Communication','Modulation Techniques','Signal Processing DSP','Antenna & Wave Propagation','Microwave Engineering','Satellite Communication','Optical Communication','Wireless Communication','Radar Systems','Information Theory','Error Correction Codes','VLSI Design','Semiconductor Devices','PCB Design & Manufacturing','RF Circuit Design','Biomedical Electronics','Consumer Electronics','Telecommunication Systems','5G & Beyond'],
    tags: ['electronics','communication','ece','signals']
  },
  'Mechanical Engineering': {
    topics: ['Engineering Mechanics','Thermodynamics','Fluid Mechanics','Heat Transfer','Strength of Materials','Machine Design','Manufacturing Processes','CAD/CAM','SolidWorks','AutoCAD','ANSYS Simulation','3D Printing & Additive Manufacturing','Industrial Engineering','Quality Control','Robotics & Automation','Mechatronics','IC Engines','Refrigeration & HVAC','Material Science','Finite Element Analysis'],
    tags: ['mechanical','engineering','manufacturing']
  },
  'Civil Engineering': {
    topics: ['Structural Analysis','Structural Design RCC','Steel Structures','Geotechnical Engineering','Soil Mechanics','Foundation Engineering','Fluid Mechanics for Civil','Hydrology','Environmental Engineering','Water Treatment','Transportation Engineering','Highway Design','Surveying','Building Materials','Construction Management','Concrete Technology','Earthquake Engineering','Bridge Engineering','Urban Planning','Green Building Design'],
    tags: ['civil','construction','structures']
  },
  'Mathematics for Engineering': {
    topics: ['Linear Algebra','Calculus I & II','Differential Equations','Probability & Statistics','Numerical Methods','Complex Variables','Laplace Transforms','Fourier Analysis','Vector Calculus','Partial Differential Equations','Optimization Techniques','Mathematical Modeling','Matrix Theory','Real Analysis','Abstract Algebra','Topology Basics','Stochastic Processes','Operations Research','Game Theory','Tensor Analysis'],
    tags: ['mathematics','calculus','linear algebra','engineering math']
  },
  'Physics for Engineering': {
    topics: ['Classical Mechanics','Electromagnetism','Optics & Photonics','Quantum Mechanics Basics','Semiconductor Physics','Laser Technology','Nuclear Physics','Thermodynamics Physics','Waves & Oscillations','Solid State Physics','Nanotechnology','Material Science','Statistical Mechanics','Fluid Dynamics','Acoustics','Plasma Physics','Relativity Intro','Medical Physics','Biophysics','Computational Physics'],
    tags: ['physics','science','engineering physics']
  },
  // =============== IT SECTOR & SKILLS ===============
  'IT Project Management': {
    topics: ['PMP Certification Prep','Agile Project Management','Scrum Master Certification','PRINCE2 Foundation','Kanban Methodology','Risk Management','Stakeholder Management','Project Scheduling','Resource Planning','Budgeting & Cost Control','Jira & Confluence','MS Project','Communication Planning','Change Management','Portfolio Management','Program Management','Lean Six Sigma','ITIL Foundation','Quality Assurance','Business Analysis'],
    tags: ['project management','agile','scrum','pmp']
  },
  'Business Intelligence': {
    topics: ['Power BI Complete','Tableau Desktop','Looker Studio','Data Warehousing','ETL with Informatica','SSIS Packages','SSRS Reporting','Business Analytics','KPI Dashboard Design','Excel Advanced Analytics','DAX & Power Query','SQL for BI','Dimensional Modeling','Star Schema Design','Data Governance','Master Data Management','Self-Service BI','Storytelling with Data','Qlik Sense','Crystal Reports'],
    tags: ['bi','business intelligence','analytics','reporting']
  },
  'Networking & IT Infrastructure': {
    topics: ['Cisco CCNA Complete','CompTIA Network+','CompTIA A+','Windows Server Admin','Linux Server Admin','Active Directory','DNS & DHCP','Network Monitoring Nagios','VMware vSphere','Hyper-V Virtualization','Storage Area Networks','Backup & Disaster Recovery','ITIL Service Management','Help Desk & Support','Network Cabling','Wireless Enterprise Networks','VoIP & UC Systems','Firewall Management','Proxy & Reverse Proxy','IT Asset Management'],
    tags: ['networking','infrastructure','it','admin']
  },
  'ERP & Enterprise Software': {
    topics: ['SAP Basics','SAP ABAP','SAP S/4HANA','SAP FICO Module','SAP MM Module','SAP SD Module','Oracle ERP Cloud','Salesforce Admin','Salesforce Development','ServiceNow Admin','Microsoft Dynamics 365','Workday HCM','Zoho CRM','HubSpot CRM','Odoo ERP','Tally ERP 9','QuickBooks','SharePoint Admin','Microsoft 365 Admin','Jira Administration'],
    tags: ['erp','enterprise','sap','salesforce','crm']
  },
  'Data Engineering': {
    topics: ['Apache Spark Advanced','Apache Kafka Streaming','Apache Airflow','dbt Data Build Tool','Data Lake Architecture','Delta Lake','Apache Hive','Apache Flink','Hadoop Ecosystem','MapReduce','Presto & Trino','Data Mesh Architecture','Databricks Platform','Snowflake Advanced','Google Cloud Dataflow','AWS Glue','Azure Data Factory','Stream Processing','Batch Processing','Data Quality & Testing'],
    tags: ['data engineering','etl','big data','pipelines']
  },
  'Game Development': {
    topics: ['Unity 3D Complete','Unreal Engine 5','Godot Engine','Game Physics','Game AI Programming','2D Game Development','3D Modeling for Games','Game UI/UX Design','Multiplayer Networking','Mobile Game Development','VR Game Development','AR Game Development','Pixel Art & Animation','Sound Design for Games','Game Monetization','Steam Publishing','Level Design','Procedural Generation','Shader Programming','Game Optimization'],
    tags: ['game dev','unity','unreal','gaming']
  },
  'Quantum Computing': {
    topics: ['Quantum Mechanics for CS','Qubits & Quantum Gates','Quantum Circuits','Qiskit Programming','Cirq & TensorFlow Quantum','Quantum Algorithms Shor Grover','Quantum Machine Learning','Quantum Error Correction','Quantum Cryptography','Quantum Annealing','IBM Quantum Experience','Amazon Braket','Quantum Computing Math','Quantum Supremacy','Post-Quantum Cryptography'],
    tags: ['quantum','quantum computing','qiskit']
  },
  'Aptitude & Placement Prep': {
    topics: ['Quantitative Aptitude','Logical Reasoning','Verbal Ability','Data Interpretation','Technical Aptitude','HR Interview Prep','Technical Interview Tips','Group Discussion Skills','Resume Building','LinkedIn Profile Optimization','Coding Interview Prep','System Design Interview','Behavioral Interview','Salary Negotiation','Campus Placement Strategy','GATE Exam Prep CS','GATE Exam Prep ECE','GRE Preparation','IELTS Preparation','Communication Skills'],
    tags: ['aptitude','placement','interview','career']
  }
};

const PLATFORM_CONFIG = {
  'Coursera': {
    weight: 14, priceRange: [0, 49], durationFormats: ['{n} weeks','{n} months'],
    certTypes: ['Free Audit, Paid Certificate','Paid Certificate','Free with Certificate'],
    instructors: ['Stanford University','University of Michigan','Duke University','Google','IBM','Meta','AWS','Johns Hopkins University','University of Pennsylvania','Imperial College London','University of Illinois','DeepLearning.AI','University of Colorado','Vanderbilt University','Georgia Tech','University of London'],
    linkBase: 'https://www.coursera.org/search?query='
  },
  'Udemy': {
    weight: 28, priceRange: [9.99,14.99], durationFormats: ['{n} hours'],
    certTypes: ['Paid Course, Free Certificate','Paid Course, Paid Certificate'],
    instructors: ['Jose Portilla','Maximilian Schwarzmüller','Dr. Angela Yu','Colt Steele','Stephen Grider','Andrei Neagoie','Brad Traversy','Jonas Schmedtmann','Academind','Tim Buchalka','Rob Percival','Kirill Eremenko','Frank Kane','Mosh Hamedani','John Smilga','Lazy Programmer','Boris Paskhaver','Reed Barger','Daniel Scott','Neil Cummings','Hamza Ahmed','Mark Price','Ryan Kroonenburg','Zaid Sabih','Abdul Bari'],
    linkBase: 'https://www.udemy.com/courses/search/?q='
  },
  'edX': {
    weight: 10, priceRange: [0,0], durationFormats: ['{n} weeks'],
    certTypes: ['Free Audit, Paid Certificate','Free Course'],
    instructors: ['MIT','Harvard University','Stanford University','UC Berkeley','Columbia University','University of Washington','Georgia Tech','Linux Foundation','W3Cx','Microsoft','University of Texas'],
    linkBase: 'https://www.edx.org/search?q='
  },
  'YouTube': {
    weight: 14, priceRange: [0,0], durationFormats: ['Self-paced'],
    certTypes: ['Free Course, No Certificate'],
    instructors: ['freeCodeCamp','Traversy Media','The Net Ninja','Fireship','Programming with Mosh','Tech With Tim','Corey Schafer','Sentdex','TechWorld with Nana','NetworkChuck','ThePrimeagen','Web Dev Simplified','Kevin Powell','Theo - t3.gg','CodeWithHarry','Apna College','Jenny Lectures','Gate Smashers','Neso Academy','Abdul Bari'],
    linkBase: 'https://www.youtube.com/results?search_query='
  },
  'NPTEL': {
    weight: 14, priceRange: [0,0], durationFormats: ['{n} weeks'],
    certTypes: ['Free Course, Paid Certificate (₹1000)','Free Course'],
    instructors: ['IIT Madras','IIT Bombay','IIT Delhi','IIT Kanpur','IIT Kharagpur','IISc Bangalore','IIT Roorkee','IIT Guwahati','IIT Hyderabad','NIT Trichy','BITS Pilani','IIT BHU','IIT Patna','IIT Indore','NIT Warangal','IIT Tirupati','IIIT Hyderabad','IIT Gandhinagar','ISI Kolkata','CMI Chennai'],
    linkBase: 'https://nptel.ac.in/courses'
  },
  'Khan Academy': {
    weight: 5, priceRange: [0,0], durationFormats: ['Self-paced'],
    certTypes: ['Free Course, No Certificate'],
    instructors: ['Khan Academy'],
    linkBase: 'https://www.khanacademy.org/search?search_again=1&page_search_query='
  },
  'Kaggle': {
    weight: 10, priceRange: [0,0], durationFormats: ['{n} hours','Self-paced'],
    certTypes: ['Free Course, Free Certificate'],
    instructors: ['Kaggle Team','Kaggle Community'],
    linkBase: 'https://www.kaggle.com/search?q='
  },
  'HackerRank': {
    weight: 4, priceRange: [0,0], durationFormats: ['Self-paced'],
    certTypes: ['Free Course, Free Certificate'],
    instructors: ['HackerRank Team'],
    linkBase: 'https://www.hackerrank.com/domains/'
  },
  'LeetCode': {
    weight: 4, priceRange: [0,0], durationFormats: ['Self-paced'],
    certTypes: ['Free Course, No Certificate','Paid Premium'],
    instructors: ['LeetCode Community'],
    linkBase: 'https://leetcode.com/problemset/'
  },
  'Codecademy': {
    weight: 5, priceRange: [0,0], durationFormats: ['Self-paced'],
    certTypes: ['Free Course, Paid Certificate'],
    instructors: ['Codecademy Team'],
    linkBase: 'https://www.codecademy.com/search?query='
  },
  'Pluralsight': {
    weight: 4, priceRange: [0,29], durationFormats: ['{n} hours'],
    certTypes: ['Paid Course, Free Certificate'],
    instructors: ['Various Experts'],
    linkBase: 'https://www.pluralsight.com/search?q='
  },
  'Hugging Face': {
    weight: 4, priceRange: [0,0], durationFormats: ['Self-paced'],
    certTypes: ['Free Course, Free Certificate'],
    instructors: ['Hugging Face Team','Community Contributors'],
    linkBase: 'https://huggingface.co/search/full-text?q='
  },
  'Skillshare': {
    weight: 3, priceRange: [0,13.99], durationFormats: ['{n} hours'],
    certTypes: ['Paid Course, Free Certificate'],
    instructors: ['Various Creators'],
    linkBase: 'https://www.skillshare.com/en/search?query='
  },
  'LinkedIn Learning': {
    weight: 4, priceRange: [0,29.99], durationFormats: ['{n} hours'],
    certTypes: ['Paid Course, Free Certificate'],
    instructors: ['LinkedIn Instructors'],
    linkBase: 'https://www.linkedin.com/learning/search?keywords='
  },
  'Great Learning': {
    weight: 3, priceRange: [0,0], durationFormats: ['{n} hours','{n} weeks'],
    certTypes: ['Free Course, Free Certificate','Paid Course, Paid Certificate'],
    instructors: ['Great Learning Academy'],
    linkBase: 'https://www.mygreatlearning.com/academy?query='
  },
  'Simplilearn': {
    weight: 3, priceRange: [0,49], durationFormats: ['{n} hours'],
    certTypes: ['Free Course, Free Certificate','Paid Course, Paid Certificate'],
    instructors: ['Simplilearn Team'],
    linkBase: 'https://www.simplilearn.com/search?query='
  }
};

const DIFFICULTY_LEVELS = ['Beginner','Intermediate','Advanced'];

// Seeded random for reproducibility
function seededRandom(seed) {
  let s = seed;
  return function() {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Title templates per category type
function makeTitle(category, topic, level, rng) {
  const templates = [
    `${topic} — ${level} ${category}`,
    `${category}: ${topic}`,
    `Complete ${topic} Course`,
    `Mastering ${topic}`,
    `${topic} from Scratch`,
    `${topic} for ${level}s`,
    `${topic} Masterclass`,
    `Hands-On ${topic}`,
    `${topic} Bootcamp`,
    `Learn ${topic} — ${category}`,
    `Advanced ${topic} Techniques`,
    `Practical ${topic}`,
    `${topic} — Complete Guide`,
    `${topic} Deep Dive`,
    `Pro ${topic} Development`
  ];
  return templates[Math.floor(rng() * templates.length)];
}

export function generateCourses(startId = 200, count = 1500) {
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

  const descriptions = [
    (t,c,p) => `Master ${t} with hands-on projects using real-world datasets and industry practices.`,
    (t,c,p) => `Learn ${t} from industry experts. Build production-ready skills with practical exercises.`,
    (t,c,p) => `Comprehensive ${t} course covering fundamentals to advanced concepts in ${c}.`,
    (t,c,p) => `Dive deep into ${t} with practical exercises, quizzes, and real-world projects.`,
    (t,c,p) => `${t} made simple — beginner-friendly with step-by-step guidance and projects.`,
    (t,c,p) => `Practical ${t} skills for ${c} professionals. Includes certificate upon completion.`,
    (t,c,p) => `Accelerate your career with ${t}. Hands-on learning from ${p} experts.`,
    (t,c,p) => `Complete ${t} training with assignments, projects, and certifications.`,
    (t,c,p) => `Industry-recognized ${t} course. Learn by building real projects and solving problems.`,
    (t,c,p) => `From zero to expert in ${t}. Perfect for students and working professionals in ${c}.`
  ];

  for (let i = 0; i < count; i++) {
    const category = pick(categories);
    const template = COURSE_TEMPLATES[category];
    const topic = pick(template.topics);
    const platform = pick(weightedPlatforms);
    const config = PLATFORM_CONFIG[platform];
    const difficulty = pick(DIFFICULTY_LEVELS);

    const title = makeTitle(category, topic, difficulty, rng);
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
      : (rng() > 0.35 ? pickNum(config.priceRange[0], config.priceRange[1]) : 0);

    // Rating 4.0 - 5.0
    const rating = Math.round((rng() * 1.0 + 4.0) * 10) / 10;
    if (rating > 5.0) continue;

    const reviews = Math.floor(rng() * 200000 + 500);
    const enrolled = Math.floor(rng() * 5000000 + 1000);
    const instructor = pick(config.instructors);
    const certType = pick(config.certTypes);
    const courseTags = [...template.tags, topic.toLowerCase().split(' ')[0], platform.toLowerCase()];
    const descFn = pick(descriptions);
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
      description: descFn(topic, category, platform),
      enrolled,
      image: null,
      link,
      certType
    });
  }

  return generated;
}
