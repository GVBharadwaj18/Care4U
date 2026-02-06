import { Card, CardContent } from "@/components/ui/card";
import { mockHistory } from "@/lib/data";
import { formatDistanceToNow } from "date-fns";
import { History as HistoryIcon, Search, Mic, FileText, Eye } from "lucide-react";
import { HistoryLog } from "@/lib/types";

function getIconForAction(action: string) {
    if (action.toLowerCase().includes('search')) return <Search className="h-5 w-5 text-muted-foreground" />;
    if (action.toLowerCase().includes('voice')) return <Mic className="h-5 w-5 text-muted-foreground" />;
    if (action.toLowerCase().includes('viewed')) return <Eye className="h-5 w-5 text-muted-foreground" />;
    if (action.toLowerCase().includes('profile')) return <FileText className="h-5 w-5 text-muted-foreground" />;
    return <HistoryIcon className="h-5 w-5 text-muted-foreground" />;
}

export default function HistoryPage() {
    const historyLogs = mockHistory;
    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-10">
            <div className="space-y-2 mb-8">
                <h1 className="font-headline text-3xl font-bold tracking-tight">
                    Safety, Logs, and History
                </h1>
                <p className="text-muted-foreground">
                    A record of your interactions with Care4U.
                </p>
            </div>
            <Card>
                <CardContent className="pt-6">
                    <ul className="space-y-6">
                        {historyLogs.map((log: HistoryLog) => (
                            <li key={log.id} className="flex items-start gap-4">
                                <div className="bg-secondary p-3 rounded-full mt-1">
                                    {getIconForAction(log.action)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <p className="font-medium">{log.action}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatDistanceToNow(log.timestamp, { addSuffix: true })}
                                        </p>
                                    </div>
                                    {log.details && (
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {log.details}
                                        </p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
