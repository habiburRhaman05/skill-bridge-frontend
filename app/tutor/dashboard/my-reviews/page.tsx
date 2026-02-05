
import { getProfile } from "@/features/auth/services";
import ReviewDashboard from "@/features/review/ReviewDashboard";
import { getTutorReviews } from "@/features/tutor/services";




const ReviewPage = async () => {

  const userData = await getProfile()
const  reviews= await getTutorReviews(userData?.user.data.tutorProfile.id);


  return <ReviewDashboard reviews={reviews?.data} />;
};









export default ReviewPage;