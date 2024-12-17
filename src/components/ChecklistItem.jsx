import React from "react";

export default function ChecklistItem ({item}) {
    const completedStyle = "bg-green-200 hover:bg-green300 scale-95";
    const notcompletedStyle = "bg-gray-200 hover:bg-green300";

    return <div>{item}</div>;
}