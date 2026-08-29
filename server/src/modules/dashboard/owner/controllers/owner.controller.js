import Property from "../../../property/models/property.model.js";
import Request from "../model/Request.model.js";
import Invoice from "../../../invoice/models/invoice.model.js";
import Activity from "../model/Activity.model.js";
export const getOwnerDashboard = async (req, res) => {
    try {
        const ownerId = req.user.id;
        const activeListings = await Property.countDocuments({
            landlordId: ownerId,
            status: "available",
        })
        const pendingRequests = await Request.countDocuments({
            owner: ownerId,
            status: "ACTIVE",
        })
        const occupied = await Property.countDocuments({
            landlordId: ownerId,
            status: "rented",
        })
        const totalProperty = await Property.countDocuments({
            landlordId: ownerId,
        });
        const occupancyRate =
            totalProperty === 0
                ? 0
                : Math.round((occupied / totalProperty) * 100);

        const revenue = await Invoice.aggregate([
            {
                $match: {
                    landlordId: ownerId,
                    status: "paid",
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$amountDue",
                    },
                }
            }
        ])
        const monthlyRevenue =
            revenue.length > 0 ? revenue[0].totalRevenue : 0;

        const recentActivities = await Activity.find({
            owner: ownerId,
        })
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            success: true,
            data: {
                trustScore: 94,
                monthlyRevenue,
                pendingRequests,
                occupancyRate,
                activeListings,
                recentActivities,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching dashboard data",
            error: error.message,
        });
    }
}
