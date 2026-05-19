"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Card } from "@heroui/react";
import UpdateUserModal from "@/components/UpdateUserModal";

const ProfilePage = () => {
  const { data, isLoading } = authClient.useSession();

  const user = data?.user;

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10 text-red-500">User not found</p>;
  }

  return (
    <Card className="max-w-96 mx-auto mt-5 p-5">

      <Avatar>
        <Avatar.Image
          src={user.image || ""}
          alt="profile"
        />

        <Avatar.Fallback>
          {user?.name ? user.name.charAt(0) : "U"}
        </Avatar.Fallback>
      </Avatar>

      <h2 className="text-xl font-bold mt-3">
        {user.name}
      </h2>

      <p className="text-gray-500">
        {user.email}
      </p>

      <UpdateUserModal user={user} />

    </Card>
  );
};

export default ProfilePage;