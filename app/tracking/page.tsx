"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Loader2, CheckCircle, Clock, Package, Phone, XCircle, Star, Check } from "lucide-react";

export default function OrderTrackingPage() {
    const [userUid, setUserUid] = useState("");
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState<number | null>(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserUid(user.uid);
            }
        });
        return () => unsub();
    }, [setUserUid]);

    useEffect(() => {
        if (!userUid) {
            setLoading(false);
            return;
        }

        const unsubscribe = onSnapshot(
            doc(db, "New orders", userUid),
            (docSnap) => {
                if (docSnap.exists()) {
                    setOrder(docSnap.data());
                } else {
                    setOrder(null);
                }
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching order:", error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [userUid]);

    const handleCancelOrder = async () => {
        if (!userUid) return;
        try {
            const orderRef = doc(db, "New orders", userUid);
            await updateDoc(orderRef, { order: "cancelled" });
            alert("Your order has been cancelled.");
        } catch (err) {
            console.error("Error cancelling order:", err);
            alert("Failed to cancel order.");
        }
    };

    const handleCloseOrder = async () => {
        if (!userUid) return;
        try {
            const orderRef = doc(db, "New orders", userUid);
            await updateDoc(orderRef, { order: "completed", rating: rating || 0 });
            alert("Thank you for your feedback. Order closed.");
        } catch (err) {
            console.error("Error closing order:", err);
            alert("Failed to close order.");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-600">
                <Loader2 className="animate-spin w-6 h-6 mr-2" />
                Loading your order...
            </div>
        );
    }

    if (!userUid) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-500">
                Please log in to track your orders.
            </div>
        );
    }

    if (!order) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-500">
                No active orders found.
            </div>
        );
    }

    const steps = [
        { id: "pending", label: "Pending", icon: Clock },
        { id: "preparing", label: "Preparing", icon: Package },
        { id: "received", label: "Received", icon: CheckCircle },
    ];

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-xl font-semibold mb-4">Order Tracking</h1>

            {/* Order summary */}
            <div className="bg-white p-4 rounded-lg shadow mb-6 space-y-2">
                <p className="text-sm">
                    <span className="font-medium">Order Date:</span> {order.orderDate}
                </p>
                <p className="text-sm">
                    <span className="font-medium">Vendor:</span> {order.vendorTitle}
                </p>
                <p className="text-sm">
                    <span className="font-medium">Delivery To:</span> {order.dest}
                </p>
                <p className="text-sm">
                    <span className="font-medium">Total:</span> {order.currency}{" "}
                    {parseInt(order.price).toLocaleString()}
                </p>
                <p className="text-sm">
                    <span className="font-medium">Payment:</span> {order.paymentType}
                </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 mb-6 items-center">
                <a
                    href={`tel:${order.vendorPhone || ""}`}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
                >
                    <Phone className="w-4 h-4" /> Call Vendor
                </a>
                <div className="flex flex-col">
                    <button
                        onClick={handleCancelOrder}
                        disabled={order.order !== "pending"}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow text-white ${
                            order.order === "pending"
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        <XCircle className="w-4 h-4" /> Cancel Order
                    </button>
                    {order.order !== "pending" && (
                        <span className="text-xs text-gray-500 mt-1">
                            Order can only be cancelled while pending.
                        </span>
                    )}
                </div>
            </div>

            {/* Order status timeline */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h2 className="text-base font-semibold mb-3">Status</h2>
                <div className="space-y-4">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = step.id === order.order;
                        const isCompleted =
                            steps.findIndex((s) => s.id === order.order) >= index;

                        return (
                            <div key={step.id} className="flex items-center gap-3">
                                <div
                                    className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                                        isCompleted
                                            ? "bg-green-500 border-green-500 text-white"
                                            : "border-gray-300 text-gray-400"
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                </div>
                                <span
                                    className={`text-sm font-medium ${
                                        isActive ? "text-green-600" : "text-gray-500"
                                    }`}
                                >
                                    {step.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Rating section when order is received */}
            {order.order === "received" && (
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-base font-semibold mb-3">Rate Your Order</h2>
                    <div className="flex gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                className={`p-2 rounded-full ${
                                    rating && rating >= star ? "text-yellow-500" : "text-gray-400"
                                }`}
                            >
                                <Star className="w-6 h-6" fill={rating && rating >= star ? "currentColor" : "none"} />
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleCloseOrder}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
                    >
                        <Check className="w-4 h-4" /> Close Order
                    </button>
                </div>
            )}
        </div>
    );
}
