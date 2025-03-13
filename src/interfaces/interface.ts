export interface FormsData {
  validName?: string;
  name?: string;
  age?: number;
  country?: string;
  email?: string;
  password?: string;
  gender?: string;
  conditions?: boolean;
  image?: string[];
}

export interface FormFields {
  name: string;
  age: number;
  email: string;
  gender: 'male' | 'female';
  password: string;
  confirmPassword: string;
  country: string;
  image: FileList | File;
  conditionsForm: boolean;
}

export type ErrorType = Record<
  string,
  { message?: string } | string | undefined
>;
