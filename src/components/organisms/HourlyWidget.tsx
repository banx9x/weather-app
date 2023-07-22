import WidgetTitle from "../atoms/WidgetTitle";
import Widget from "../atoms/Widget";

interface HourlyWidgetProps {
    title: string;
}

export default function HourlyWidget({ title }: HourlyWidgetProps) {
    return (
        <Widget area="hourly">
            <WidgetTitle>{title}</WidgetTitle>
        </Widget>
    );
}
