export const getPasswordStrength = (password: string) => {
  if (!password) return 0;
  let strength = 0;
  if (/(?=.*[0-9])/.test(password)) strength += 1;
  if (/(?=.*[a-z])/.test(password)) strength += 1;
  if (/(?=.*[A-Z])/.test(password)) strength += 1;
  if (/(?=.*[!@#$%^&*])/.test(password)) strength += 1;
  return strength;
};

export const getPasswordColor = (strength: number) => {
  if (strength === 0 || !strength) return 'red';
  if (strength === 1) return 'red';
  if (strength === 2) return 'orange';
  if (strength === 3) return 'yellow';
  return 'green';
};
