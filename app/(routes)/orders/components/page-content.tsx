"use client";

import { Orders } from "@/types-db";
import OrderItem from "./order-item";
import { Timestamp } from "firebase/firestore";

interface PageContentProps {
  orders: Orders[];
}

const PageContent = ({ orders }: PageContentProps) => {
  if (orders.length === 0) {
    return (
      <div className="w-full border rounded-lg border-white-100 p-4 flex flex-col items-center justify-center gap-4 mt-4">
        No Order Found
      </div>
    );
  }

  // Function to convert Timestamp to Date
  const timestampToDate = (timestamp?: Timestamp | any): Date => {
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate();
    } else if (timestamp && typeof timestamp.seconds === "number" && typeof timestamp.nanoseconds === "number") {
      return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    } else {
      return new Date(0); // Default date if timestamp is invalid
    }
  };

  // Sort orders by createdAt in descending order (latest first)
  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = timestampToDate(a.createdAt);
    const dateB = timestampToDate(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="w-full rounded-lg p-4 flex flex-col items-center justify-center gap-4 mt-4">
      {sortedOrders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
};

export default PageContent;
