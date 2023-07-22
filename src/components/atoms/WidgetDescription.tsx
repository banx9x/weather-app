import clsx from "clsx";
import { HTMLProps } from "react";

interface WidgetDescriptionProps extends HTMLProps<HTMLElement> {
    children: React.ReactNode;
}

export default function WidgetDescription({
    children,
}: WidgetDescriptionProps) {
    const classes = clsx("font-medium leading-none");

    return <div className={classes}>{children}</div>;
}
