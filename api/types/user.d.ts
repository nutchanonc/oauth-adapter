interface UserFilter {
  uid?: string;
  personalEmail?: string;
}

interface PublicUserData {
  uid: string;
  appQuota?: number;
  appOwned?: number;
}

interface FullUserData extends User {
  student: Student
  educations: Education[]
}

interface UserWithStudent extends User {
  student?: Student
}