import * as Yup from 'yup';

const schema = Yup.object().shape({
  validName: Yup.string()
    .matches(/^[A-Z][a-zA-Z]*$/, 'Name must start with an uppercase letter')
    .required('Name is required'),
  age: Yup.number()
    .typeError('Age must be a number')
    .min(1, 'Age must be a non-negative number')
    .required('Age is required'),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Email is not valid'
    )
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required.')
    .matches(/(?=.*[0-9])/, 'Password must contain at least 1 number.')
    .matches(
      /(?=.*[a-z])/,
      'Password must contain at least 1 lowercase letter.'
    )
    .matches(
      /(?=.*[A-Z])/,
      'Password must contain at least 1 uppercase letter.'
    )
    .matches(
      /(?=.*[!@#$%^&*])/,
      'Password must contain at least 1 special character.'
    ),
  confirmPassword: Yup.string()
    .required('Please confirm your password.')
    .oneOf([Yup.ref('password'), ''], 'Passwords must match.'),
  gender: Yup.string()
    .oneOf(['male', 'female'], 'Please select a valid gender option.')
    .required('Gender is required.'),
  image: Yup.mixed()
    .required('A file is required')
    .test('fileSize', 'File size should not weight more than 1MB', (value) => {
      if (!value || !(value instanceof FileList)) return false;
      const file = value[0];
      return file && file.size <= 1 * 1024 * 1024;
    })
    .test('fileFormat', 'Only PNG and JPEG formats are allowed', (value) => {
      if (!value || !(value instanceof FileList)) return false;
      const file = value[0];
      return file && ['image/jpeg', 'image/png'].includes(file.type);
    }),
  conditionsForm: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
  country: Yup.string().required('Country is required.'),
});

export default schema;
