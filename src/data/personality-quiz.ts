export type PersonalityTrait = 'dominant' | 'social' | 'curious' | 'cautious' | 'agile' | 'peaceful'

export interface PersonalityTraitScore {
  key: PersonalityTrait
  value: number
}

export interface PersonalityOption {
  text: string
  textRu: string
  textEs: string
  textDe: string
  textFr: string
  textIt: string
  traits: PersonalityTraitScore[]
}

export interface PersonalityQuestion {
  id: string
  question: string
  questionRu: string
  questionEs: string
  questionDe: string
  questionFr: string
  questionIt: string
  options: PersonalityOption[]
}

export interface DinosaurPersonality {
  id: string
  name: string
  nameRu: string
  nameEs: string
  nameDe: string
  nameFr: string
  nameIt: string
  emoji: string
  imageSlug: string
  traits: Record<PersonalityTrait, number>
  title: string
  titleRu: string
  titleEs: string
  titleDe: string
  titleFr: string
  titleIt: string
  description: string
  descriptionRu: string
  descriptionEs: string
  descriptionDe: string
  descriptionFr: string
  descriptionIt: string
  funFact: string
  funFactRu: string
  funFactEs: string
  funFactDe: string
  funFactFr: string
  funFactIt: string
  colorClass: string
}

