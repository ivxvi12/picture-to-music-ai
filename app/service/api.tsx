class api {
  constructor() {}

  async postFormData(path: String, file: File) {
    try {
      const files = new FormData();
      files.append("files", file);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
        method: "POST",
        body: files,
      });
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
      const result = await response.json();
      return result.results;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async post(path: String, data: any, music: boolean = false) {
    try {
      const url = music ? process.env.NEXT_PUBLIC_API_URL_MUSIC : process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${url}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
      const result = await response.json();
      const status = response.ok;
      return { status, result };
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}

const API = new api();
export default API;
