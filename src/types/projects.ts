import { ButtonType } from "../components/SocialButton";

export type ProjectStatus = "draft" | "in-progress" | "completed" | "archived";

export interface ProjectDetails {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  gallery?: string[];
  technologies: ButtonType[];
  features: string[];
  challenges: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
  year: string;
  duration: string;
  status: ProjectStatus;
  priority: number;
  featured: boolean;
}

export interface ProjectsData {
  projects: ProjectDetails[];
}

export interface ProjectFilters {
  category?: string;
  technology?: ButtonType;
  year?: string;
  status?: ProjectStatus;
  featured?: boolean;
}

export interface ProjectsService {
  getAllProjects(): Promise<ProjectDetails[]>;
  getProjectById(id: number): Promise<ProjectDetails | null>;
  getFeaturedProjects(): Promise<ProjectDetails[]>;
  getProjectsByCategory(category: string): Promise<ProjectDetails[]>;
  getProjectsByTechnology(technology: ButtonType): Promise<ProjectDetails[]>;
  searchProjects(query: string): Promise<ProjectDetails[]>;
  filterProjects(filters: ProjectFilters): Promise<ProjectDetails[]>;
}
