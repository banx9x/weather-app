import clsx from "clsx";

type Area =
    | "search"
    | "current"
    | "hourly"
    | "daily"
    | "windy"
    | "sunrise"
    | "sunset"
    | "uv"
    | "wind"
    | "precipitation"
    | "feels_like"
    | "humidity"
    | "visibility"
    | "pressure"
    | "average";

type GridArea = {
    [key in Area]: string;
};

interface WidgetProps {
    area: Area;
    children: React.ReactNode;
}

export default function Widget({ area, children }: WidgetProps) {
    const gridArea: GridArea = {
        search: "col-search row-search",
        current: "col-current row-current",
        hourly: "col-hourly row-hourly",
        windy: "col-windy row-windy",
        daily: "col-daily row-daily",
        sunrise: "col-sunrise row-sunrise",
        sunset: "col-sunset row-sunset",
        uv: "col-uv row-uv",
        wind: "col-wind row-wind",
        precipitation: "col-precipitation row-precipitation",
        feels_like: "col-feels_like row-feels_like",
        humidity: "col-humidity row-humidity",
        visibility: "col-visibility row-visibility",
        pressure: "col-pressure row-pressure",
        average: "col-average row-average",
    };

    const classes = clsx(
        "rounded-lg bg-white/5 p-2 w-full h-full flex flex-col gap-1",
        gridArea[area]
    );

    return <div className={classes}>{children}</div>;
}
