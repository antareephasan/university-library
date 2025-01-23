import { auth } from "@/auth";
import BookList from "@/components/BookList";
import ProfileCard from "@/components/ProfileCard";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

const MyProfilePage = async () => {
  const session = await auth();

  if (!session?.user) return null;

  const user = await db
    .select({
      fullName: users.fullName,
      email: users.email,
      status: users.status,
      universityId: users.universityId,
      universityCard: users.universityCard,
    })
    .from(users)
    .where(eq(users.id, session?.user.id as string))
    .limit(1);

  if (!user) return null;
  return (
    <div className="flex flex-col lg:flex-row gap-10 xl:gap-20">
      <ProfileCard user={user[0]} />
      <BookList title="Borrowed Books" books={sampleBooks} />
    </div>
  );
};

export default MyProfilePage;
