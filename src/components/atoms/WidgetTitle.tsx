interface TitleProps {
    icon?: string;
    children: React.ReactNode;
}

export default function WidgetTitle({ icon, children }: TitleProps) {
    return (
        <div className="flex items-center gap-1 text-zinc-400 uppercase text-sm leading-6">
            {icon && (
                <img className="w-6 h-6 object-contain" src={icon} alt="" />
            )}

            <span>{children}</span>
        </div>
    );
}
