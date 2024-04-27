import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";

import KinescopeEmbed from '../components/kinescope-embed.js';
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import { Button } from "~/components/ui/button"

import { getExercise } from "../exercises-data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    invariant(params.exerciseId, "Ожидается параметр exerciseId");

    const exercise = await getExercise(params.exerciseId);
    if (!exercise) {
        throw new Response("Exercise Not Found", { status: 404 });
    }
    return json({ exercise });
};

export default function Exercise() {

    const { exercise } = useLoaderData<typeof loader>();
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <div className="bg-white">
            <KinescopeEmbed videoId={exercise.kinescopeVideoId} />

            <div className="flex mt-5 px-3 gap-3 items-center">
                <div className="flex-none">
                    <Button variant="outline" size="icon" onClick={goBack}>
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex-auto text-center">
                    <h1 className="text-lg md:text-xl font-black leading-none">{exercise.name}</h1>
                </div>
            </div>
        </div>
    );
  }