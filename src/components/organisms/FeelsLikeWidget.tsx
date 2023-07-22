import Widget from "../atoms/Widget";
import WidgetContent from "../atoms/WidgetContent";
import WidgetTitle from "../atoms/WidgetTitle";

import windIcon from "@assets/wind.png";
import WidgetValue from "../atoms/WidgetValue";
import WidgetUnit from "../atoms/WidgetUnit";

import feelsLikeIcon from "@assets/feels-like.png";

interface FeelsLikeWidgetProps {
    value: number;
}

export default function FeelsLikeWidget({ value }: FeelsLikeWidgetProps) {
    return (
        <Widget area="feels_like">
            <WidgetTitle icon={feelsLikeIcon}>Feels Like</WidgetTitle>

            <WidgetContent>
                <WidgetValue>{Math.round(value)}</WidgetValue>
                <WidgetUnit>&deg;C</WidgetUnit>
            </WidgetContent>
        </Widget>
    );
}
