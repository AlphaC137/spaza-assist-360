import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const foodSafetyPosts = [
  {
    title: "Hand Hygiene",
    content: "Wash hands thoroughly with soap and warm water for at least 20 seconds before handling food, after using the bathroom, and after touching raw meat."
  },
  {
    title: "Temperature Control",
    content: "Keep hot foods above 60°C and cold foods below 5°C. Use a food thermometer to check temperatures regularly."
  },
  {
    title: "Cross-Contamination Prevention",
    content: "Use separate cutting boards and utensils for raw meat and ready-to-eat foods. Clean and sanitize surfaces after each use."
  },
  {
    title: "Food Storage",
    content: "Store raw meat on the bottom shelf of the refrigerator to prevent drips onto other foods. Keep all food covered and labeled with dates."
  },
  {
    title: "Personal Hygiene",
    content: "Wear clean clothes and an apron when handling food. Keep hair tied back and covered. Avoid handling food when ill."
  },
  {
    title: "Cleaning Schedule",
    content: "Maintain a regular cleaning schedule for all equipment and surfaces. Use appropriate sanitizers and follow correct contact times."
  },
  {
    title: "Pest Control",
    content: "Keep all areas clean and free from food debris. Seal entry points and regularly inspect for signs of pest activity."
  },
  {
    title: "Waste Management",
    content: "Empty bins regularly and keep waste areas clean. Use covered bins and wash hands after handling waste."
  },
  {
    title: "Stock Rotation",
    content: "Follow the First-In-First-Out (FIFO) principle. Check and record expiry dates regularly. Remove expired items immediately."
  },
  {
    title: "Training and Documentation",
    content: "Ensure all staff are trained in food safety. Keep records of cleaning schedules, temperature checks, and training."
  }
];

const FoodSafetyPosts = () => {
  return (
    <ScrollArea className="h-[600px] w-full rounded-md border p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {foodSafetyPosts.map((post, index) => (
          <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-primary">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {post.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default FoodSafetyPosts;