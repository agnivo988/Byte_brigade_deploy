import TournamentForm from "@/components/dashboard/TournamentForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateTournamentPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">Create a New Tournament</CardTitle>
                    <CardDescription>Fill out the details below to get your tournament started.</CardDescription>
                </CardHeader>
                <CardContent>
                    <TournamentForm />
                </CardContent>
            </Card>
        </div>
    )
}
