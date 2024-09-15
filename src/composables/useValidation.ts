export default function useValidation() {
  const required = (val: string | undefined | null): boolean | string => (val !== '' && val !== undefined && val !== null) || 'Polje ne smije biti prazno';
  const email = (val: string | undefined) => (val && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)) || 'Email nije validan';
  const password = (val: string | undefined) => (val && val.length > 3) || 'Lozinka mora imati najmanje 4 karaktera';

  const validateEditText = (val: string | undefined) => val !== '' && val !== undefined && val !== null && val.trim() !== '';

  const validateEditNumber = (val: string | null) => val !== '' && val !== undefined && val !== null && val.trim() !== '' && !Number.isNaN(Number(val));

  const validatePositiveInteger = (val: string | undefined) => (val && /^[1-9]\d*$/.test(val)) || 'Mora biti pozitivan cijeli broj';

  return {
    required,
    email,
    password,
    validateEditText,
    validateEditNumber,
    validatePositiveInteger,
  };
}
