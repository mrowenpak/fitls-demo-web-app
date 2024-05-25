const demoWorkouts = [
    {
        "id": "w1",
        "type": "workout",
        "name": "Тренировка А",
        "difficulty": ["Легкий"],
        "equipment": ["Турник"],
        "bodyFocus": ["Верх тела"],
        "runtime": "20-30 минут",
        "taskDesc": "Выполнить круговую тренировку, с акцентом на верхнюю часть тела.",
        "taskItems": [
          {
            "id": "e1",
            "type": "exercise",
            "name": "Подтягивания прямым хватом",
            "thumbnail": "https://fiztema.app/wp-content/uploads/2022/11/podtyagivaniya-do-podborodka-e1668874703474-300x300.jpg",
            "videoUrl": "https://www.youtube.com/watch?v=jgFel4wZl3I",
            "target": "8-10",
            "targetUnit": "reps",
            "rest": "0",
            "restUnit": "sec"
          },
          {
            "id": "e2",
            "type": "exercise",
            "name": "Отжимания",
            "thumbnail": "https://fiztema.app/wp-content/uploads/2021/05/poluotzhimaniya-oblozhka-scaled-e1621929916264-300x300.jpg",
            "videoUrl": "https://www.youtube.com/watch?v=Ql8PKKsDE70",
            "target": "12-15",
            "targetUnit": "reps",
            "rest": "0",
            "restUnit": "sec"
          },
          {
            "id": "e5",
            "type": "exercise",
            "name": "Ситапы",
            "thumbnail": "https://fiztema.app/wp-content/uploads/2021/04/sitapy-e1701249976762-300x300.jpg",
            "videoUrl": "https://www.youtube.com/watch?v=f9Yi_74xF_c",
            "target": "20-25",
            "targetUnit": "reps",
            "rest": "0",
            "restUnit": "sec"
          },
          {
            "id": "e6",
            "type": "exercise",
            "name": "Планка на локтях",
            "thumbnail": "https://fiztema.app/wp-content/uploads/2021/04/planka-na-loktyah-oblozhka-scaled-e1622053306781-300x300.jpg",
            "videoUrl": "https://www.youtube.com/watch?v=ao5nY7lb088",
            "target": "30",
            "targetUnit": "sec",
            "rest": "0",
            "restUnit": "sec"
          },
        ],
        "executionType": "rounds",
        "setsNum": 3,
        "rest": "60-90",
        "restUnit": "sec"
    }
]

export async function getWorkouts() {
    return demoWorkouts;
}
export async function getWorkout(workoutId: string) {
    return demoWorkouts.find(({ id }) => id === workoutId);
}