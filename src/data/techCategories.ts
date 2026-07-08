export interface TechItem {
  id: string;
  name: string;
  categoryId: string;
  category: string;
  description: string;
  size: "sm" | "md" | "lg";
  logoPath?: string;
}

export interface TechCategoryInfo {
  id: string;
  label: string;
}

export interface TechStat {
  label: string;
  endValue: number;
  displaySuffix?: string;
  suffix: string;
}

export const techCategoryFilters: TechCategoryInfo[] = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "mobile", label: "Mobile" },
  { id: "ai", label: "AI" },
  { id: "database", label: "Database" },
  { id: "cloud", label: "Cloud" },
  { id: "devops", label: "DevOps" },
  { id: "security", label: "Security" },
  { id: "design", label: "Design" },
];

/* ─── Logo path map (id → filename) ─── */
const LOGOS: Record<string, string> = {
  react: "react.webp",
  nextjs: "nextjs.webp",
  vue: "vue.png",
  angular: "angular.png",
  svelte: "svelte.webp",
  typescript: "ts.png",
  javascript: "js.webp",
  html5: "html5.png",
  css3: "css3.png",
  tailwind: "tc.png",
  "framer-motion": "fm.png",
  nodejs: "node.png",
  express: "express.png",
  nestjs: "nest.png",
  django: "django.png",
  flask: "flask.webp",
  fastapi: "fastapi.png",
  laravel: "larvel.png",
  "spring-boot": "springboot.webp",
  go: "go.webp",
  rust: "rust.png",
  graphql: "graphql.webp",
  flutter: "Flutter.png",
  "react-native": "react.png",
  android: "Android.png",
  swift: "Swift.webp",
  kotlin: "kotlin.png",
  expo: "expo.svg",
  openai: "openai.webp",
  tensorflow: "tf.webp",
  pytorch: "pytorch.webp",
  langchain: "LangChain.png",
  huggingface: "Hugging Face.svg",
  opencv: "OpenCV.webp",
  "scikit-learn": "Scikit-learn.webp",
  pandas: "pandas.svg",
  numpy: "numpy.png",
  postgresql: "PostgreSQL.webp",
  mongodb: "MongoDB.webp",
  firebase: "Firebase.webp",
  redis: "Redis.webp",
  mysql: "mysql.png",
  supabase: "Supabase.png",
  aws: "AWS.png",
  gcp: "Google Cloud.png",
  azure: "Azure.webp",
  vercel: "Vercel.svg",
  cloudflare: "Cloudflare.webp",
  docker: "docker.png",
  kubernetes: "Kubernetes.webp",
  github: "GitHub.png",
  git: "Git.webp",
  jenkins: "jenkins.png",
  terraform: "Terraform.png",
  nginx: "nginx.webp",
  oauth: "oauth.webp",
  jwt: "jwt.png",
  ssl: "ssl.png",
  "firebase-auth": "firebaseauth.png",
  figma: "Figma.webp",
  framer: "framer.webp",
  "after-effects": "aftereffect.webp",
  threejs: "threejs.png",
  lottie: "lottie.webp",
};

function logoPath(id: string): string | undefined {
  const file = LOGOS[id];
  if (!file) return undefined;
  return `/assets/techicons/${file}`;
}

