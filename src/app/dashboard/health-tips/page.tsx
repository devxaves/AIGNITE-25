import { HealthTips } from "@/components";
import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";

const HealthTipsPage = async () => {

    const user = await currentUser();

    const dbUser = await db.user.findUnique({
        where: {
            id: user?.id,
        },
    });

    const symptoms = await db.symptom.findMany({
        where: {
            userId: user?.id,
        },
    });

    const medications = await db.medication.findMany({
        where: {
            userId: user?.id,
        },
    });

    return (
        <div className="flex flex-col items-start w-full">
            <div className="w-full p-2 md:p-4">
            <h1 className="bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500 font-bold font-heading text-indigo-500 text-transparent text-xl">
                                    Health Tips
                                </h1>

                {/* Health Tips Section */}
                <div className="mt-8">
                    <HealthTips
                        symptoms={symptoms}
                        medications={medications}
                        user={dbUser!}
                    />
                </div>
            </div>
        </div>
    )
};

export default HealthTipsPage