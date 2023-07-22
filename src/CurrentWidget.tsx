interface CurrentWidgetProps {
    city: City;
    data: CurrentData;
}

export default function CurrentWidget({ city, data }: CurrentWidgetProps) {
    return (
        <div className="grid-item current">
            <div className="city">
                {city.name}, {city.country}
            </div>
            <div className="temp">{Math.round(data.temp)}</div>
            <div className="status">{data.weather[0].main}</div>
        </div>
    );
}
