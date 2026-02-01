export type tutorProfileType = {
    name: string;
    email: string;
    profileAvater: string
    tutorProfile:{
    bio: string;
 category: string;
    categoryId: string;
    hourlyRate: number;
    subjects: string[];
    }
}

export type updateTutorProfilePayload = {
    user:{name:string}
    
    bio: string;
 category: string;
    categoryId: string;
    hourlyRate: number;
    subjects: string[];
}
export type StudentBooking = {
  id: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
  dateTime: string;      // ISO string
  createdAt: string;     // ISO string

  availability: {
    date: string;        // ISO string
    startTime: string;   // "10:00"
    endTime: string;     // "11:00"
  };

  tutor: {
    hourlyRate: number;
    subjects: string[];
    category: string;
id:string
    user: {
      id: string;
      name: string;
      profileAvater: string | null;
    };
  };

  review: {
    rating: number;
    comment: string;
  } | null;
};


export type addAvailabilityPayload = {
   date: Date;
    startTime: string | undefined;
    endTime: string | undefined;
}