"use client";

import React from "react";
import { withLayout } from "../../../Layout";
import { useRouter, useParams } from "next/navigation";

const InquiryFollowup = () => {
  const router = useRouter();
  const params = useParams(); // App Router me ye dynamic params deta hai
  const encryptedId = params?.encryptedId; // ye aapka dynamic param

  return (
    <div>
      <h1>Inquiry Follow-up Page</h1>
      <p>Encrypted ID: {encryptedId}</p>
      <button onClick={() => router.back()}>Go Back</button>
    </div>
  );
};

export default withLayout(InquiryFollowup);
