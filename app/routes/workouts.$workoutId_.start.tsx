import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import {useEffect} from "react";

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "~/components/ui/drawer"


import { MainButton, useWebApp, useInitData } from '@vkruglikov/react-telegram-web-app';

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

    // delete after testing
    const WebApp = useWebApp();
    const [initDataUnsafe, initData] = useInitData();

    const fetchTest = async () => {
        try {
            const data = {
                _auth: initData
            }
            const response = await fetch('https://3196-188-32-34-191.ngrok-free.app/workout-сomplete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.log('Failed to fetch from host', error);
        }
    };

    const handleClick = () => {
        // @todo наверно нужна какая-то более "четкая" проверка, и может не здесь
        if (!initDataUnsafe!.query_id) {
            console.log('Telegram queryId is not defined');
            return;
        }

        fetchTest();

        WebApp.close()
    };

    // useEffect(() => {
    //     fetchTest();
    // }, []);


    return (
        <div className="bg-white dark:bg-gray-950 pb-14">
            <div className="px-3 py-4">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-0.5 w-6 h-6 fill-lime-500">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
                    </svg>
                    <h1 className="text-md font-medium leading-none text-gray-500">{workout.name}</h1>
                </div>
                <div className="mt-3 mb-5 p-4 bg-slate-100 rounded-lg">
                    <h2 className="text-lg font-bold leading-none text-gray-700">Задание</h2>
                    <div className="mt-4 flex flex-col gap-4">
                        {[...Array(workout.setsNum)].map((e, setNum) => (
                            <div className="flex flex-col gap-4" key={setNum+1}>
                                {workout.taskItems.map((item, itemNum) => (
                                    <div key={item.id}>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-none">
                                                <Link to={`/exercises/${item.id}`}>
                                                    <img className="object-cover h-14 w-14 rounded-lg cursor-pointer" src={item.thumbnail} />
                                                </Link>
                                            </div>
                                            <div className="flex-auto flex-col">
                                                <div className="text-sm md:text-xl font-medium text-gray-700 leading-tight">{item.name}</div>
                                                <div className="text-sm md:text-lg font-normal text-gray-500 leading-tight">{item.target + ' ' + item.targetUnit}</div>
                                            </div>
                                            <div className="ml-auto">
                                                <Input type="number" inputMode="numeric" pattern="[0-9]*" className="w-10 md:w-12 h-10 md:h-12 p-1 bg-white text-base md:text-lg font-bold italic text-green-600 text-center"/>
                                            </div>
                                        </div>
                                        {itemNum < (workout.taskItems.length-1) && (
                                            <div className="mt-4 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="text-gray-500 w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                                <div className="ms-1 text-sm text-gray-500 font-medium">Отдых {item.rest} {item.restUnit}</div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {setNum < (workout.setsNum-1) && (
                                <div className="my-4 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="text-gray-500 w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    <div className="ms-1 text-base text-gray-500 font-medium">Отдых {workout.rest} {workout.restUnit}</div>
                                </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <Drawer>
                    <DrawerTrigger asChild>
                        <div className="flex justify-center">
                        <Button>Закончить тренировку</Button>
                        </div>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Отлично, ваши результаты:</DrawerTitle>
                            <DrawerDescription>
                                Какая-то статистика
                            </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                            <Button onClick={() => WebApp.close()}>Выполнено</Button>
                            <MainButton text="ТГ кнопки c ответом" onClick={handleClick} />
                            <DrawerClose asChild>
                                <Button variant="outline">Отмена</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>
        </div>
    );
  }