export const stats = [
  {
    title: "Today's Sales",
    value: "₹18,450",
    change: "+12.4%",
    type: "positive",
  },
  { title: "Active Orders", value: "23", change: "+5", type: "positive" },
  { title: "Tables Occupied", value: "14/20", change: "70%", type: "neutral" },
  { title: "Low Stock Items", value: "6", change: "-2", type: "warning" },
];

export const orders = [
  {
    id: "#ORD-201",
    customer: "Aarav Sharma",
    table: "T-04",
    amount: "₹540",
    status: "Preparing",
  },
  {
    id: "#ORD-202",
    customer: "Sara Khan",
    table: "T-09",
    amount: "₹1,240",
    status: "Served",
  },
  {
    id: "#ORD-203",
    customer: "Rohan Patel",
    table: "T-02",
    amount: "₹860",
    status: "Pending",
  },
  {
    id: "#ORD-204",
    customer: "Neha Verma",
    table: "T-11",
    amount: "₹430",
    status: "Preparing",
  },
  {
    id: "#ORD-205",
    customer: "Kabir Ali",
    table: "T-15",
    amount: "₹770",
    status: "Completed",
  },
];

export const topItems = [
  { name: "Paneer Tikka", orders: 34, revenue: "₹6,120" },
  { name: "Veg Biryani", orders: 28, revenue: "₹5,040" },
  { name: "Cold Coffee", orders: 25, revenue: "₹3,750" },
  { name: "Masala Dosa", orders: 22, revenue: "₹3,080" },
];

export const activities = [
  "Table T-09 payment completed.",
  "Low stock alert for Cheese and Mushrooms.",
  "New online order received from Swiggy.",
  "Chef marked order #ORD-201 as preparing.",
];
