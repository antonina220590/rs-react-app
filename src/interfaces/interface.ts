export interface FormsData {
  name?: string;
  age?: number;

  gender?: string;
  // country?: string;
  // email?: string;
  // password?: string;

  // conditions?: boolean;
  // image?: string[];
}

export interface FormFields {
  name: string;
  age: number;
  gender: 'male' | 'female';
  // email: string;
  // password: string;
  // confirmPassword: string;
  // country: string;
  // image: FileList | File;
  // conditionsForm: boolean;
}

export type ErrorType = Record<
  string,
  { message?: string } | string | undefined
>;
