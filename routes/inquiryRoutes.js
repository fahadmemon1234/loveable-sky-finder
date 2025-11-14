// import express from "express";
// import { addInquiry, getInquiries } from "../models/Inquiry.js";

// const router = express.Router();

// // ✅ POST /api/inquiry - Add new inquiry
// router.post("/inquiry", async (req, res) => {
//   const {
//     from,
//     to,
//     departDate,
//     returnDate,
//     adults,
//     children,
//     infants,
//     name,
//     email,
//     phone,
//     tripType,
//   } = req.body;

//   // ✅ Validation
//   if (!from || !to || !departDate || !name || !email || !phone) {
//     return res.status(400).json({ message: "Please fill all required fields" });
//   }

//   try {
//     const result = await addInquiry(req.body);
//     res.status(200).json(result); // { message: "Inquiry added successfully" }
//   } catch (err) {
//     console.error("Error saving inquiry:", err);
//     res.status(500).json({ message: "Error saving inquiry" });
//   }
// });

// // ✅ GET /api/inquiries - Fetch all inquiries
// router.get("/inquiries", async (req, res) => {
//   try {
//     const inquiries = await getInquiries();
//     res.status(200).json(inquiries);
//   } catch (err) {
//     console.error("Error fetching inquiries:", err);
//     res.status(500).json({ message: "Error fetching inquiries" });
//   }
// });

// export default router;

// ---------------------------------------------------------

import express from "express";
import {
  addInquiry,
  getInquiries,
  updateInquiry,
  addInquiryComment,
  getCommentByID,
  addInquiryCalendar,
  getInquiryByID,
  getfollowupschedule,  
  updateFollowupschedule,
} from "../models/Inquiry.js";

const router = express.Router();

// ✅ POST /api/inquiry - Add new inquiry
router.post("/inquiry", async (req, res) => {
  const {
    from,
    to,
    departDate,
    returnDate,
    adults,
    children,
    infants,
    name,
    email,
    phone,
    tripType,
  } = req.body;

  // ✅ Validation
  if (!from || !to || !departDate || !name || !email || !phone) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const result = await addInquiry(req.body);
    res.status(200).json(result); // { message: "Inquiry added successfully" }
  } catch (err) {
    console.error("❌ Error saving inquiry:", err);
    res.status(500).json({ message: "Error saving inquiry" });
  }
});

// ✅ GET /api/inquiries - Fetch all inquiries
router.get("/inquiries", async (req, res) => {
  try {
    const inquiries = await getInquiries();
    res.status(200).json(inquiries);
  } catch (err) {
    console.error("❌ Error fetching inquiries:", err);
    res.status(500).json({ message: "Error fetching inquiries" });
  }
});

router.post("/update-inquiry", async (req, res) => {
  try {
    const { id, view_id } = req.body;

    if (!id || !view_id) {
      return res.status(400).json({ message: "id and view_id are required" });
    }

    const result = await updateInquiry(id, view_id);
    res.status(200).json({ message: "Inquiry updated successfully", result });
  } catch (err) {
    console.error("❌ Error updating inquiry:", err);
    res.status(500).json({ message: "Error updating inquiry" });
  }
});

router.post("/inquiry/AddComment", async (req, res) => {
  try {
    const { userId, inquiry_id, comment } = req.body;

    // Validate required fields
    if (!userId || !inquiry_id || !comment) {
      return res.status(400).json({
        message: "userId, inquiry_id, and comment are required",
        status: 400,
      });
    }

    // Call your model function
    const result = await addInquiryComment({ userId, inquiry_id, comment });

    return res.status(200).json({
      message: "Comment added successfully",
      status: 200,
      result,
    });
  } catch (err) {
    console.error("❌ Error adding inquiry comment:", err);
    return res.status(500).json({
      message: "Error adding inquiry comment",
      status: 500,
    });
  }
});

router.get("/inquiry/GetCommentsByID/:inquiry_id", async (req, res) => {
  try {
    const { inquiry_id } = req.params;

    if (!inquiry_id) {
      return res.status(400).json({ message: "Inquiry ID is required" });
    }

    const comments = await getCommentByID(inquiry_id);
    res.status(200).json(comments);
  } catch (err) {
    console.error("❌ Error fetching comments:", err);
    res.status(500).json({ message: "Error fetching comments" });
  }
});


router.post("/inquiry/SaveFollowUpDate", async (req, res) => {
  try {
    const { user_id, inquiry_id, follow_up_date, follow_up_time } = req.body;

    if (!user_id || !inquiry_id || !follow_up_date || !follow_up_time) {
      return res.status(400).json({
        message:
          "user_id, inquiry_id, follow_up_date, and follow_up_time are required",
        status: 400,
      });
    }

    const result = await addInquiryCalendar({
      user_id,
      inquiry_id,
      follow_up_date,
      follow_up_time,
    });

    return res.status(200).json({
      message: "Follow-up added successfully",
      status: 200,
      result,
    });
  } catch (err) {
    console.error("❌ Error adding follow-up:", err);
    return res.status(500).json({
      message: "Error adding follow-up",
      status: 500,
    });
  }
});


router.get("/inquiry/GetInquiryByID/:inquiry_id", async (req, res) => {
  try {
    const { inquiry_id } = req.params;

    if (!inquiry_id) {
      return res.status(400).json({ message: "Inquiry ID is required" });
    }

    const comments = await getInquiryByID(inquiry_id);
    res.status(200).json(comments);
  } catch (err) {
    console.error("❌ Error fetching comments:", err);
    res.status(500).json({ message: "Error fetching comments" });
  }
});


router.get("/inquiry/getfollowupschedule", async (req, res) => {
  try {

    const comments = await getfollowupschedule();
    res.status(200).json(comments);
  } catch (err) {
    console.error("❌ Error fetching comments:", err);
    res.status(500).json({ message: "Error fetching comments" });
  }
});

router.post("/update-followup", async (req, res) => {
  try {
    const { id, is_read } = req.body;

    if (id === undefined || is_read === undefined) {
      return res
        .status(400)
        .json({ message: "id and is_read are required" });
    }

    const result = await updateFollowupschedule(id, is_read);

    return res
      .status(200)
      .json({ message: "Follow-up status updated successfully", result });
  } catch (err) {
    console.error("Error updating follow-up schedule:", err);
    return res
      .status(500)
      .json({ message: "Error updating follow-up status" });
  }
});

export default router;



