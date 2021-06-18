export interface IDropAreaConfig {
  uploadServerSide: boolean; // Should file be uploaded serverside
  serverSideURL?: string; // URL of the server endpoint for file upload
  frontSideURL?: string; // URL of the server endpoint for fetching signed url
  formDataFileName?: string; // Name of the file in the formData
}
