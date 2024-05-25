import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import invariant from "tiny-invariant";

import ReactPlayer from 'react-player/youtube'

import { Button } from '~/components/ui/button'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader
} from "~/components/ui/drawer"

import { getWorkout } from "../workouts-data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    invariant(params.workoutId, "Ожидается параметр workoutId");
    const workout = await getWorkout(params.workoutId);
    if (!workout) {
        throw new Response("Workout Not Found", { status: 404 });
    }
    return json({ workout });
};

export default function Workout() {

    const { workout } = useLoaderData<typeof loader>();
    const [open, setOpen] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');

    const showExerciseVideo = (videoUrl: string) => {
        setVideoUrl(videoUrl);
        setOpen(true)
    }

    return (
        <div className="bg-white dark:bg-gray-950">
            <div className="px-3 py-4">
                <h1 className="text-xl font-black leading-none">{workout.name}</h1>
                <div className="mt-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="fill-gray-400 w-5 h-5">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                    </svg>
                    <div className="ms-1 text-sm text-gray-500 font-medium">{workout.runtime}</div>
                </div>
                <div className="mt-4 mb-5 p-4 bg-slate-100 rounded-lg">
                    <h2 className="text-lg font-bold leading-none text-gray-700">Задание</h2>
                    {/* <p className="my-2 text-sm text-gray-500 leading-tight">{workout.taskDesc}</p> */}
                    { workout.executionType === 'rounds'
                        ? <p className="text-sm text-gray-500">{workout.setsNum} круга по {workout.taskItems.length} упражнения</p>
                        : <p className="text-sm text-gray-500">{workout.taskItems.length} упражнения по {workout.setsNum} подхода</p>
                    }
                    <div className="mt-4 flex flex-col gap-4">
                        {workout.taskItems.map((item, itemNum) => (
                            <div key={item.id}>
                                <div className="flex justify-start items-center">
                                    <div className="flex-none">
                                        {/* <Link to={`/exercises/${item.id}`}> */}
                                        <Link to="#" onClick={() => showExerciseVideo(item.videoUrl)}>
                                            <img className="object-cover h-14 w-14 rounded-lg cursor-pointer" src={item.thumbnail} />
                                        </Link>
                                    </div>
                                    <div className="ml-4 mr-3 flex-grow text-sm md:text-lg font-medium text-gray-700 leading-tight">
                                        {item.name}
                                    </div>
                                    <div className="text-sm md:text-lg text-right font-normal text-gray-500 leading-tight">
                                        {item.target} {item.targetUnit}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-1 w-6 h-6">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
                    </svg>
                    <Link to={`/workouts/${workout.id}/start`}>
                        Начать Тренировку
                    </Link>
                </Button>
            </div>

            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerContent>
                    <DrawerHeader>
                        <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                            <ReactPlayer
                                url={videoUrl}
                                style={{ position: 'absolute', top: 0, left: 0 }}
                                width='100%'
                                height='100%'
                                playing={true}
                                volume={0.8}
                                muted={true}
                            />
                        </div>
                    </DrawerHeader>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Отмена</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
  }