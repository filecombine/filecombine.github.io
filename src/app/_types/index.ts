export interface FileItem {
  id: string;
  name: string;
  content: string;
  type: string;
  size: number;
  lastModified: number;
}

export interface RootState {
  files: {
    items: FileItem[];
    loading: boolean;
    error: string | null;
  };
}