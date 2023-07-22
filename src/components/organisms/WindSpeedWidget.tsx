import Widget from "../atoms/Widget";
import WidgetContent from "../atoms/WidgetContent";
import WidgetTitle from "../atoms/WidgetTitle";
import WidgetUnit from "../atoms/WidgetUnit";
import WidgetValue from "../atoms/WidgetValue";
import windIcon from "@assets/wind.png";

interface WindSpeedWidgetProps {
    value: number;
}

export default function WindSpeedWidget({ value }: WindSpeedWidgetProps) {
    return (
        <Widget area="wind">
            <WidgetTitle icon={windIcon}>Wind Speed</WidgetTitle>

            <WidgetContent>
                <WidgetValue>{value}</WidgetValue>
                <WidgetUnit>m/s</WidgetUnit>
            </WidgetContent>
        </Widget>
    );
}
