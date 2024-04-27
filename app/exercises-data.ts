const exercises = [
    {
      "id": "e1",
      "type": "exercise",
      "name": "Подтягивания прямым хватом",
      "thumbnail": "https://fiztema.app/wp-content/uploads/2022/11/podtyagivaniya-do-podborodka-e1668874703474-300x300.jpg",
      "kinescopeVideoId": "umWVzR6FN7irUzvfAqBVxN",
      "desc": "Описание упражнения"
    },
    {
      "id": "e2",
      "type": "exercise",
      "name": "Отжимания",
      "thumbnail": "https://fiztema.app/wp-content/uploads/2021/05/poluotzhimaniya-oblozhka-scaled-e1621929916264-300x300.jpg",
      "kinescopeVideoId": "pvVd1gJrgPyCzW7F2qmxYo",
      "desc": "Описание упражнения"
    },
    {
      "id": "e3",
      "type": "exercise",
      "name": "Отжимания на брусьях",
      "thumbnail": "https://fiztema.app/wp-content/uploads/2021/03/otzhimaniya-na-brusyah-oblozhka-scaled-e1621880203501-300x300.jpg",
      "kinescopeVideoId": "iBa3XiSfiZm7jaeoyS2FjF",
      "desc": "Описание упражнения"
    },
    {
      "id": "e4",
      "type": "exercise",
      "name": "Приседания",
      "thumbnail": "https://fiztema.app/wp-content/uploads/2024/03/pulsiruyushhie-prisedaniya-e1710929859959-300x300.jpg",
      "kinescopeVideoId": "nmKoktBVAhjcqeJF4XxGxL",
      "desc": "Описание упражнения"
    },
    {
      "id": "e5",
      "type": "exercise",
      "name": "Ситапы",
      "thumbnail": "https://fiztema.app/wp-content/uploads/2021/04/sitapy-e1701249976762-300x300.jpg",
      "kinescopeVideoId": "doTGB1WQeJijv1sZSPkhxq",
      "desc": "Описание упражнения"
    },
    {
      "id": "e6",
      "type": "exercise",
      "name": "Планка на локтях",
      "thumbnail": "https://fiztema.app/wp-content/uploads/2021/04/planka-na-loktyah-oblozhka-scaled-e1622053306781-300x300.jpg",
      "kinescopeVideoId": "eaKUqXMJrfTVyEapzyJASR",
      "desc": "Описание упражнения"
    },
]

export async function getExercise(exerciseId: string) {
    return exercises.find(({ id }) => id === exerciseId);
}