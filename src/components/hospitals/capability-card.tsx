import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type CapabilityCardProps = {
    icon: LucideIcon;
    title: string;
    value: string | number;
    unit?: string;
    description: string;
    className?: string;
};

export function CapabilityCard({ icon: Icon, title, value, unit, description, className }: CapabilityCardProps) {
    return (
        <Card className={cn("text-center", className)}>
            <CardHeader className="pb-2">
                <div className="mx-auto bg-primary/10 p-3 rounded-full">
                    <Icon className="h-6 w-6 text-primary" />
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold font-headline">
                    {value}{unit && <span className="text-xl text-muted-foreground ml-1">{unit}</span>}
                </p>
                <p className="text-sm font-semibold text-muted-foreground">{title}</p>
                <p className="text-xs text-muted-foreground/80 mt-1">{description}</p>
            </CardContent>
        </Card>
    );
}
