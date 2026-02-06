import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { VoiceAssistantModal } from "../voice/voice-assistant-modal";
import { Search, Mic, Phone } from "lucide-react";

type ActionCardProps = {
    icon: React.ElementType;
    title: string;
    description: string;
    href?: string;
    as?: 'div';
    isDestructive?: boolean;
}

const ActionCard = ({ icon: Icon, title, description, href, as, isDestructive = false }: ActionCardProps) => {
    const cardClasses = `h-full transition-colors ${isDestructive ? 'bg-destructive/10 border-destructive/30 hover:bg-destructive/20 text-destructive' : 'hover:bg-secondary/50'}`;
    const iconContainerClasses = `${isDestructive ? 'bg-destructive/20' : 'bg-primary/10'} p-4 rounded-lg`;
    const iconClasses = `h-8 w-8 ${isDestructive ? 'text-destructive' : 'text-primary'}`;

    const content = (
        <Card className={cardClasses}>
            <CardContent className="p-6 flex items-center gap-4">
                 <div className={iconContainerClasses}>
                    <Icon className={iconClasses} />
                 </div>
                 <div>
                    <p className="font-bold font-headline text-xl">{title}</p>
                    <p className="text-muted-foreground">{description}</p>
                 </div>
            </CardContent>
        </Card>
    );

    if (as === 'div') {
        return <div className="cursor-pointer h-full">{content}</div>;
    }

    return <Link href={href!} className="h-full block">{content}</Link>;
};


export function EmergencyActions() {
  return (
    <div>
      <h2 className="text-2xl font-bold font-headline mb-4">Other Actions</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <ActionCard
          href="/search"
          icon={Search}
          title="Manual Search"
          description="Filter all hospitals"
        />
        <a href="tel:911" className="h-full block">
            <ActionCard
              as="div"
              icon={Phone}
              title="Call Emergency"
              description="Connect to 911"
              isDestructive
            />
        </a>
      </div>
    </div>
  );
}
