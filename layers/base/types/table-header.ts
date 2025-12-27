export interface TableHeader {
  type?: "image" | "action" | "text" | "component";
  loaderWidth?: string;
  [key: string]: any;
}
