import type { Metadata } from "next";
import Ai101Course from "@/components/elearning/Ai101Course";

export const metadata: Metadata = {
    title: "AI 101 voor zorgprofessionals | Medical AI",
    description:
        "Interactieve e-learning over veilig en verantwoord gebruik van ChatGPT en AI op de werkvloer in de zorg.",
};

export default function ElearningPage() {
    return <Ai101Course />;
}
