import Widget from "../atoms/Widget";
import WidgetContent from "../atoms/WidgetContent";
import WidgetTitle from "../atoms/WidgetTitle";

import windIcon from "@assets/wind.png";

export default function WindyWidget({ lat, lon }: Coordinates) {
    return (
        <Widget area="windy">
            <WidgetTitle icon={windIcon}>Windy</WidgetTitle>

            <WidgetContent>
                <iframe
                    className="rounded-lg w-full h-full"
                    src={`https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=$.lat}&detailLon=${lon}&zoom=10&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`}
                ></iframe>
            </WidgetContent>
        </Widget>
    );
}
