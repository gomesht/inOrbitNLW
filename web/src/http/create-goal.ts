interface createGoalRequest {
  title: string;
  desiredWeeklyFrequency: number;
}
export async function createGoals({
  title,
  desiredWeeklyFrequency,
}: createGoalRequest) {
  await fetch('http://localhost:3333/goals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      desiredWeeklyFrequency,
    }),
  });
}
