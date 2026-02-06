import { SearchClient } from "@/components/hospitals/search-client";
import { mockHospitals } from "@/lib/data";

export default async function SearchPage() {
    // In a real app, you might fetch all hospitals here or have a more complex API strategy.
    const hospitals = mockHospitals;

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-10">
            <div className="space-y-2 mb-8">
                <h1 className="font-headline text-3xl font-bold tracking-tight">
                    Emergency Search
                </h1>
                <p className="text-muted-foreground">
                    Find the right hospital based on condition, availability, and more.
                </p>
            </div>
            <SearchClient hospitals={hospitals} />
        </div>
    );
}
