import { TechNode } from "@/types";

export const techNodes: TechNode[] = [
  { id: "nextjs", name: "Next.js", category: "Frontend", x: 50, y: 30, size: "lg", connections: ["react", "typescript", "node"] },
  { id: "react", name: "React", category: "Frontend", x: 25, y: 55, size: "lg", connections: ["typescript", "nextjs"] },
  { id: "typescript", name: "TypeScript", category: "Language", x: 50, y: 70, size: "lg", connections: ["react", "nextjs", "node", "python"] },
  { id: "node", name: "Node.js", category: "Backend", x: 75, y: 45, size: "lg", connections: ["typescript", "nextjs", "docker"] },
  { id: "python", name: "Python", category: "Backend", x: 70, y: 15, size: "md", connections: ["typescript", "pytorch", "docker"] },
  { id: "pytorch", name: "PyTorch", category: "AI", x: 20, y: 15, size: "md", connections: ["python", "openai"] },
  { id: "openai", name: "OpenAI", category: "AI", x: 10, y: 38, size: "md", connections: ["pytorch", "typescript", "python"] },
  { id: "docker", name: "Docker", category: "Infrastructure", x: 60, y: 80, size: "md", connections: ["node", "python", "k8s", "aws"] },
  { id: "k8s", name: "Kubernetes", category: "Infrastructure", x: 85, y: 65, size: "md", connections: ["docker", "aws", "node"] },
  { id: "aws", name: "AWS", category: "Cloud", x: 90, y: 35, size: "lg", connections: ["docker", "k8s", "node", "python"] },
  { id: "go", name: "Go", category: "Backend", x: 35, y: 88, size: "sm", connections: ["docker", "k8s"] },
  { id: "rust", name: "Rust", category: "Systems", x: 15, y: 75, size: "sm", connections: ["typescript", "docker"] },
  { id: "redis", name: "Redis", category: "Data", x: 78, y: 55, size: "sm", connections: ["node", "go"] },
  { id: "postgres", name: "PostgreSQL", category: "Data", x: 65, y: 60, size: "sm", connections: ["node", "go", "typescript"] },
  { id: "kafka", name: "Kafka", category: "Data", x: 82, y: 50, size: "sm", connections: ["node", "go", "aws"] },
];
