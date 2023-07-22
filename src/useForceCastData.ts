import { useEffect, useState } from "react";

export default function useForceCastData(coordinates: Coordinates) {
    const [status, setStatus] = useState("loading");
    const [data, setData] = useState<ForceCastData>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        let cancel = false;

        const fetchForceCastData = async (coordinates: Coordinates) => {
            const url = new URL(
                "https://api.openweathermap.org/data/3.0/onecall"
            );
            url.searchParams.append("lat", coordinates.lat.toString());
            url.searchParams.append("lon", coordinates.lon.toString());
            url.searchParams.append("appid", import.meta.env.VITE_APPID);
            url.searchParams.append("units", "metric");
            url.searchParams.append("lang", "vi");

            const res = await fetch(url);

            if (!res.ok) {
                throw new Error("Failed to fetch forcecast data");
            }

            const data: ForceCastData = (await res.json()) as ForceCastData;
            return data;
        };

        fetchForceCastData(coordinates)
            .then((data) => {
                if (cancel) return;

                setData(data);
                setStatus("success");
            })
            .catch((error) => {
                if (cancel) return;

                setError((error as Error).message);
                setStatus("error");
            });

        return function cleanup() {
            cancel = true;
        };
    }, [coordinates]);

    return {
        status,
        data,
        error,
        isLoading: status === "loading",
        isError: status === "error",
    };
}
