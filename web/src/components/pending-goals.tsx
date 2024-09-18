import { Plus } from 'lucide-react';
import { OutlineButton } from './ui/outline-button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPendingGoals } from '../http/get-pending-goals';
import { createGoalsCompletion } from '../http/create-goal-completion';

export function PendingGoals() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
    staleTime: 6000,
  });
  if (!data) {
    return null;
  }

  async function handleCompleteGoal(goalId: string) {
    await createGoalsCompletion(goalId);
    queryClient.invalidateQueries({ queryKey: ['summary'] });
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] });
  }
  return (
    <div className="flex flex-wrap gap-3">
      {data.map((goal) => {
        return (
          <OutlineButton
            key={goal.id}
            disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <Plus /> {goal.title}
          </OutlineButton>
        );
      })}
    </div>
  );
}
