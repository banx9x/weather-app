interface ForceCastProps {
    children: React.ReactNode;
}

export default function ForceCast(props: ForceCastProps) {
    return (
        <div className="grid grid-cols-forcecast grid-rows-forcecast min-h-screen py-4 mx-auto gap-3 place-content-center">
            {props.children}
        </div>
    );
}
