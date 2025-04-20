"use client";

import { Card, CardContent } from "@/components/ui/card";
import { getHealthTips } from "@/actions";
import { Medication, Symptom, User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { LoaderIcon, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import clsx from "clsx";

interface Props {
  symptoms: Symptom[];
  medications: Medication[];
  user: User;
}

const tipsList = [
  {
    title: "Precision Nutrition for Headache Management",
    content:
      "Incorporate lectin-blocking foods like leafy greens, broccoli, cauliflower, and berries. Magnesium glycinate may help prevent migraines."
  },
  {
    title: "Microbiome Modulation",
    content:
      "Eat prebiotic-rich foods like Jerusalem artichokes, onions, and garlic. Consider probiotics with Lactobacillus rhamnosus GG and Bifidobacterium bifidum."
  },
  {
    title: "Chronobiologically Optimized Hydration",
    content:
      "Drink most of your water before 3 PM to stay hydrated and improve sleep quality."
  },
  {
    title: "Environmental Toxin Mitigation",
    content:
      "Use a HEPA air purifier and natural cleaning products. Avoid synthetic fragrances. Consider heavy metal testing."
  },
  {
    title: "Paracetamol & Aspirin Impact Mitigation",
    content:
      "Support liver health with glutathione-boosting foods like broccoli and avocado. Periodic liver enzyme tests are advised."
  },
  {
    title: "Gene-Drug Interaction Awareness",
    content:
      "Gene variants can affect medication metabolism. Consider pharmacogenomic testing for personalized treatment."
  },
  {
    title: "Advanced Exercise Physiology",
    content:
      "Do yoga, Pilates, or swimming 3-4 times a week. Try HRV biofeedback training for stress resilience."
  },
  {
    title: "Neuroscience-Based Stress Management",
    content:
      "Practice 10 minutes of mindfulness meditation daily. Explore neurofeedback to reduce stress-induced headaches."
  }
];

const HealthTips = ({ symptoms, medications, user }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutate } = useMutation({
    mutationKey: ["get-tips"],
    mutationFn: async () => {
      setIsLoading(true);
      const res = await getHealthTips({ symptoms, medications, user });
      localStorage.setItem("cura_health_tips", res);
      setIsLoading(false);
      return res;
    },
    onError: (error) => {
      setIsLoading(false);
      console.error(error);
      toast.error("Error getting health tips");
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success("Health tips refreshed!");
    }
  });

  const handleRefresh = () => {
    mutate();
  };

  useEffect(() => {
    const storedTips = localStorage.getItem("cura_health_tips");
    if (!storedTips) mutate();
  }, [mutate]);

  return (
    <div className="flex flex-col gap-4 items-center justify-start w-full h-full p-4">
      <div className="flex items-center justify-between w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">Personalized Health Tips for Anirban</h2>
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className={clsx(
            "flex items-center gap-1 px-4 py-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition-all duration-300",
            isLoading && "opacity-50 cursor-not-allowed"
          )}
        >
          <RefreshCcw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full">
          <LoaderIcon className="w-6 h-6 animate-spin" />
          <p className="text-sm text-muted-foreground font-medium mt-2">
            Loading health tips...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
          {tipsList.map((tip, index) => (
            <Card
              key={index}
              className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-indigo-200 dark:border-gray-700 shadow-md hover:shadow-lg transition duration-300"
            >
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                  {index + 1}. {tip.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {tip.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthTips;