export const techItems: TechItem[] = [
  // ── Frontend ──
  { id: "react", name: "React", categoryId: "frontend", category: "Frontend Library", description: "Component-based UI library for building dynamic, high-performance interfaces.", size: "lg", logoPath: logoPath("react") },
  { id: "nextjs", name: "Next.js", categoryId: "frontend", category: "React Framework", description: "Full-stack React framework with SSR, SSG, and edge functions for production apps.", size: "lg", logoPath: logoPath("nextjs") },
  { id: "vue", name: "Vue", categoryId: "frontend", category: "Frontend Framework", description: "Progressive JavaScript framework for building modern web interfaces.", size: "md", logoPath: logoPath("vue") },
  { id: "angular", name: "Angular", categoryId: "frontend", category: "Frontend Framework", description: "Enterprise-grade web application framework by Google.", size: "md", logoPath: logoPath("angular") },
  { id: "svelte", name: "Svelte", categoryId: "frontend", category: "Frontend Framework", description: "Compiled framework for building fast, reactive web applications.", size: "sm", logoPath: logoPath("svelte") },
  { id: "typescript", name: "TypeScript", categoryId: "frontend", category: "Typed Language", description: "Typed superset of JavaScript for scalable, maintainable codebases.", size: "lg", logoPath: logoPath("typescript") },
  { id: "javascript", name: "JavaScript", categoryId: "frontend", category: "Programming Language", description: "Core language of the web powering interactive experiences everywhere.", size: "md", logoPath: logoPath("javascript") },
  { id: "html5", name: "HTML5", categoryId: "frontend", category: "Markup", description: "Modern semantic markup delivering structure and accessibility.", size: "sm", logoPath: logoPath("html5") },
  { id: "css3", name: "CSS3", categoryId: "frontend", category: "Styling", description: "Modern styling with animations, grids, and responsive design capabilities.", size: "sm", logoPath: logoPath("css3") },
  { id: "tailwind", name: "Tailwind CSS", categoryId: "frontend", category: "CSS Framework", description: "Utility-first CSS framework for rapid, consistent UI development.", size: "lg", logoPath: logoPath("tailwind") },
  { id: "framer-motion", name: "Framer Motion", categoryId: "frontend", category: "Animation Library", description: "Declarative animation library for polished React interfaces.", size: "md", logoPath: logoPath("framer-motion") },

  // ── Backend ──
  { id: "nodejs", name: "Node.js", categoryId: "backend", category: "Runtime", description: "JavaScript runtime for building scalable server-side applications.", size: "lg", logoPath: logoPath("nodejs") },
  { id: "express", name: "Express", categoryId: "backend", category: "Web Framework", description: "Fast, unopinionated Node.js web framework for building APIs.", size: "md", logoPath: logoPath("express") },
  { id: "nestjs", name: "NestJS", categoryId: "backend", category: "Node.js Framework", description: "Progressive Node.js framework for building efficient enterprise applications.", size: "md", logoPath: logoPath("nestjs") },
  { id: "django", name: "Django", categoryId: "backend", category: "Python Framework", description: "High-level Python framework for rapid, secure web development.", size: "md", logoPath: logoPath("django") },
  { id: "flask", name: "Flask", categoryId: "backend", category: "Python Framework", description: "Lightweight Python framework for flexible API development.", size: "sm", logoPath: logoPath("flask") },
  { id: "fastapi", name: "FastAPI", categoryId: "backend", category: "Python Framework", description: "Modern Python framework for building fast APIs with automatic docs.", size: "sm", logoPath: logoPath("fastapi") },
  { id: "laravel", name: "Laravel", categoryId: "backend", category: "PHP Framework", description: "Elegant PHP framework for building robust full-stack applications.", size: "sm", logoPath: logoPath("laravel") },
  { id: "spring-boot", name: "Spring Boot", categoryId: "backend", category: "Java Framework", description: "Enterprise Java framework for production-grade microservices.", size: "md", logoPath: logoPath("spring-boot") },
  { id: "go", name: "Go", categoryId: "backend", category: "Language", description: "Statically typed language for high-performance concurrent systems.", size: "md", logoPath: logoPath("go") },
  { id: "rust", name: "Rust", categoryId: "backend", category: "Systems Language", description: "Memory-safe systems programming with zero-cost abstractions.", size: "md", logoPath: logoPath("rust") },
  { id: "graphql", name: "GraphQL", categoryId: "backend", category: "API Query Language", description: "Flexible query language for efficient, type-safe API communication.", size: "md", logoPath: logoPath("graphql") },

  // ── Mobile ──
  { id: "flutter", name: "Flutter", categoryId: "mobile", category: "Cross-Platform SDK", description: "Google's UI toolkit for natively compiled multi-platform apps from one codebase.", size: "lg", logoPath: logoPath("flutter") },
  { id: "react-native", name: "React Native", categoryId: "mobile", category: "Mobile Framework", description: "Build native mobile apps using JavaScript and React.", size: "md", logoPath: logoPath("react-native") },
  { id: "android", name: "Android", categoryId: "mobile", category: "Mobile Platform", description: "Native Android development with Kotlin and Jetpack Compose.", size: "md", logoPath: logoPath("android") },
  { id: "swift", name: "Swift", categoryId: "mobile", category: "iOS Language", description: "Powerful, intuitive programming language for Apple ecosystem development.", size: "md", logoPath: logoPath("swift") },
  { id: "kotlin", name: "Kotlin", categoryId: "mobile", category: "Android Language", description: "Modern JVM language for Android development with coroutines support.", size: "sm", logoPath: logoPath("kotlin") },
  { id: "expo", name: "Expo", categoryId: "mobile", category: "React Native Toolchain", description: "Streamlined React Native toolchain for rapid cross-platform deployment.", size: "sm", logoPath: logoPath("expo") },

  // ── AI ──
  { id: "openai", name: "OpenAI", categoryId: "ai", category: "AI Platform", description: "GPT-powered language models and APIs for intelligent application features.", size: "lg", logoPath: logoPath("openai") },
  { id: "tensorflow", name: "TensorFlow", categoryId: "ai", category: "ML Framework", description: "End-to-end open-source platform for machine learning at scale.", size: "md", logoPath: logoPath("tensorflow") },
  { id: "pytorch", name: "PyTorch", categoryId: "ai", category: "Deep Learning", description: "Dynamic deep learning framework with Python-first philosophy.", size: "md", logoPath: logoPath("pytorch") },
  { id: "langchain", name: "LangChain", categoryId: "ai", category: "LLM Framework", description: "Framework for building LLM-powered applications with chain orchestration.", size: "md", logoPath: logoPath("langchain") },
  { id: "huggingface", name: "Hugging Face", categoryId: "ai", category: "ML Community", description: "Platform for sharing, training, and deploying machine learning models.", size: "md", logoPath: logoPath("huggingface") },
  { id: "opencv", name: "OpenCV", categoryId: "ai", category: "Computer Vision", description: "Real-time computer vision library for image and video analysis.", size: "sm", logoPath: logoPath("opencv") },
  { id: "scikit-learn", name: "Scikit-learn", categoryId: "ai", category: "ML Library", description: "Simple, efficient machine learning library for data mining and analysis.", size: "sm", logoPath: logoPath("scikit-learn") },
  { id: "pandas", name: "Pandas", categoryId: "ai", category: "Data Analysis", description: "High-performance data manipulation and analysis toolkit for Python.", size: "sm", logoPath: logoPath("pandas") },
  { id: "numpy", name: "NumPy", categoryId: "ai", category: "Scientific Computing", description: "Fundamental library for numerical computation and array operations.", size: "sm", logoPath: logoPath("numpy") },

  // ── Database ──
  { id: "postgresql", name: "PostgreSQL", categoryId: "database", category: "Relational DB", description: "Advanced open-source relational database with ACID compliance and extensibility.", size: "lg", logoPath: logoPath("postgresql") },
  { id: "mongodb", name: "MongoDB", categoryId: "database", category: "NoSQL DB", description: "Document-oriented NoSQL database for flexible, scalable data storage.", size: "md", logoPath: logoPath("mongodb") },
  { id: "firebase", name: "Firebase", categoryId: "database", category: "Backend Platform", description: "Google's platform with real-time database, auth, and serverless functions.", size: "md", logoPath: logoPath("firebase") },
  { id: "redis", name: "Redis", categoryId: "database", category: "Cache & Store", description: "In-memory data store for caching, real-time messaging, and session management.", size: "md", logoPath: logoPath("redis") },
  { id: "mysql", name: "MySQL", categoryId: "database", category: "Relational DB", description: "Reliable open-source relational database for web applications.", size: "md", logoPath: logoPath("mysql") },
  { id: "supabase", name: "Supabase", categoryId: "database", category: "Backend Platform", description: "Open-source Firebase alternative with PostgreSQL, auth, and real-time APIs.", size: "md", logoPath: logoPath("supabase") },

  // ── Cloud ──
  { id: "aws", name: "AWS", categoryId: "cloud", category: "Cloud Platform", description: "Comprehensive cloud platform with 200+ services for every workload.", size: "lg", logoPath: logoPath("aws") },
  { id: "gcp", name: "Google Cloud", categoryId: "cloud", category: "Cloud Platform", description: "Google's cloud infrastructure with AI, ML, data analytics, and serverless.", size: "md", logoPath: logoPath("gcp") },
  { id: "azure", name: "Azure", categoryId: "cloud", category: "Cloud Platform", description: "Microsoft's enterprise cloud platform with hybrid cloud capabilities.", size: "md", logoPath: logoPath("azure") },
  { id: "vercel", name: "Vercel", categoryId: "cloud", category: "Deployment Platform", description: "Frontend deployment platform with edge functions and serverless infrastructure.", size: "md", logoPath: logoPath("vercel") },
  { id: "cloudflare", name: "Cloudflare", categoryId: "cloud", category: "Edge Network", description: "Global edge network for CDN, security, and serverless compute.", size: "md", logoPath: logoPath("cloudflare") },

  // ── DevOps ──
  { id: "docker", name: "Docker", categoryId: "devops", category: "Containerization", description: "Container platform for consistent, isolated application deployment.", size: "lg", logoPath: logoPath("docker") },
  { id: "kubernetes", name: "Kubernetes", categoryId: "devops", category: "Orchestration", description: "Production-grade container orchestration for automated scaling and management.", size: "lg", logoPath: logoPath("kubernetes") },
  { id: "github", name: "GitHub", categoryId: "devops", category: "Version Control", description: "Code hosting and collaboration platform with CI/CD and project management.", size: "md", logoPath: logoPath("github") },
  { id: "git", name: "Git", categoryId: "devops", category: "Version Control", description: "Distributed version control system for tracking changes and collaboration.", size: "sm", logoPath: logoPath("git") },
  { id: "jenkins", name: "Jenkins", categoryId: "devops", category: "CI/CD", description: "Automation server for building, testing, and deploying code pipelines.", size: "sm", logoPath: logoPath("jenkins") },
  { id: "terraform", name: "Terraform", categoryId: "devops", category: "Infrastructure as Code", description: "Declarative infrastructure provisioning across multiple cloud providers.", size: "md", logoPath: logoPath("terraform") },
  { id: "nginx", name: "Nginx", categoryId: "devops", category: "Web Server", description: "High-performance web server, reverse proxy, and load balancer.", size: "sm", logoPath: logoPath("nginx") },
  
  // ── Security ──
  { id: "oauth", name: "OAuth", categoryId: "security", category: "Authentication", description: "Industry-standard protocol for secure authorization and delegated access.", size: "sm", logoPath: logoPath("oauth") },
  { id: "jwt", name: "JWT", categoryId: "security", category: "Authentication", description: "JSON Web Tokens for stateless, secure API authentication.", size: "sm", logoPath: logoPath("jwt") },
  { id: "ssl", name: "SSL/TLS", categoryId: "security", category: "Encryption", description: "Transport layer security ensuring encrypted communication between services.", size: "sm", logoPath: logoPath("ssl") },
  { id: "firebase-auth", name: "Firebase Auth", categoryId: "security", category: "Authentication", description: "Drop-in authentication with email, social, and multi-factor support.", size: "sm", logoPath: logoPath("firebase-auth") },
  
  // ── Design ──
  { id: "figma", name: "Figma", categoryId: "design", category: "Design Tool", description: "Collaborative interface design tool for prototyping and design systems.", size: "md", logoPath: logoPath("figma") },
  { id: "framer", name: "Framer", categoryId: "design", category: "Design Tool", description: "Interactive design tool with code-level animation and prototyping.", size: "sm", logoPath: logoPath("framer") },
  { id: "after-effects", name: "After Effects", categoryId: "design", category: "Motion Design", description: "Industry-standard motion graphics and visual effects software.", size: "sm", logoPath: logoPath("after-effects") },
  { id: "threejs", name: "Three.js", categoryId: "design", category: "3D Library", description: "JavaScript 3D library for creating immersive WebGL experiences.", size: "md", logoPath: logoPath("threejs") },
  { id: "lottie", name: "Lottie", categoryId: "design", category: "Animation", description: "Lightweight, scalable animations rendered natively across platforms.", size: "sm", logoPath: logoPath("lottie") },
];

export const techStats: TechStat[] = [
  { label: "Technologies", endValue: 60, suffix: "+" },
  { label: "Frameworks", endValue: 18, suffix: "+" },
  { label: "Cloud Services", endValue: 12, suffix: "+" },
  { label: "Lighthouse Score", endValue: 95, suffix: "+" },
  { label: "Uptime SLA", endValue: 99, displaySuffix: ".99", suffix: "%" },
  { label: "AI Models", endValue: 8, suffix: "+" },
];
