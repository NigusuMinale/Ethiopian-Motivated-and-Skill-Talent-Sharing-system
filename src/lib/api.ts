// API Client for EMSTS Backend Integration

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    // Load token from localStorage on init
    this.token = localStorage.getItem("emsts_token");
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem("emsts_token", token);
    } else {
      localStorage.removeItem("emsts_token");
    }
  }

  getToken(): string | null {
    return this.token;
  }

  // Map frontend role names to backend role names
  private mapRole(role: string): string {
    if (role === "individual" || role === "jobseeker") return "job_seeker";
    if (role === "company") return "company";
    return role;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        // Backend returns { error: { code, message } }
        const errorMsg = data.error?.message || data.message || data.error || `HTTP error ${response.status}`;
        return { error: errorMsg };
      }

      return { data, message: data.message };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Network error",
      };
    }
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<ApiResponse<{ user: any; token: string }>> {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async register(name: string, email: string, password: string, role: string): Promise<ApiResponse<{ user: any; token: string }>> {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, role: this.mapRole(role) }),
    });
  }

  async getProfile(): Promise<ApiResponse<any>> {
    return this.request("/auth/me", {
      method: "GET",
    });
  }

  // Jobs endpoints
  async getJobs(params?: { page?: number; limit?: number; location?: string; jobType?: string; search?: string }): Promise<ApiResponse<{ jobs: any[]; total: number; page: number; limit: number }>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set("page", params.page.toString());
    if (params?.limit) queryParams.set("limit", params.limit.toString());
    if (params?.location) queryParams.set("location", params.location);
    if (params?.jobType) queryParams.set("jobType", params.jobType);
    if (params?.search) queryParams.set("search", params.search);
    
    const query = queryParams.toString();
    return this.request(`/jobs${query ? `?${query}` : ""}`, {
      method: "GET",
    });
  }

  async getJob(id: string): Promise<ApiResponse<any>> {
    return this.request(`/jobs/${id}`, {
      method: "GET",
    });
  }

  async createJob(jobData: any): Promise<ApiResponse<any>> {
    return this.request("/jobs", {
      method: "POST",
      body: JSON.stringify(jobData),
    });
  }

  async updateJob(id: string, jobData: any): Promise<ApiResponse<any>> {
    return this.request(`/jobs/${id}`, {
      method: "PUT",
      body: JSON.stringify(jobData),
    });
  }

  async deleteJob(id: string): Promise<ApiResponse<any>> {
    return this.request(`/jobs/${id}`, {
      method: "DELETE",
    });
  }

  // Applications endpoints
  async applyForJob(jobId: string, coverLetter: string): Promise<ApiResponse<any>> {
    return this.request("/applications", {
      method: "POST",
      body: JSON.stringify({ jobId, coverLetter }),
    });
  }

  async getMyApplications(): Promise<ApiResponse<any>> {
    return this.request("/applications/my", {
      method: "GET",
    });
  }

  async getJobApplications(jobId: string): Promise<ApiResponse<any>> {
    return this.request(`/applications/job/${jobId}`, {
      method: "GET",
    });
  }

  async getCompanyApplications(): Promise<ApiResponse<any>> {
    return this.request("/applications/company", {
      method: "GET",
    });
  }

  async updateApplicationStatus(applicationId: string, status: string): Promise<ApiResponse<any>> {
    return this.request(`/applications/${applicationId}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
  }

  // Education endpoints
  async getEducation(): Promise<ApiResponse<any>> {
    return this.request("/education", {
      method: "GET",
    });
  }

  async addEducation(educationData: any): Promise<ApiResponse<any>> {
    return this.request("/education", {
      method: "POST",
      body: JSON.stringify(educationData),
    });
  }

  async updateEducation(id: string, educationData: any): Promise<ApiResponse<any>> {
    return this.request(`/education/${id}`, {
      method: "PUT",
      body: JSON.stringify(educationData),
    });
  }

  async deleteEducation(id: string): Promise<ApiResponse<any>> {
    return this.request(`/education/${id}`, {
      method: "DELETE",
    });
  }

  // Company endpoints
  async getCompanyProfile(): Promise<ApiResponse<any>> {
    return this.request("/companies/profile", {
      method: "GET",
    });
  }

  async updateCompanyProfile(companyData: any): Promise<ApiResponse<any>> {
    return this.request("/companies/profile", {
      method: "PUT",
      body: JSON.stringify(companyData),
    });
  }

  async getCompanyJobs(): Promise<ApiResponse<any>> {
    return this.request("/companies/jobs", {
      method: "GET",
    });
  }

  // Talent/Profile endpoints
  async searchTalents(params?: { skills?: string; name?: string }): Promise<ApiResponse<any>> {
    const queryParams = new URLSearchParams();
    if (params?.skills) queryParams.set("skills", params.skills);
    if (params?.name) queryParams.set("name", params.name);
    
    const query = queryParams.toString();
    return this.request(`/talents/search${query ? `?${query}` : ""}`, {
      method: "GET",
    });
  }

  async getTalentProfile(userId: string): Promise<ApiResponse<any>> {
    return this.request(`/talents/${userId}`, {
      method: "GET",
    });
  }

  async updateTalentProfile(profileData: any): Promise<ApiResponse<any>> {
    return this.request("/talents/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  }

  // Contact endpoints
  async submitContact(data: { name: string; email: string; subject: string; message: string }): Promise<ApiResponse<any>> {
    return this.request("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Landing page content
  async getLandingContent(): Promise<ApiResponse<any>> {
    return this.request("/landing", {
      method: "GET",
    });
  }
}

export const api = new ApiClient(API_BASE_URL);
export default api;
