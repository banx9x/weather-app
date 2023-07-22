import Widget from "../atoms/Widget";
import WidgetContent from "../atoms/WidgetContent";
import WidgetDescription from "../atoms/WidgetDescription";
import WidgetTitle from "../atoms/WidgetTitle";
import WidgetValue from "../atoms/WidgetValue";

import uvIcon from "@assets/uv.png";

interface UVWidgetProps {
    value: number;
}

type UVLevel = "Low" | "Moderate" | "High" | "Very high" | "Extreme";
type UVLevelColors = {
    [key in UVLevel]: string;
};

export default function UVWidget({ value }: UVWidgetProps) {
    const colors: UVLevelColors = {
        Low: "text-green-500",
        Moderate: "text-yellow-500",
        High: "text-orange-500",
        "Very high": "text-red-500",
        Extreme: "text-violet-500",
    };

    const level: UVLevel =
        value <= 2
            ? "Low"
            : value <= 5
            ? "Moderate"
            : value <= 7
            ? "High"
            : value <= 10
            ? "Very high"
            : "Extreme";

    const color = colors[level];

    return (
        <Widget area="uv">
            <WidgetTitle icon={uvIcon}>UV Index</WidgetTitle>

            <WidgetContent className={color}>
                <WidgetValue>{value}</WidgetValue>
                <WidgetDescription>{level}</WidgetDescription>
            </WidgetContent>
        </Widget>
    );
}
