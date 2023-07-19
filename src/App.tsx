import { useEffect, useState } from "react";
import "./App.css";

interface Sun {
    [key: string]: Pick<CurrentData, "sunrise" | "sunset">;
}

function App() {
    const [city, setCity] = useState<City | null>(null);
    const [forceCastData, setForceCastData] = useState<ForceCastData | null>(
        null
    );

    const fetchForceCastData = async (coordinates: Coordinates) => {
        const url = new URL("https://api.openweathermap.org/data/3.0/onecall");
        url.searchParams.append("lat", coordinates.lat.toString());
        url.searchParams.append("lon", coordinates.lon.toString());
        url.searchParams.append("appid", import.meta.env.VITE_APPID);
        url.searchParams.append("units", "metric");
        url.searchParams.append("lang", "vi");

        const res = await fetch(url);
        const data: ForceCastData = (await res.json()) as ForceCastData;
        setForceCastData(data);
    };

    const fetchCityData = async (coordinates: Coordinates) => {
        const url = new URL("http://api.openweathermap.org/geo/1.0/reverse");
        url.searchParams.append("lat", coordinates.lat.toString());
        url.searchParams.append("lon", coordinates.lon.toString());
        url.searchParams.append("appid", import.meta.env.VITE_APPID);
        url.searchParams.append("limit", "1");

        const res = await fetch(url);
        const data: City[] = (await res.json()) as City[];
        setCity(data[0]);
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const coordinates = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                };

                fetchForceCastData(coordinates).catch((error) =>
                    console.error(error)
                );

                fetchCityData(coordinates).catch((error) =>
                    console.error(error)
                );
            });
        }
    }, []);

    if (!city || !forceCastData) {
        return null;
    }

    const sun: Sun =
        forceCastData?.daily.reduce((result, data) => {
            const date = new Date(data.dt * 1000);

            result[date.getDate()] = {
                sunrise: data.sunrise,
                sunset: data.sunset,
            };

            return result;
        }, {} as Sun) || {};

    console.log("Sun", sun);

    return (
        <div className="forcecast">
            <div className="current">
                <div className="city">
                    {city?.name}, {city?.country}
                </div>
                <div className="temp">
                    {forceCastData && Math.round(forceCastData.current.temp)}
                    &deg;
                </div>
                <div className="status">
                    {forceCastData?.current.weather[0].main}
                </div>
            </div>

            <div className="hourly">
                <div className="hourly-title">
                    {forceCastData && (
                        <img
                            className="weather-icon"
                            src={`https://openweathermap.org/img/wn/${forceCastData.current.weather[0].icon}@2x.png`}
                            alt={forceCastData.current.weather[0].main}
                        />
                    )}
                    {forceCastData && forceCastData.current.weather[0].main}
                </div>

                <div className="hourly-list">
                    {forceCastData &&
                        forceCastData.hourly.map((data) => {
                            const date = new Date(data.dt * 1000);

                            const { sunrise, sunset } = sun[date.getDate()];
                            const sunriseTime = new Date(sunrise * 1000);
                            const sunsetTime = new Date(sunset * 1000);

                            console.log(
                                sunriseTime.getHours() - date.getHours()
                            );

                            return (
                                <>
                                    <div className="hourly-item">
                                        <div className="hourly-item-time">
                                            {new Date(
                                                data.dt * 1000
                                            ).getHours()}
                                        </div>
                                        <img
                                            className="hourly-item-icon"
                                            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                                        />
                                        <div className="hourly-item-temp">
                                            {Math.round(data.temp)}&deg;
                                        </div>
                                    </div>
                                    {0 <=
                                        sunriseTime.getHours() -
                                            date.getHours() &&
                                        sunriseTime.getHours() -
                                            date.getHours() <
                                            1 && (
                                            <div className="sunrise">
                                                <div className="sunrise-time">
                                                    {sunriseTime.getHours()}:
                                                    {sunriseTime.getMinutes()}
                                                </div>
                                                MTM
                                                <div className="sunrise-title">
                                                    Sunrise
                                                </div>
                                            </div>
                                        )}

                                    {0 <=
                                        sunsetTime.getHours() -
                                            date.getHours() &&
                                        sunsetTime.getHours() -
                                            date.getHours() <
                                            1 && (
                                            <div className="sunset">
                                                <div className="sunset-time">
                                                    {sunsetTime.getHours()}:
                                                    {sunsetTime.getMinutes()}
                                                </div>
                                                MTM
                                                <div className="sunset-title">
                                                    Sunset
                                                </div>
                                            </div>
                                        )}
                                </>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default App;
