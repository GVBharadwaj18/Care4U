import { mockHospitals } from "@/lib/data";
import { HospitalSnapshotCard } from "./hospital-snapshot-card";

export function NearbyHospitals() {
  // Simulate getting the closest hospitals. For the mock, we'll sort by distance and take the top 4.
  const nearby = mockHospitals.sort((a,b) => a.distance - b.distance).slice(0, 4);

  return (
    <div>
      <h2 className="text-2xl font-bold font-headline mb-4">Nearby Hospital Snapshot</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {nearby.map((hospital) => (
          <HospitalSnapshotCard key={hospital.id} hospital={hospital} />
        ))}
      </div>
    </div>
  );
}
