import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, Pill, Stethoscope } from "lucide-react";

const supportItems = [
    {
        icon: Pill,
        title: "Medication Schedule",
        description: "View and manage your post-discharge medication plan. Set reminders to stay on track."
    },
    {
        icon: Calendar,
        title: "Follow-up Appointments",
        description: "Check your upcoming appointments with specialists and primary care physicians."
    },
    {
        icon: FileText,
        title: "Discharge Summaries",
        description: "Access and download your hospital discharge papers and medical notes."
    },
    {
        icon: Stethoscope,
        title: "Find a Caregiver",
        description: "Browse resources for finding in-home care and support services."
    }
]

export default function DischargePage() {
    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-10">
            <div className="space-y-2 mb-8">
                <h1 className="font-headline text-3xl font-bold tracking-tight">
                    Discharge & Post-Care Support
                </h1>
                <p className="text-muted-foreground">
                    Guidance and resources for a smooth recovery at home.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                {supportItems.map((item, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <item.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