export const personalityQuestions: PersonalityQuestion[] = [
  {
    id: 'q1',
    question: 'How do you prefer to spend your free time?',
    questionRu: 'Как ты предпочитаешь проводить свободное время?',
    questionEs: '¿Cómo prefieres pasar tu tiempo libre?',
    questionDe: 'Wie verbringst du am liebsten deine Freizeit?',
    questionFr: 'Comment préfères-tu passer ton temps libre ?',
    questionIt: 'Come preferisci trascorrere il tuo tempo libero?',
    options: [
      {
        text: 'Ruling the room — you love being in charge',
        textRu: 'Командовать — тебе нравится быть главным',
        textEs: 'Dominando la situación — te encanta estar a cargo',
        textDe: 'Das Ruder übernehmen — du liebst es, der Chef zu sein',
        textFr: 'Diriger la situation — tu aimes être aux commandes',
        textIt: 'Dominare la scena — ti piace essere al comando',
        traits: [{ key: 'dominant', value: 3 }, { key: 'social', value: 1 }],
      },
      {
        text: 'Exploring new places with friends',
        textRu: 'Исследовать новые места с друзьями',
        textEs: 'Explorar nuevos lugares con amigos',
        textDe: 'Neue Orte mit Freunden erkunden',
        textFr: 'Explorer de nouveaux endroits avec des amis',
        textIt: 'Esplorare nuovi posti con gli amici',
        traits: [{ key: 'curious', value: 2 }, { key: 'social', value: 2 }],
      },
      {
        text: 'Relaxing peacefully in nature',
        textRu: 'Спокойно отдыхать на природе',
        textEs: 'Relajarse tranquilamente en la naturaleza',
        textDe: 'Entspannt in der Natur erholen',
        textFr: 'Se détendre paisiblement dans la nature',
        textIt: 'Rilassarsi tranquillamente nella natura',
        traits: [{ key: 'peaceful', value: 3 }, { key: 'cautious', value: 1 }],
      },
      {
        text: 'Running, training, or pushing your limits',
        textRu: 'Бегать, тренироваться, преодолевать себя',
        textEs: 'Correr, entrenar o superar tus límites',
        textDe: 'Laufen, trainieren oder deine Grenzen überwinden',
        textFr: 'Courir, s\'entraîner ou te dépasser',
        textIt: 'Correre, allenarsi o superare i propri limiti',
        traits: [{ key: 'agile', value: 3 }, { key: 'dominant', value: 1 }],
      },
    ],
  },
  {
    id: 'q2',
    question: 'Someone challenges you directly. What do you do?',
    questionRu: 'Кто-то бросает тебе прямой вызов. Что ты делаешь?',
    questionEs: '¿Qué haces cuando alguien te desafía directamente?',
    questionDe: 'Jemand fordert dich direkt heraus. Was tust du?',
    questionFr: 'Quelqu\'un te défie directement. Que fais-tu ?',
    questionIt: 'Qualcuno ti sfida direttamente. Cosa fai?',
    options: [
      {
        text: 'Step up and face them — you never back down',
        textRu: 'Шагнуть вперёд и встретить вызов — ты никогда не отступаешь',
        textEs: 'Afrontar el desafío — nunca te echas atrás',
        textDe: 'Entgegentreten — du weichst niemals zurück',
        textFr: 'Faire face — tu ne recules jamais',
        textIt: 'Affrontarlo — non ti ritiri mai',
        traits: [{ key: 'dominant', value: 3 }],
      },
      {
        text: 'Team up with allies and outmaneuver them',
        textRu: 'Объединиться с союзниками и перехитрить их',
        textEs: 'Aliarte con otros y superarlos con astucia',
        textDe: 'Verbündete sammeln und sie überlisten',
        textFr: 'S\'allier et les déjouer',
        textIt: 'Fare squadra con gli alleati e aggirarli',
        traits: [{ key: 'social', value: 2 }, { key: 'agile', value: 1 }, { key: 'curious', value: 1 }],
      },
      {
        text: 'Stand your ground defensively — protect what matters',
        textRu: 'Держать оборону — защитить то, что важно',
        textEs: 'Defenderte firmemente — proteger lo que importa',
        textDe: 'Defensiv standhalten — das Wichtige schützen',
        textFr: 'Tenir bon défensivement — protéger ce qui compte',
        textIt: 'Tenerti sulla difensiva — proteggere ciò che conta',
        traits: [{ key: 'cautious', value: 2 }, { key: 'peaceful', value: 1 }],
      },
      {
        text: 'Use speed and wit to avoid the conflict entirely',
        textRu: 'Использовать скорость и сообразительность, чтобы избежать конфликта',
        textEs: 'Usar velocidad e inteligencia para evitar el conflicto',
        textDe: 'Schnelligkeit und Cleverness nutzen, um den Konflikt zu vermeiden',
        textFr: 'Utiliser la rapidité et l\'astuce pour éviter le conflit',
        textIt: 'Usare velocità e astuzia per evitare il conflitto',
        traits: [{ key: 'agile', value: 2 }, { key: 'curious', value: 1 }],
      },
    ],
  },
  {
    id: 'q3',
    question: 'What\'s your approach when facing a problem?',
    questionRu: 'Как ты подходишь к решению проблем?',
    questionEs: '¿Cuál es tu enfoque al enfrentar un problema?',
    questionDe: 'Wie gehst du an ein Problem heran?',
    questionFr: 'Quelle est ton approche face à un problème ?',
    questionIt: 'Qual è il tuo approccio di fronte a un problema?',
    options: [
      {
        text: 'Attack it head-on with sheer force',
        textRu: 'Атаковать его в лоб с полной силой',
        textEs: 'Atacarlo de frente con toda tu fuerza',
        textDe: 'Direkt und mit voller Kraft angreifen',
        textFr: 'L\'attaquer de front avec toute ta force',
        textIt: 'Affrontarlo di petto con tutta la forza',
        traits: [{ key: 'dominant', value: 3 }, { key: 'agile', value: 1 }],
      },
      {
        text: 'Research and plan carefully before acting',
        textRu: 'Тщательно исследовать и планировать перед действием',
        textEs: 'Investigar y planificar cuidadosamente antes de actuar',
        textDe: 'Sorgfältig recherchieren und planen, bevor du handelst',
        textFr: 'Rechercher et planifier soigneusement avant d\'agir',
        textIt: 'Ricercare e pianificare con cura prima di agire',
        traits: [{ key: 'curious', value: 3 }, { key: 'cautious', value: 1 }],
      },
      {
        text: 'Wait patiently for the right moment',
        textRu: 'Терпеливо ждать подходящего момента',
        textEs: 'Esperar pacientemente el momento adecuado',
        textDe: 'Geduldig auf den richtigen Moment warten',
        textFr: 'Attendre patiemment le bon moment',
        textIt: 'Aspettare pazientemente il momento giusto',
        traits: [{ key: 'peaceful', value: 2 }, { key: 'cautious', value: 2 }],
      },
      {
        text: 'Find a creative workaround nobody else would think of',
        textRu: 'Найти творческое решение, о котором никто не думал',
        textEs: 'Encontrar una solución creativa que nadie más consideraría',
        textDe: 'Eine kreative Lösung finden, auf die niemand sonst käme',
        textFr: 'Trouver une solution créative à laquelle personne d\'autre ne penserait',
        textIt: 'Trovare una soluzione creativa a cui nessun altro penserebbe',
        traits: [{ key: 'agile', value: 2 }, { key: 'curious', value: 2 }],
      },
    ],
  },
  {
    id: 'q4',
    question: 'What kind of environment feels most like home?',
    questionRu: 'Какая обстановка ощущается как дом?',
    questionEs: '¿Qué tipo de entorno se siente más como tu hogar?',
    questionDe: 'Welche Umgebung fühlt sich am meisten wie Zuhause an?',
    questionFr: 'Quel environnement ressemble le plus à chez toi ?',
    questionIt: 'Quale ambiente ti fa sentire più a casa?',
    options: [
      {
        text: 'Open plains where you can see everything around you',
        textRu: 'Открытые равнины, где всё видно вокруг',
        textEs: 'Llanuras abiertas donde puedes ver todo a tu alrededor',
        textDe: 'Offene Ebenen, wo du alles um dich herum siehst',
        textFr: 'Des plaines ouvertes où tu peux tout voir autour de toi',
        textIt: 'Pianure aperte dove puoi vedere tutto intorno',
        traits: [{ key: 'dominant', value: 2 }, { key: 'cautious', value: 1 }],
      },
      {
        text: 'Dense forest full of life and mystery',
        textRu: 'Густой лес, полный жизни и тайн',
        textEs: 'Bosque denso lleno de vida y misterio',
        textDe: 'Dichter Wald voller Leben und Geheimnisse',
        textFr: 'Une forêt dense pleine de vie et de mystère',
        textIt: 'Una foresta densa piena di vita e mistero',
        traits: [{ key: 'curious', value: 2 }, { key: 'social', value: 1 }, { key: 'agile', value: 1 }],
      },
      {
        text: 'Lush valleys with plenty of food and calm water',
        textRu: 'Пышные долины с обилием еды и спокойной водой',
        textEs: 'Valles frondosos con abundante comida y aguas tranquilas',
        textDe: 'Üppige Täler mit viel Nahrung und ruhigem Wasser',
        textFr: 'Des vallées verdoyantes avec beaucoup de nourriture et des eaux calmes',
        textIt: 'Valli rigogliose con abbondante cibo e acque tranquille',
        traits: [{ key: 'peaceful', value: 3 }, { key: 'social', value: 1 }],
      },
      {
        text: 'High cliffs and open skies — the higher the better',
        textRu: 'Высокие скалы и открытое небо — чем выше, тем лучше',
        textEs: 'Acantilados altos y cielos abiertos — cuanto más alto, mejor',
        textDe: 'Hohe Klippen und offene Himmel — je höher desto besser',
        textFr: 'Des falaises élevées et des cieux ouverts — plus c\'est haut, mieux c\'est',
        textIt: 'Scogliere alte e cieli aperti — più in alto meglio è',
        traits: [{ key: 'agile', value: 3 }, { key: 'curious', value: 1 }],
      },
    ],
  },
  {
    id: 'q5',
    question: 'How do you act in a group?',
    questionRu: 'Как ты ведёшь себя в группе?',
    questionEs: '¿Cómo te comportas en un grupo?',
    questionDe: 'Wie verhältst du dich in einer Gruppe?',
    questionFr: 'Comment te comportes-tu en groupe ?',
    questionIt: 'Come ti comporti in un gruppo?',
    options: [
      {
        text: 'You\'re the leader — everyone follows your call',
        textRu: 'Ты лидер — все следуют твоим решениям',
        textEs: 'Eres el líder — todos siguen tu decisión',
        textDe: 'Du bist der Anführer — alle folgen deinen Entscheidungen',
        textFr: 'Tu es le leader — tout le monde suit tes décisions',
        textIt: 'Sei il leader — tutti seguono le tue decisioni',
        traits: [{ key: 'dominant', value: 3 }, { key: 'social', value: 1 }],
      },
      {
        text: 'An equal team player who keeps spirits high',
        textRu: 'Равноправный командный игрок, поднимающий настроение',
        textEs: 'Un jugador de equipo que mantiene el ánimo alto',
        textDe: 'Ein gleichberechtigter Mitspieler, der die Stimmung hebt',
        textFr: 'Un joueur d\'équipe qui maintient le moral',
        textIt: 'Un giocatore di squadra che mantiene alto il morale',
        traits: [{ key: 'social', value: 3 }, { key: 'peaceful', value: 1 }],
      },
      {
        text: 'The quiet observer who speaks up only when it counts',
        textRu: 'Тихий наблюдатель, который высказывается только когда важно',
        textEs: 'El observador silencioso que habla solo cuando importa',
        textDe: 'Der stille Beobachter, der sich nur äußert, wenn es darauf ankommt',
        textFr: 'L\'observateur silencieux qui prend la parole quand c\'est important',
        textIt: 'L\'osservatore silenzioso che parla solo quando conta',
        traits: [{ key: 'cautious', value: 2 }, { key: 'curious', value: 2 }],
      },
      {
        text: 'You prefer to work alone — groups slow you down',
        textRu: 'Предпочитаешь работать в одиночку — группы замедляют тебя',
        textEs: 'Prefieres trabajar solo — los grupos te ralentizan',
        textDe: 'Du arbeitest lieber allein — Gruppen verlangsamen dich',
        textFr: 'Tu préfères travailler seul — les groupes te ralentissent',
        textIt: 'Preferisci lavorare da solo — i gruppi ti rallentano',
        traits: [{ key: 'agile', value: 2 }, { key: 'dominant', value: 1 }],
      },
    ],
  },
  {
    id: 'q6',
    question: 'What\'s your biggest strength?',
    questionRu: 'В чём твоя главная сила?',
    questionEs: '¿Cuál es tu mayor fortaleza?',
    questionDe: 'Was ist deine größte Stärke?',
    questionFr: 'Quelle est ta plus grande force ?',
    questionIt: 'Qual è il tuo punto di forza principale?',
    options: [
      {
        text: 'Raw power — when you strike, everyone feels it',
        textRu: 'Грубая сила — когда ты наносишь удар, все это чувствуют',
        textEs: 'Fuerza bruta — cuando golpeas, todos lo sienten',
        textDe: 'Rohe Kraft — wenn du zuschlägst, spürt es jeder',
        textFr: 'Force brute — quand tu frappes, tout le monde le ressent',
        textIt: 'Forza bruta — quando colpisci, tutti lo sentono',
        traits: [{ key: 'dominant', value: 3 }],
      },
      {
        text: 'Intelligence and adaptability',
        textRu: 'Интеллект и умение приспосабливаться',
        textEs: 'Inteligencia y adaptabilidad',
        textDe: 'Intelligenz und Anpassungsfähigkeit',
        textFr: 'Intelligence et adaptabilité',
        textIt: 'Intelligenza e adattabilità',
        traits: [{ key: 'curious', value: 2 }, { key: 'agile', value: 1 }, { key: 'social', value: 1 }],
      },
      {
        text: 'Endurance and unshakeable calm',
        textRu: 'Выносливость и несокрушимое спокойствие',
        textEs: 'Resistencia y calma inquebrantable',
        textDe: 'Ausdauer und unerschütterliche Ruhe',
        textFr: 'Endurance et calme inébranlable',
        textIt: 'Resistenza e calma inattaccabile',
        traits: [{ key: 'peaceful', value: 2 }, { key: 'cautious', value: 2 }],
      },
      {
        text: 'Speed — you\'re always three steps ahead',
        textRu: 'Скорость — ты всегда на три шага впереди',
        textEs: 'Velocidad — siempre vas tres pasos adelante',
        textDe: 'Geschwindigkeit — du bist immer drei Schritte voraus',
        textFr: 'Vitesse — tu es toujours trois pas en avance',
        textIt: 'Velocità — sei sempre tre passi avanti',
        traits: [{ key: 'agile', value: 3 }],
      },
    ],
  },
  {
    id: 'q7',
    question: 'How do you react when danger is near?',
    questionRu: 'Как ты реагируешь, когда опасность близко?',
    questionEs: '¿Cómo reaccionas cuando el peligro está cerca?',
    questionDe: 'Wie reagierst du, wenn Gefahr naht?',
    questionFr: 'Comment réagis-tu quand le danger est proche ?',
    questionIt: 'Come reagisci quando il pericolo è vicino?',
    options: [
      {
        text: 'Charge straight at it — offense is the best defense',
        textRu: 'Бросаться прямо на него — нападение — лучшая защита',
        textEs: 'Lanzarte directamente — el ataque es la mejor defensa',
        textDe: 'Direkt darauf losgehen — Angriff ist die beste Verteidigung',
        textFr: 'Foncer dessus — l\'attaque est la meilleure défense',
        textIt: 'Lanciarti direttamente — l\'attacco è la migliore difesa',
        traits: [{ key: 'dominant', value: 3 }],
      },
      {
        text: 'Alert your group and create a coordinated response',
        textRu: 'Оповестить группу и организовать скоординированный ответ',
        textEs: 'Alertar a tu grupo y crear una respuesta coordinada',
        textDe: 'Deine Gruppe warnen und eine koordinierte Reaktion einleiten',
        textFr: 'Alerter ton groupe et organiser une réponse coordonnée',
        textIt: 'Avvisare il gruppo e creare una risposta coordinata',
        traits: [{ key: 'social', value: 3 }, { key: 'cautious', value: 1 }],
      },
      {
        text: 'Hunker down and wait until it passes',
        textRu: 'Затаиться и ждать, пока опасность минует',
        textEs: 'Agacharte y esperar a que pase',
        textDe: 'Dich ducken und warten, bis es vorbeigeht',
        textFr: 'Te blottir et attendre que ça passe',
        textIt: 'Abbassarti e aspettare che passi',
        traits: [{ key: 'cautious', value: 2 }, { key: 'peaceful', value: 2 }],
      },
      {
        text: 'Disappear in an instant — nobody can catch you',
        textRu: 'Исчезнуть мгновенно — никто тебя не поймает',
        textEs: 'Desaparecer al instante — nadie puede atraparte',
        textDe: 'Im Nu verschwinden — niemand kann dich fangen',
        textFr: 'Disparaître en un instant — personne ne peut t\'attraper',
        textIt: 'Sparire in un istante — nessuno può prenderti',
        traits: [{ key: 'agile', value: 3 }],
      },
    ],
  },
  {
    id: 'q8',
    question: 'What motivates you most in life?',
    questionRu: 'Что тебя больше всего мотивирует в жизни?',
    questionEs: '¿Qué te motiva más en la vida?',
    questionDe: 'Was motiviert dich im Leben am meisten?',
    questionFr: 'Qu\'est-ce qui te motive le plus dans la vie ?',
    questionIt: 'Cosa ti motiva di più nella vita?',
    options: [
      {
        text: 'Conquest and achievement — being the best',
        textRu: 'Победа и достижения — быть лучшим',
        textEs: 'Conquista y logros — ser el mejor',
        textDe: 'Eroberung und Erfolg — der Beste zu sein',
        textFr: 'La conquête et les accomplissements — être le meilleur',
        textIt: 'Conquista e traguardi — essere il migliore',
        traits: [{ key: 'dominant', value: 3 }],
      },
      {
        text: 'Deep bonds — the people you care about',
        textRu: 'Крепкие связи — люди, которые тебе важны',
        textEs: 'Vínculos profundos — las personas que te importan',
        textDe: 'Tiefe Bindungen — die Menschen, die dir wichtig sind',
        textFr: 'Des liens profonds — les gens qui te sont chers',
        textIt: 'Legami profondi — le persone a cui tieni',
        traits: [{ key: 'social', value: 3 }, { key: 'peaceful', value: 1 }],
      },
      {
        text: 'Discovery — learning something new every day',
        textRu: 'Открытия — каждый день узнавать что-то новое',
        textEs: 'Descubrimiento — aprender algo nuevo cada día',
        textDe: 'Entdeckung — jeden Tag etwas Neues lernen',
        textFr: 'La découverte — apprendre quelque chose de nouveau chaque jour',
        textIt: 'Scoperta — imparare qualcosa di nuovo ogni giorno',
        traits: [{ key: 'curious', value: 3 }, { key: 'agile', value: 1 }],
      },
      {
        text: 'Peace and security — knowing everything is safe',
        textRu: 'Мир и безопасность — знать, что всё в порядке',
        textEs: 'Paz y seguridad — saber que todo está bien',
        textDe: 'Frieden und Sicherheit — wissen, dass alles in Ordnung ist',
        textFr: 'La paix et la sécurité — savoir que tout va bien',
        textIt: 'Pace e sicurezza — sapere che tutto è al sicuro',
        traits: [{ key: 'peaceful', value: 2 }, { key: 'cautious', value: 2 }],
      },
    ],
  },
  {
    id: 'q9',
    question: 'Your friends would describe you as...',
    questionRu: 'Твои друзья описали бы тебя как...',
    questionEs: 'Tus amigos te describirían como...',
    questionDe: 'Deine Freunde würden dich beschreiben als...',
    questionFr: 'Tes amis te décriraient comme...',
    questionIt: 'I tuoi amici ti descriverebbero come...',
    options: [
      {
        text: 'Fierce and unstoppable',
        textRu: 'Неистовый и неудержимый',
        textEs: 'Feroz e imparable',
        textDe: 'Wild und unaufhaltsam',
        textFr: 'Féroce et inarrêtable',
        textIt: 'Feroce e inarrestabile',
        traits: [{ key: 'dominant', value: 2 }, { key: 'agile', value: 1 }],
      },
      {
        text: 'Warm, loyal, and always there for others',
        textRu: 'Тёплый, преданный и всегда рядом с другими',
        textEs: 'Cálido, leal y siempre disponible para los demás',
        textDe: 'Warmherzig, loyal und immer für andere da',
        textFr: 'Chaleureux, loyal et toujours là pour les autres',
        textIt: 'Caldo, leale e sempre disponibile per gli altri',
        traits: [{ key: 'social', value: 3 }, { key: 'peaceful', value: 1 }],
      },
      {
        text: 'Calm, steady, and impossible to rattle',
        textRu: 'Спокойный, стабильный и непоколебимый',
        textEs: 'Tranquilo, estable e imposible de alterar',
        textDe: 'Ruhig, beständig und nicht aus der Ruhe zu bringen',
        textFr: 'Calme, stable et impossible à déstabiliser',
        textIt: 'Calmo, stabile e impossibile da scuotere',
        traits: [{ key: 'peaceful', value: 2 }, { key: 'cautious', value: 2 }],
      },
      {
        text: 'Quick, clever, and always surprising',
        textRu: 'Быстрый, умный и всегда удивляющий',
        textEs: 'Rápido, inteligente y siempre sorprendente',
        textDe: 'Schnell, clever und immer für Überraschungen gut',
        textFr: 'Rapide, intelligent et toujours surprenant',
        textIt: 'Veloce, intelligente e sempre sorprendente',
        traits: [{ key: 'agile', value: 2 }, { key: 'curious', value: 2 }],
      },
    ],
  },
  {
    id: 'q10',
    question: 'What\'s your ideal way to end the day?',
    questionRu: 'Каким для тебя был бы идеальный конец дня?',
    questionEs: '¿Cuál es tu manera ideal de terminar el día?',
    questionDe: 'Was ist dein idealer Tagesabschluss?',
    questionFr: 'Quelle est ta façon idéale de terminer la journée ?',
    questionIt: 'Qual è il tuo modo ideale per concludere la giornata?',
    options: [
      {
        text: 'Celebrating a victory — you conquered something today',
        textRu: 'Праздновать победу — ты сегодня чего-то достиг',
        textEs: 'Celebrando una victoria — hoy conquistaste algo',
        textDe: 'Einen Sieg feiern — du hast heute etwas erreicht',
        textFr: 'Célébrer une victoire — tu as conquis quelque chose aujourd\'hui',
        textIt: 'Celebrare una vittoria — oggi hai conquistato qualcosa',
        traits: [{ key: 'dominant', value: 3 }],
      },
      {
        text: 'Sharing a meal or stories with the people you love',
        textRu: 'Делиться едой или историями с теми, кого любишь',
        textEs: 'Compartir una comida o historias con las personas que amas',
        textDe: 'Eine Mahlzeit oder Geschichten mit geliebten Menschen teilen',
        textFr: 'Partager un repas ou des histoires avec les personnes que tu aimes',
        textIt: 'Condividere un pasto o storie con le persone che ami',
        traits: [{ key: 'social', value: 3 }, { key: 'peaceful', value: 1 }],
      },
      {
        text: 'Reflecting quietly on everything you observed',
        textRu: 'Тихо размышлять обо всём, что ты наблюдал',
        textEs: 'Reflexionando tranquilamente sobre todo lo que observaste',
        textDe: 'Still über alles nachdenken, was du beobachtet hast',
        textFr: 'Réfléchir tranquillement à tout ce que tu as observé',
        textIt: 'Riflettere tranquillamente su tutto ciò che hai osservato',
        traits: [{ key: 'curious', value: 2 }, { key: 'cautious', value: 1 }, { key: 'peaceful', value: 1 }],
      },
      {
        text: 'Planning tomorrow\'s adventure',
        textRu: 'Планировать завтрашнее приключение',
        textEs: 'Planeando la aventura de mañana',
        textDe: 'Das nächste Abenteuer für morgen planen',
        textFr: 'Planifier l\'aventure de demain',
        textIt: 'Pianificare l\'avventura di domani',
        traits: [{ key: 'agile', value: 2 }, { key: 'curious', value: 2 }],
      },
    ],
  },
]

