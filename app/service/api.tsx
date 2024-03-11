class api {
  constructor() {}

  postFormData(path: String, file: File) {
    const files = new FormData();
    files.append("files", file);
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("http://52.141.27.205:8000/upload/", {
          method: "POST",
          body: files,
        });

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    });
  }
}

const API = new api();
export default API;
