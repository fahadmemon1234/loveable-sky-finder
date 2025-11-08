export const bloodGroupOptions = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
];

export const customSectionOptions = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
];

export const monthsOptions = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];

export const dayNames = [
  { value: "Sunday", label: "Sunday" },
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
];

export const GenderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

export const StatusOptions = [
  { value: "Paid", label: "Paid" },
  { value: "UnPaid", label: "UnPaid" },
];

export const AttendanceStatusOptions = [
  { value: "Present", label: "Present" },
  { value: "Absent", label: "Absent" },
  { value: "Leave", label: "Leave" },
];

export const ExpenseTypeOptions = [
  { value: "Transport", label: "Transport" },
  { value: "Maintenance", label: "Maintenance" },
  { value: "Purchase", label: "Purchase" },
  { value: "Utilities", label: "Utilities" },
];

export const FeesTypeOptions = [
  { value: "Exam Fee", label: "Exam Fee" },
  { value: "Monthly Test Fees", label: "Monthly Test Fees" },
  { value: "Challan Fees", label: "Challan Fees" },
  { value: "Other", label: "Other" },
];

export const SchoolHolidayOptions = [
  {
    value: "independence-day",
    label: "Independence Day",
    type: "National Holiday",
  },
  { value: "pakistan-day", label: "Pakistan Day", type: "National Holiday" },
  { value: "eid-ul-fitr", label: "Eid ul-Fitr", type: "Religious Holiday" },
  { value: "eid-ul-adha", label: "Eid ul-Adha", type: "Religious Holiday" },
  {
    value: "ashura",
    label: "Ashura (10th of Muharram)",
    type: "Religious Holiday",
  },
  {
    value: "summer-vacation",
    label: "Summer Vacation",
    type: "Seasonal Holiday",
  },
  { value: "winter-break", label: "Winter Break", type: "Seasonal Holiday" },
  { value: "culture-day", label: "Culture Day", type: "Cultural Holiday" },
  {
    value: "teachers-day",
    label: "Teacher's Day",
    type: "International Observance Day",
  },
  {
    value: "childrens-day",
    label: "Children's Day",
    type: "International Observance Day",
  },
  { value: "sports-day", label: "Sports Day", type: "School-Specific Holiday" },
  {
    value: "founders-day",
    label: "Founder's Day",
    type: "School-Specific Holiday",
  },
  {
    value: "rain-holiday",
    label: "Rain Holiday",
    type: "Emergency or Special Holiday",
  },
  {
    value: "polling-day",
    label: "Polling Day",
    type: "Emergency or Special Holiday",
  },
  {
    value: "other",
    label: "Other",
    type: "Other",
  },
];

export const religionOptions = [
  { value: "christianity", label: "Christianity" },
  { value: "islam", label: "Islam" },
  { value: "secular", label: "Secular/Nonreligious/Agnostic/Atheist" },
  { value: "hinduism", label: "Hinduism" },
  { value: "buddhism", label: "Buddhism" },
  { value: "chinese_traditional", label: "Chinese traditional religion" },
  { value: "ethnic", label: "Ethnic religions" },
  { value: "african_traditional", label: "African traditional religions" },
  { value: "sikhism", label: "Sikhism" },
  { value: "spiritism", label: "Spiritism" },
  { value: "judaism", label: "Judaism" },
  { value: "bahai", label: "Bahá'í" },
  { value: "jainism", label: "Jainism" },
  { value: "shinto", label: "Shinto" },
  { value: "cao_dai", label: "Cao Dai" },
  { value: "zoroastrianism", label: "Zoroastrianism" },
  { value: "tenrikyo", label: "Tenrikyo" },
  { value: "animism", label: "Animism" },
  { value: "neo_paganism", label: "Neo-Paganism" },
  { value: "unitarian_universalism", label: "Unitarian Universalism" },
  { value: "rastafari", label: "Rastafari" },
];

// --------------------------------- Class and Section and Subject ---------------------------------

export interface TeacherData {
  id: string;
  FirstName: string;
  LastName?: string;
}

export interface TeacherOption {
  value: string;
  label: string;
}

export interface TeacherData {
  id: string;
  FirstName: string;
  LastName?: string;
}

export function getTeacherOptions(
  teachers: { id: string; Teacher: string }[]
): TeacherOption[] {
  return teachers.map((teacher) => ({
    value: teacher.Teacher,
    label: teacher.Teacher,
  }));
}

export interface PeriodData {
  id: string;
  Period: string;
}

export interface PeriodOption {
  value: string;
  label: string;
}

export const getPeriodOptions = (
  teacherDropdown: PeriodData[]
): PeriodOption[] => {
  return teacherDropdown.map((item) => ({
    value: item.Period,
    label: item.Period,
  }));
};

export interface ClassData {
  id: string;
  Class: string;
}

export interface StudentData {
  id: string;
  StudentName: string;
}

export interface SectionData {
  id: string;
  Section: string;
}

export interface SubjectData {
  id: string;
  Subject: string;
}

export interface ClassOption {
  value: string;
  label: string;
}

export interface StudentOption {
  value: string;
  label: string;
}

export interface SectionOption {
  value: string;
  label: string;
}

export interface SubjectOption {
  value: string;
  label: string;
}

export const getClassOptions = (classDropdown: ClassData[]): ClassOption[] => {
  return classDropdown.map((item) => ({
    value: item.Class,
    label: item.Class,
  }));
};

export const getStudentOptions = (
  studentDropdown: StudentData[]
): StudentOption[] => {
  return studentDropdown.map((item) => ({
    value: item.id,
    label: item.StudentName,
  }));
};

export const getSubjectOptions = (
  subjectDropdown: SubjectData[]
): SubjectOption[] => {
  return subjectDropdown.map((item) => ({
    value: item.Subject,
    label: item.Subject,
  }));
};

export const getSectionOptions = (
  sectionDropdown: SectionData[]
): SectionOption[] => {
  return sectionDropdown.map((item) => ({
    value: item.Section,
    label: item.Section,
  }));
};

// -----------------------Browse Data--------------------------

export interface AllData {
  id: string;
  CreatedDate: string;
  Amount: number;
  ExamDate: string;
  IsActive: boolean;
  Class: string;
  Section: string;
  StudentFees: number;
  [key: string]: string | boolean | number;
}

export const createdDate = new Date()
  .toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
  .replace(",", "");

// export const generateSessionOptions = (numberOfYears) => {
//   const currentYear = new Date().getFullYear();
//   const sessions = [];

//   for (let i = 0; i < numberOfYears; i++) {
//     const year = currentYear - i;
//     sessions.push({ value: `${year}`, label: `${year}` });
//   }

//   return sessions;
// };

// export const sessionOptions = generateSessionOptions(15);

export const today = new Date().toISOString().split("T")[0];

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatNumberWithCommas = (value: string): string => {
  value = value.replace(/,/g, "");
  return isNaN(Number(value)) ? "" : Number(value).toLocaleString("en-US"); // Format with commas
};
