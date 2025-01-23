"use client";

import config from "@/lib/config";
import { IKImage } from "imagekitio-next";
import Image from "next/image";
import React from "react";

interface UserProps {
  fullName: string;
  email: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | null;
  universityId: number;
  universityCard: string;
}

const ProfileCard = ({ user }: { user: UserProps }) => {
  return (
    <section className="relative flex flex-col items-center gap-3 xs:gap-5 md:gap-7 w-full h-min gradient-blue rounded-3xl shadow-sm px-4 pb-4 xs:px-5 xs:pb-5 md:px-10 md:pb-10 pt-20">
      <div className="absolute -top-5 mx-auto bg-dark-700 rounded-b-full h-20 w-14 flex justify-center items-center pt-6 shadow-lg">
        <div className="h-[10px] w-10 bg-dark-800 rounded-3xl shadow-sm" />
      </div>

      <div className="flex gap-1 sm:gap-5 md:gap-7 w-full">
        <Image
          src={"/images/profile-placeholder.jpg"}
          alt={user?.fullName}
          width={500}
          height={500}
          className="rounded-full shadow-2xl border-8 border-dark-400 max-w-24 max-h-24 md:max-w-28 md:max-h-28"
        />

        <div className="flex flex-col justify-center gap-1">
          <div className="flex gap-1">
            <Image
              src="/icons/verified.svg"
              alt="verified"
              height={18}
              width={18}
            />
            <p className="text-light-100 font-normal text-xs md:text-sm">
              Verified Student
            </p>
          </div>
          <h2 className="text-white font-semibold text-lg sm:text-xl md:text-2xl">
            {user?.fullName}
          </h2>
          <p className="text-light-100 font-normal text-sm sm:text-base md:text-lg">
            {user?.email}
          </p>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <p className="text-light-100 font-normal text-sm sm:text-base md:text-lg">
          University
        </p>
        <h2 className="text-white font-semibold text-lg sm:text-xl md:text-2xl">
          University of JS Mastery
        </h2>
      </div>
      <div className="flex flex-col w-full">
        <p className="text-light-100 font-normal text-sm sm:text-base md:text-lg">
          Student ID
        </p>
        <h2 className="text-white font-semibold text-lg sm:text-xl md:text-2xl">
          {user?.universityId}
        </h2>
      </div>

      <IKImage
        path={user?.universityCard}
        urlEndpoint={config.env.imagekit.urlEndpoint}
        alt="Book cover"
        width={486}
        height={287}
        className="rounded-sm object-fill"
        loading="lazy"
        lqip={{ active: true }}
      />
    </section>
  );
};

export default ProfileCard;
