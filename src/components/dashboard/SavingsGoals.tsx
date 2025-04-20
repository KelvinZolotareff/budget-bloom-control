
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SavingsGoalProps {
  name: string;
  current: number;
  target: number;
  color: string;
}

function SavingsGoal({ name, current, target, color }: SavingsGoalProps) {
  const percentage = (current / target) * 100;
  
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{name}</span>
        <span className="text-sm font-medium">
          ${current.toLocaleString()} / ${target.toLocaleString()}
        </span>
      </div>
      <Progress 
        value={percentage} 
        className={`h-2 mb-2 [&>div]:${color}`}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{Math.round(percentage)}% completed</span>
        <span>${(target - current).toLocaleString()} to go</span>
      </div>
    </div>
  );
}

export function SavingsGoals() {
  const goals = [
    {
      name: "Emergency Fund",
      current: 8500,
      target: 15000,
      color: "bg-budget-purple"
    },
    {
      name: "Vacation",
      current: 2800,
      target: 5000,
      color: "bg-budget-blue"
    },
    {
      name: "New Car",
      current: 12000,
      target: 30000,
      color: "bg-budget-purple-dark"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Goals</CardTitle>
      </CardHeader>
      <CardContent>
        {goals.map((goal) => (
          <SavingsGoal
            key={goal.name}
            name={goal.name}
            current={goal.current}
            target={goal.target}
            color={goal.color}
          />
        ))}
      </CardContent>
    </Card>
  );
}
