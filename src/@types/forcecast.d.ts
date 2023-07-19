interface Coordinates {
    lat: number;
    lon: number;
}

interface WeatherData {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface CurrentData {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: WeatherData[];
}

interface MinuteData {
    dt: number;
    precipitation: number;
}

interface HourData extends CurrentData {
    pop: number;
    rain: {
        [key: string]: number;
    };
}

interface TempData {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

interface FeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
}

interface DailyData extends Omit<CurrentData, "temp" | "feels_like"> {
    moonrise: number;
    moonset: number;
    moon_phase: number;
    summary: string;
    temp: TempData;
    feels_like: FeelsLike;
    pop: number;
    rain: number;
}

interface ForceCastData {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: CurrentData;
    minutely: MinuteData[];
    hourly: HourData[];
    daily: DailyData[];
}

interface City extends Coordinates {
    name: string;
    local_names: {
        [key: string]: string;
    };
    country: string;
}
