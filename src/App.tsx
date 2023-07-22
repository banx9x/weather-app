import { useEffect, useState } from "react";
import "./App.css";
import sunriseIcon from "@assets/sunrise.png";
import sunsetIcon from "@assets/sunset.png";
import windIcon from "@assets/wind.png";
import useForceCastData from "@/useForceCastData";
import useCityData from "@/useCityData";
import Widget from "@/components/atoms/Widget";
import WidgetTitle from "@/components/atoms/WidgetTitle";
import ForceCast from "@components/templates/ForceCast";
import WidgetValue from "@components/atoms/WidgetValue";
import UVWidget from "@components/organisms/UVWidget";
import WindSpeedWidget from "@components/organisms/WindSpeedWidget";
import WindyWidget from "@components/organisms/WindyWidget";
import FeelsLikeWidget from "@components/organisms/FeelsLikeWidget";
import Humidity from "./components/organisms/Humidity";

interface Sun {
    [key: string]: Pick<CurrentData, "sunrise" | "sunset">;
}

const defaultCoordinates: Coordinates = {
    lat: 21.028511,
    lon: 105.804817,
};

function App() {
    const [isRequestGeolocation, setIsRequestGeolocation] =
        useState<boolean>(true);
    const [coordinates, setCoordinates] =
        useState<Coordinates>(defaultCoordinates);

    const {
        isLoading: isLoadingCity,
        isError: isLoadingCityError,
        data: cityData,
    } = useCityData(coordinates);
    const {
        isLoading: isLoadingForceCast,
        isError: isLoadingForceCastError,
        data: forceCastData,
    } = useForceCastData(coordinates);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coordinates = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    };
                    setCoordinates(coordinates);
                    setIsRequestGeolocation(false);
                },
                (error) => {
                    console.error(error);
                    setIsRequestGeolocation(false);
                }
            );
        }
    }, []);

    if (isRequestGeolocation) {
        return (
            <div className="App">
                <h1>Accept location</h1>
            </div>
        );
    }

    const twilight: Sun =
        forceCastData?.daily.reduce((result, data) => {
            const date = new Date(data.dt * 1000);

            result[date.getDate()] = {
                sunrise: data.sunrise,
                sunset: data.sunset,
            };

            return result;
        }, {} as Sun) || {};

    return (
        <ForceCast>
            <Widget area="search"></Widget>
            <Widget area="current"></Widget>

            <Widget area="hourly"></Widget>
            <WindyWidget lat={cityData?.lat} lon={cityData?.lon} />
            <Widget area="daily"></Widget>
            <Widget area="sunrise"></Widget>
            <Widget area="sunset"></Widget>
            <UVWidget value={forceCastData?.current.uvi} />

            <WindSpeedWidget value={forceCastData?.current.wind_speed} />
            <Widget area="precipitation"></Widget>
            <FeelsLikeWidget value={forceCastData?.current.feels_like} />
            <Humidity value={forceCastData?.current.humidity} />
            <Widget area="visibility"></Widget>
            <Widget area="pressure"></Widget>
            <Widget area="average"></Widget>

            {/* <div className="grid-item hourly">
                <div className="title">
                    {forceCastData && (
                        <img
                            className="icon"
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

                            const twilight = sun[date.getDate()];

                            if (!twilight) {
                                return (
                                    <div className="hourly-item">
                                        <div className="hourly-item-time">
                                            {new Date(
                                                data.dt * 1000
                                            ).getHours()}
                                        </div>
                                        <img
                                            className="icon"
                                            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                                        />
                                        <div className="hourly-item-temp">
                                            {Math.round(data.temp)}&deg;
                                        </div>
                                    </div>
                                );
                            } else {
                                const { sunrise, sunset } = twilight;
                                const sunriseTime = new Date(sunrise * 1000);
                                const sunsetTime = new Date(sunset * 1000);

                                return (
                                    <>
                                        <div className="hourly-item">
                                            <div className="hourly-item-time">
                                                {new Date(
                                                    data.dt * 1000
                                                ).getHours()}
                                            </div>
                                            <img
                                                className="icon"
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
                                                        {sunriseTime.getHours()}
                                                        :
                                                        {sunriseTime.getMinutes()}
                                                    </div>
                                                    <img
                                                        className="icon"
                                                        src={sunriseIcon}
                                                        alt="Sunrise"
                                                    />
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
                                                    <img
                                                        className="icon"
                                                        src={sunsetIcon}
                                                        alt="Sunset"
                                                    />
                                                    <div className="sunset-title">
                                                        Sunset
                                                    </div>
                                                </div>
                                            )}
                                    </>
                                );
                            }
                        })}
                </div>
                C
            </div>

            <div className="grid-item windy">
                <div className="title">
                    <img className="icon" src={windIcon} alt="Windy" />
                    Windy
                </div>

                
            </div>

            <div className="grid-item uv">
                <div className="title">
                    <img className="icon" src={windIcon} alt="Windy" />
                    UV Index
                </div>

                <div className="value">{forceCastData.current.uvi}</div>
            </div>

            <div className="grid-item wind-speed">
                <div className="title">
                    <img className="icon" src={windIcon} alt="Windy" />
                    Speed
                </div>

                <div className="value">
                    {forceCastData.current.wind_speed}
                    <span className="unit">km/h</span>
                </div>
            </div>

            <div className="grid-item sunrise">
                <div className="title">
                    <img className="icon" src={windIcon} alt="Windy" />
                    Sunrise
                </div>

                <div className="value">
                    {new Date(forceCastData.current.sunrise * 1000).getHours()}:
                    {new Date(
                        forceCastData.current.sunrise * 1000
                    ).getMinutes()}
                </div>
            </div>

            <div className="grid-item sunset">
                <div className="title">
                    <img className="icon" src={windIcon} alt="Windy" />
                    Sunset
                </div>

                <div className="value">
                    {new Date(forceCastData.current.sunset * 1000).getHours()}:
                    {new Date(forceCastData.current.sunset * 1000).getMinutes()}
                </div>
            </div> */}
        </ForceCast>
    );
}

export default App;
