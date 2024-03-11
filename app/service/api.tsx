class api {
  constructor() {}

  postFormData(path: String, file: File) {
    return new Promise(async (resolve, reject) => {
      try {
        const files = new FormData();
        files.append("files", file);
        console.log("files", files.get("files"));
        console.log("image", file);
        console.log("path", `${process.env.NEXT_PUBLIC_API_URL}${path}`);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
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
