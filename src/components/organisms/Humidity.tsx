import Widget from "../atoms/Widget";
import WidgetContent from "../atoms/WidgetContent";
import WidgetTitle from "../atoms/WidgetTitle";
import WidgetUnit from "../atoms/WidgetUnit";
import WidgetValue from "../atoms/WidgetValue";

import humidityIcon from "@assets/humidity.png";

interface HumidityProps {
    value: number;
}

export default function Humidity({ value }: HumidityProps) {
    return (
        <Widget area="humidity">
            <WidgetTitle icon={humidityIcon}>Humidity</WidgetTitle>

            <WidgetContent>
                <WidgetValue>{value}</WidgetValue>
                <WidgetUnit>%</WidgetUnit>
            </WidgetContent>
        </Widget>
    );
}
