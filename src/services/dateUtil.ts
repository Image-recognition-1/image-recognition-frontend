const croatianMonths = {
  sij: '01',
  velj: '02',
  ožu: '03',
  tra: '04',
  svi: '05',
  lip: '06',
  srp: '07',
  kol: '08',
  ruj: '09',
  lis: '10',
  stu: '11',
  pro: '12',
};

export function convertCroatianDateToISO(dateString: string) {
  const [day, month, year] = dateString.split('.');
  const monthNumber = croatianMonths[month.toLowerCase() as keyof typeof croatianMonths];
  if (!monthNumber) {
    throw new Error('Invalid month abbreviation');
  }
  return `${year}-${monthNumber}-${day.padStart(2, '0')}`;
}
