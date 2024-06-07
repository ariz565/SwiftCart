import { updateOrderStatusAutomatically } from "@/utils/orderStatusUpdater";
import { createRouter } from "next-connect";

const router = createRouter();

router.put(async (req, res) => {
  try {
    await updateOrderStatusAutomatically();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error updating order statuses:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export default router.handler();
