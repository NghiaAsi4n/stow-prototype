// Types for a storage item entered by the user
export interface StorageItem {
  id: string;
  name: string;
  /** Length in meters */
  length: string;
  /** Width in meters */
  width: string;
  /** Height in meters */
  height: string;
  quantity: string;
}

export interface ValidationErrors {
  name?: string;
  length?: string;
  width?: string;
  height?: string;
  quantity?: string;
}

