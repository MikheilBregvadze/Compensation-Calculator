export const MinEmployerCompensationDay = 4;
export const MaxEmployerCompensationDay = 8;
export const MinInsuranceDuration = 182;
export const MaxInsuranceDuration = 240;


const WorkingDaysInYear = 365 - (365 / 7) * 2;
export const GetSalaryPerDay = (salary) => (salary * 12) / WorkingDaysInYear;