export const dinosaurPersonalities: DinosaurPersonality[] = [
  {
    id: 'trex',
    name: 'T-Rex',
    nameRu: 'Тираннозавр Рекс',
    nameEs: 'Tiranosaurio Rex',
    nameDe: 'Tyrannosaurus Rex',
    nameFr: 'Tyrannosaure Rex',
    nameIt: 'Tirannosauro Rex',
    emoji: '🦖',
    imageSlug: 'tyrannosaurus-rex',
    traits: { dominant: 10, social: 2, curious: 3, cautious: 1, agile: 4, peaceful: 1 },
    title: 'The Apex Predator',
    titleRu: 'Верховный хищник',
    titleEs: 'El Depredador Apex',
    titleDe: 'Der Spitzenräuber',
    titleFr: 'Le Prédateur Suprême',
    titleIt: 'Il Predatore Apex',
    description: 'You are bold, powerful, and born to lead. You don\'t wait for opportunities — you create them. Your presence commands respect, and you\'re not afraid to stand alone at the top.',
    descriptionRu: 'Ты смелый, могущественный и рождён, чтобы вести за собой. Ты не ждёшь возможностей — ты их создаёшь. Твоё присутствие вызывает уважение, и ты не боишься быть на вершине в одиночку.',
    descriptionEs: 'Eres audaz, poderoso y nacido para liderar. No esperas las oportunidades — las creas. Tu presencia exige respeto y no tienes miedo de estar solo en la cima.',
    descriptionDe: 'Du bist kühn, mächtig und zum Anführen geboren. Du wartest nicht auf Chancen — du schaffst sie. Deine Anwesenheit gebietet Respekt, und du scheust dich nicht, allein an der Spitze zu stehen.',
    descriptionFr: 'Tu es audacieux, puissant et né pour diriger. Tu n\'attends pas les opportunités — tu les crées. Ta présence impose le respect, et tu n\'as pas peur de te retrouver seul au sommet.',
    descriptionIt: 'Sei audace, potente e nato per guidare. Non aspetti le opportunità — le crei. La tua presenza impone rispetto e non hai paura di stare da solo in cima.',
    funFact: 'T-Rex had a bite force of about 57,000 newtons — strong enough to crush bone like crackers.',
    funFactRu: 'Сила укуса тираннозавра составляла около 57 000 ньютонов — достаточно, чтобы раздробить кость как крекер.',
    funFactEs: 'El T-Rex tenía una fuerza de mordida de unos 57.000 newtons — suficiente para triturar huesos como galletas.',
    funFactDe: 'Der T-Rex hatte eine Beißkraft von etwa 57.000 Newton — stark genug, um Knochen wie Cracker zu zerquetschen.',
    funFactFr: 'Le T-Rex avait une force de morsure d\'environ 57 000 newtons — assez forte pour broyer des os comme des biscuits.',
    funFactIt: 'Il T-Rex aveva una forza di morso di circa 57.000 newton — abbastanza da schiacciare le ossa come cracker.',
    colorClass: 'from-red-600 to-orange-700',
  },
  {
    id: 'velociraptor',
    name: 'Velociraptor',
    nameRu: 'Велоцираптор',
    nameEs: 'Velociraptor',
    nameDe: 'Velociraptor',
    nameFr: 'Vélociraptor',
    nameIt: 'Velociraptor',
    emoji: '🦕',
    imageSlug: 'velociraptor',
    traits: { dominant: 4, social: 5, curious: 7, cautious: 3, agile: 9, peaceful: 2 },
    title: 'The Cunning Strategist',
    titleRu: 'Хитрый стратег',
    titleEs: 'El Estratega Astuto',
    titleDe: 'Der Clevere Stratege',
    titleFr: 'Le Stratège Rusé',
    titleIt: 'Lo Stratega Astuto',
    description: 'You are fast, smart, and always thinking two moves ahead. You thrive in dynamic situations and love solving puzzles others find impossible. Working with a tight, trusted crew brings out your best.',
    descriptionRu: 'Ты быстрый, умный и всегда думаешь на два хода вперёд. Ты процветаешь в динамичных ситуациях и любишь решать задачи, которые другим кажутся невозможными. Работа с небольшой, надёжной командой раскрывает твой лучший потенциал.',
    descriptionEs: 'Eres rápido, inteligente y siempre piensas dos movimientos adelante. Prosperas en situaciones dinámicas y te encanta resolver problemas que otros encuentran imposibles. Trabajar con un equipo pequeño y de confianza saca lo mejor de ti.',
    descriptionDe: 'Du bist schnell, klug und denkst immer zwei Züge voraus. Du gedeihtst in dynamischen Situationen und liebst es, Rätsel zu lösen, die andere unmöglich finden. Mit einem kleinen, vertrauenswürdigen Team holst du das Beste aus dir heraus.',
    descriptionFr: 'Tu es rapide, intelligent et tu penses toujours deux coups en avance. Tu t\'épanouis dans des situations dynamiques et tu aimes résoudre des problèmes que les autres trouvent impossibles. Travailler avec une équipe petite et de confiance fait ressortir le meilleur de toi.',
    descriptionIt: 'Sei veloce, intelligente e pensi sempre due mosse avanti. Prosperi in situazioni dinamiche e ami risolvere problemi che gli altri trovano impossibili. Lavorare con un gruppo ristretto e fidato tira fuori il meglio di te.',
    funFact: 'Velociraptors were actually about the size of a turkey and likely had feathers — far smaller than the movies show!',
    funFactRu: 'Велоцирапторы были размером примерно с индейку и, вероятно, имели перья — намного меньше, чем показывают в кино!',
    funFactEs: '¡Los velociraptores eran en realidad del tamaño de un pavo y probablemente tenían plumas — mucho más pequeños de lo que muestran las películas!',
    funFactDe: 'Velociraptoren waren tatsächlich etwa so groß wie ein Truthahn und hatten wahrscheinlich Federn — viel kleiner als im Film gezeigt!',
    funFactFr: 'Les vélociapteurs étaient en réalité de la taille d\'une dinde et avaient probablement des plumes — bien plus petits que dans les films !',
    funFactIt: 'I velociraptor erano in realtà delle dimensioni di un tacchino e probabilmente avevano piume — molto più piccoli di come vengono mostrati nei film!',
    colorClass: 'from-teal-500 to-cyan-700',
  },
  {
    id: 'triceratops',
    name: 'Triceratops',
    nameRu: 'Трицератопс',
    nameEs: 'Triceratops',
    nameDe: 'Triceratops',
    nameFr: 'Tricératops',
    nameIt: 'Triceratopo',
    emoji: '🐊',
    imageSlug: 'triceratops',
    traits: { dominant: 5, social: 6, curious: 4, cautious: 7, agile: 3, peaceful: 5 },
    title: 'The Steadfast Protector',
    titleRu: 'Непоколебимый защитник',
    titleEs: 'El Protector Inquebrantable',
    titleDe: 'Der Standfeste Beschützer',
    titleFr: 'Le Protecteur Inébranlable',
    titleIt: 'Il Protettore Irremovibile',
    description: 'You are fiercely loyal, deeply principled, and always ready to defend what you love. You don\'t pick fights, but you never run from them either. Your friends know they can count on you no matter what.',
    descriptionRu: 'Ты безгранично преданный, принципиальный и всегда готов защитить то, что любишь. Ты не ищешь ссоры, но и никогда от них не убегаешь. Твои друзья знают, что могут на тебя рассчитывать при любых обстоятельствах.',
    descriptionEs: 'Eres ferozmente leal, profundamente íntegro y siempre listo para defender lo que amas. No buscas peleas, pero tampoco huyes de ellas. Tus amigos saben que pueden contar contigo pase lo que pase.',
    descriptionDe: 'Du bist zutiefst loyal, prinzipientreu und immer bereit, das zu verteidigen, was du liebst. Du suchst keine Streitigkeiten, läufst aber auch nicht vor ihnen davon. Deine Freunde wissen, dass sie sich immer auf dich verlassen können.',
    descriptionFr: 'Tu es farouchement loyal, profondément intègre et toujours prêt à défendre ce que tu aimes. Tu ne cherches pas les ennuis, mais tu ne les fuis pas non plus. Tes amis savent qu\'ils peuvent compter sur toi quoi qu\'il arrive.',
    descriptionIt: 'Sei ferocemente leale, profondamente onesto e sempre pronto a difendere ciò che ami. Non cerchi guai, ma non li fuggi nemmeno. I tuoi amici sanno che possono contare su di te in qualsiasi situazione.',
    funFact: 'Triceratops had one of the largest skulls of any land animal ever — up to a third of its entire body length!',
    funFactRu: 'Трицератопс имел один из самых больших черепов среди всех наземных животных — до трети длины всего тела!',
    funFactEs: '¡El triceratops tenía uno de los cráneos más grandes de cualquier animal terrestre — hasta un tercio de la longitud total de su cuerpo!',
    funFactDe: 'Der Triceratops hatte einen der größten Schädel aller Landtiere — bis zu einem Drittel seiner gesamten Körperlänge!',
    funFactFr: 'Le tricératops avait l\'un des plus grands crânes de tout animal terrestre — jusqu\'à un tiers de sa longueur corporelle totale !',
    funFactIt: 'Il triceratopo aveva uno dei crani più grandi di qualsiasi animale terrestre — fino a un terzo della lunghezza totale del suo corpo!',
    colorClass: 'from-blue-500 to-indigo-700',
  },
  {
    id: 'brachiosaurus',
    name: 'Brachiosaurus',
    nameRu: 'Брахиозавр',
    nameEs: 'Braquiosaurio',
    nameDe: 'Brachiosaurus',
    nameFr: 'Brachiosaure',
    nameIt: 'Brachiosaurus',
    emoji: '🌿',
    imageSlug: 'brachiosaurus',
    traits: { dominant: 2, social: 8, curious: 5, cautious: 3, agile: 2, peaceful: 10 },
    title: 'The Gentle Giant',
    titleRu: 'Добродушный гигант',
    titleEs: 'El Gigante Gentil',
    titleDe: 'Der Sanfte Riese',
    titleFr: 'Le Géant Doux',
    titleIt: 'Il Gigante Gentile',
    description: 'You are calm, nurturing, and see the world from a higher vantage point — literally and figuratively. You value peace, community, and abundance. Your quiet confidence and warmth draw others naturally to you.',
    descriptionRu: 'Ты спокойный, заботливый и смотришь на мир с высоты — буквально и в переносном смысле. Ты ценишь мир, общество и изобилие. Твоя тихая уверенность и теплота естественно притягивают к тебе других.',
    descriptionEs: 'Eres tranquilo, protector y ves el mundo desde una perspectiva más elevada — literal y figurativamente. Valoras la paz, la comunidad y la abundancia. Tu confianza tranquila y tu calidez atraen naturalmente a otros hacia ti.',
    descriptionDe: 'Du bist ruhig, fürsorglich und siehst die Welt aus einer höheren Perspektive — buchstäblich und im übertragenen Sinne. Du schätzt Frieden, Gemeinschaft und Fülle. Deine stille Zuversicht und Wärme ziehen andere natürlich an.',
    descriptionFr: 'Tu es calme, bienveillant et tu vois le monde d\'un point de vue plus élevé — au sens propre comme au figuré. Tu accordes de la valeur à la paix, à la communauté et à l\'abondance. Ta confiance tranquille et ta chaleur attirent naturellement les autres vers toi.',
    descriptionIt: 'Sei calmo, premuroso e vedi il mondo da un punto di vista più elevato — letteralmente e figurativamente. Valorizzi la pace, la comunità e l\'abbondanza. La tua calma sicurezza e il tuo calore attirano naturalmente gli altri verso di te.',
    funFact: 'Brachiosaurus could reach vegetation 9 metres off the ground — equivalent to a three-story building!',
    funFactRu: 'Брахиозавр мог дотянуться до растительности на высоте 9 метров — как трёхэтажный дом!',
    funFactEs: '¡El brachiosaurus podía alcanzar vegetación a 9 metros del suelo — equivalente a un edificio de tres pisos!',
    funFactDe: 'Der Brachiosaurus konnte Vegetation in 9 Metern Höhe erreichen — das entspricht einem dreigeschossigen Gebäude!',
    funFactFr: 'Le brachiosaurus pouvait atteindre la végétation à 9 mètres de hauteur — l\'équivalent d\'un immeuble de trois étages !',
    funFactIt: 'Il brachiosaurus poteva raggiungere la vegetazione a 9 metri di altezza — l\'equivalente di un edificio di tre piani!',
    colorClass: 'from-green-500 to-emerald-700',
  },
  {
    id: 'ankylosaurus',
    name: 'Ankylosaurus',
    nameRu: 'Анкилозавр',
    nameEs: 'Anquilosaurio',
    nameDe: 'Ankylosaurus',
    nameFr: 'Ankylosaure',
    nameIt: 'Anchilosauro',
    emoji: '🛡️',
    imageSlug: 'ankylosaurus',
    traits: { dominant: 4, social: 4, curious: 3, cautious: 9, agile: 2, peaceful: 8 },
    title: 'The Armoured Philosopher',
    titleRu: 'Бронированный философ',
    titleEs: 'El Filósofo Blindado',
    titleDe: 'Der Gepanzerte Philosoph',
    titleFr: 'Le Philosophe Blindé',
    titleIt: 'Il Filosofo Corazzato',
    description: 'You are patient, grounded, and incredibly resilient. You prefer a peaceful life, but when pushed, no force in the world can move you. You think before you act, and your calm exterior hides a formidable inner strength.',
    descriptionRu: 'Ты терпеливый, приземлённый и невероятно стойкий. Ты предпочитаешь спокойную жизнь, но когда тебя подталкивают, никакая сила в мире не сможет тебя сдвинуть. Ты думаешь перед тем, как действовать, а твоё спокойное внешнее обличье скрывает внушительную внутреннюю силу.',
    descriptionEs: 'Eres paciente, arraigado e increíblemente resistente. Prefieres una vida tranquila, pero cuando te presionan, ninguna fuerza en el mundo puede moverte. Piensas antes de actuar, y tu exterior calmado esconde una formidable fuerza interior.',
    descriptionDe: 'Du bist geduldig, geerdet und unglaublich belastbar. Du bevorzugst ein friedliches Leben, aber wenn man dich drängt, kann keine Kraft der Welt dich bewegen. Du denkst nach, bevor du handelst, und dein ruhiges Äußeres verbirgt eine gewaltige innere Stärke.',
    descriptionFr: 'Tu es patient, ancré dans la réalité et incroyablement résilient. Tu préfères une vie paisible, mais quand on te pousse à bout, aucune force au monde ne peut te faire bouger. Tu réfléchis avant d\'agir, et ton extérieur calme cache une force intérieure redoutable.',
    descriptionIt: 'Sei paziente, radicato e incredibilmente resiliente. Preferisci una vita tranquilla, ma quando vieni spinto, nessuna forza al mondo può muoverti. Pensi prima di agire, e il tuo esteriore calmo nasconde una formidabile forza interiore.',
    funFact: 'The tail club of Ankylosaurus could swing hard enough to shatter the bones of a T-Rex.',
    funFactRu: 'Хвостовая дубина анкилозавра могла ударить с такой силой, что могла сломать кости тираннозавра.',
    funFactEs: 'El garrote de la cola del ankylosaurus podía golpear con suficiente fuerza para romper los huesos de un T-Rex.',
    funFactDe: 'Der Schwanzclub des Ankylosaurus konnte hart genug schwingen, um die Knochen eines T-Rex zu zertrümmern.',
    funFactFr: 'La masse caudale de l\'ankylosaurus pouvait frapper assez fort pour briser les os d\'un T-Rex.',
    funFactIt: 'La clava caudale dell\'ankylosaurus poteva colpire con abbastanza forza da spezzare le ossa di un T-Rex.',
    colorClass: 'from-yellow-600 to-amber-700',
  },
  {
    id: 'pteranodon',
    name: 'Pteranodon',
    nameRu: 'Птеранодон',
    nameEs: 'Pteranodon',
    nameDe: 'Pteranodon',
    nameFr: 'Ptéranodon',
    nameIt: 'Pteranodonte',
    emoji: '🦅',
    imageSlug: 'pteranodon',
    traits: { dominant: 3, social: 3, curious: 8, cautious: 4, agile: 9, peaceful: 3 },
    title: 'The Free-Spirited Explorer',
    titleRu: 'Свободолюбивый исследователь',
    titleEs: 'El Explorador de Espíritu Libre',
    titleDe: 'Der Freigeist-Entdecker',
    titleFr: 'L\'Explorateur Libre',
    titleIt: 'L\'Esploratore Libero',
    description: 'You soar above the ordinary, driven by curiosity and a love of freedom. You see the big picture when others are lost in details, and you\'re always the first to spot new opportunities on the horizon.',
    descriptionRu: 'Ты паришь выше обычного, движимый любопытством и любовью к свободе. Ты видишь общую картину, когда другие теряются в деталях, и всегда первым замечаешь новые возможности на горизонте.',
    descriptionEs: 'Vuelas por encima de lo ordinario, impulsado por la curiosidad y el amor a la libertad. Ves el panorama general cuando otros se pierden en los detalles, y siempre eres el primero en detectar nuevas oportunidades en el horizonte.',
    descriptionDe: 'Du schwebst über das Gewöhnliche hinaus, angetrieben von Neugier und Freiheitsliebe. Du siehst das große Bild, wenn andere sich in Details verlieren, und bist immer der Erste, der neue Möglichkeiten am Horizont entdeckt.',
    descriptionFr: 'Tu planes au-dessus de l\'ordinaire, poussé par la curiosité et l\'amour de la liberté. Tu vois la vue d\'ensemble quand les autres se perdent dans les détails, et tu es toujours le premier à repérer de nouvelles opportunités à l\'horizon.',
    descriptionIt: 'Planeggi al di sopra dell\'ordinario, spinto dalla curiosità e dall\'amore per la libertà. Vedi il quadro generale quando gli altri si perdono nei dettagli, e sei sempre il primo a individuare nuove opportunità all\'orizzonte.',
    funFact: 'Pteranodon had a wingspan of up to 7 metres but weighed less than 25 kg — lighter than a large dog!',
    funFactRu: 'Размах крыльев птеранодона достигал 7 метров, но весил он менее 25 кг — легче крупной собаки!',
    funFactEs: '¡El pteranodón tenía una envergadura de hasta 7 metros pero pesaba menos de 25 kg — más ligero que un perro grande!',
    funFactDe: 'Der Pteranodon hatte eine Flügelspannweite von bis zu 7 Metern, wog aber weniger als 25 kg — leichter als ein großer Hund!',
    funFactFr: 'Le ptéranodon avait une envergure allant jusqu\'à 7 mètres mais pesait moins de 25 kg — plus léger qu\'un grand chien !',
    funFactIt: 'Il pteranodonte aveva un\'apertura alare fino a 7 metri ma pesava meno di 25 kg — più leggero di un cane grande!',
    colorClass: 'from-violet-500 to-purple-700',
  },
]

export function computePersonalityResult(
  answers: number[][],
  questions: PersonalityQuestion[],
): DinosaurPersonality {
  const scores: Record<PersonalityTrait, number> = {
    dominant: 0,
    social: 0,
    curious: 0,
    cautious: 0,
    agile: 0,
    peaceful: 0,
  }

  answers.forEach((optionIndices, qIdx) => {
    const question = questions[qIdx]
    if (!question) return
    optionIndices.forEach(optIdx => {
      const option = question.options[optIdx]
      if (!option) return
      option.traits.forEach(t => {
        scores[t.key] += t.value
      })
    })
  })

  let best = dinosaurPersonalities[0]
  let bestDist = Infinity

  for (const dino of dinosaurPersonalities) {
    let dist = 0
    const traitKeys = Object.keys(scores) as PersonalityTrait[]
    for (const key of traitKeys) {
      const diff = (scores[key] ?? 0) - (dino.traits[key] ?? 0)
      dist += diff * diff
    }
    if (dist < bestDist) {
      bestDist = dist
      best = dino
    }
  }

  return best
}
