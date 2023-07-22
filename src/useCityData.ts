import { useEffect, useState } from "react";

export default function useCityData(coordinates: Coordinates) {
    const [status, setStatus] = useState("loading");
    const [data, setData] = useState<City>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        let cancel = false;

        const fetchCityData = async (coordinates: Coordinates) => {
            const url = new URL(
                "http://api.openweathermap.org/geo/1.0/reverse"
            );
            url.searchParams.append("lat", coordinates.lat.toString());
            url.searchParams.append("lon", coordinates.lon.toString());
            url.searchParams.append("appid", import.meta.env.VITE_APPID);
            url.searchParams.append("limit", "1");

            const res = await fetch(url);
            const data: City[] = (await res.json()) as City[];
            return data[0];
        };

        fetchCityData(coordinates)
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
