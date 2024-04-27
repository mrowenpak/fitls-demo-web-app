import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { ThemeToggle } from '~/components/theme-toggle'

import {getWorkouts} from "../workouts-data";

export const loader = async () => {
  const workouts = await getWorkouts();
  return json({ workouts });
};
export default function Index() {
  const { workouts } = useLoaderData<typeof loader>();

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-5">
      <ThemeToggle />
      <h1 className="text-3xl font-bold">Примеры Тренировок</h1>
      <div className="p-2">
        {workouts.length ? (
          <ul>
            {workouts.map((workout) => (
              <li key={workout.id}>
                <Link to={`workouts/${workout.id}`}>
                  {workout.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <i>Ничего нет</i>
          </p>
        )}
      </div>
    </div>
  )
}
