export interface ExerciseVariant {
  id: string;
  name: string;
  shortName?: string;
  videoUrl: string;
  guideUrl: string;
  muscles: string[];
}

export interface WorkoutExercise {
  id: string;
  number: number;
  title: string;
  setsReps: string;
  setsCount: number;
  category: string;
  variants: ExerciseVariant[];
}

export interface WorkoutRoutine {
  id: 'trening-a' | 'trening-b';
  code: string;
  title: string;
  exercises: WorkoutExercise[];
}

export const WORKOUT_ROUTINES: WorkoutRoutine[] = [
  {
    id: 'trening-a',
    code: 'A',
    title: 'Trening A',
    exercises: [
      {
        id: 'a-1',
        number: 1,
        title: 'Przysiad goblet z hantlem lub Wypychanie na suwnicy',
        setsReps: '4 × 8',
        setsCount: 4,
        category: 'Nogi i Pośladki',
        variants: [
          {
            id: 'a-1-goblet',
            name: 'Przysiad goblet z hantlem',
            shortName: 'Przysiad goblet',
            videoUrl: 'https://static.fabrykasily.pl/atlas-kobiet/video-goblet-squat.mp4',
            guideUrl: 'https://www.fabrykasily.pl/cwiczenia/dla-kobiet/na-nogi/goblet-squat-przysiad-z-kettlem-lub-hantelka',
            muscles: ['Czworogłowe ud', 'Pośladki']
          },
          {
            id: 'a-1-suwnica',
            name: 'Wypychanie na suwnicy',
            shortName: 'Wypychanie na suwnicy',
            videoUrl: 'https://static.fabrykasily.pl/atlas-kobiet/video-wypychanie-nogami-suwnicy.mp4',
            guideUrl: 'https://www.fabrykasily.pl/atlas-cwiczen/cwiczenia-dla-kobiet/nogi/wypychanie-nogami-na-suwnicy',
            muscles: ['Czworogłowe ud', 'Pośladki']
          }
        ]
      },
      {
        id: 'a-2',
        number: 2,
        title: 'Wyciskanie sztangielek lub sztangi na ławce poziomej',
        setsReps: '4 × 8',
        setsCount: 4,
        category: 'Klatka piersiowa',
        variants: [
          {
            id: 'a-2-hantle',
            name: 'Wyciskanie sztangielek na ławce płaskiej',
            shortName: 'Wyciskanie sztangielek',
            videoUrl: 'https://static.fabrykasily.pl/atlas-kobiet/video-wyciskanie-hantli-na-lawce-poziomej.mp4',
            guideUrl: 'https://www.fabrykasily.pl/cwiczenia/dla-kobiet/na-klatke-piersiowa/wyciskanie-sztangielek-na-lawce-plaskiej',
            muscles: ['Klatka piersiowa', 'Triceps', 'Przedni akton barków']
          },
          {
            id: 'a-2-sztanga',
            name: 'Wyciskanie sztangi na ławce poziomej',
            shortName: 'Wyciskanie sztangi',
            videoUrl: 'https://static.fabrykasily.pl/atlas-kobiet/video-wyciskanie-sztangi-na-lawce-plaskiej.mp4',
            guideUrl: 'https://www.fabrykasily.pl/atlas-cwiczen/cwiczenia-dla-kobiet/klatka-piersiowa/wyciskanie-sztangi-na-lawce-poziomej',
            muscles: ['Klatka piersiowa', 'Triceps']
          }
        ]
      },
      {
        id: 'a-3',
        number: 3,
        title: 'Wiosłowanie hantlą w klęku podpartym na ławeczce',
        setsReps: '4 × 8',
        setsCount: 4,
        category: 'Plecy',
        variants: [
          {
            id: 'a-3-wioslo',
            name: 'Wiosłowanie hantlą jednorącz',
            shortName: 'Wiosłowanie hantlą',
            videoUrl: 'https://static.fabrykasily.pl/atlas-kobiet/video-wioslowanie-hantla-w-kleku-podpartym-na-laweczce.mp4',
            guideUrl: 'https://www.fabrykasily.pl/cwiczenia/dla-kobiet/na-plecy/wioslowanie-hantla-w-kleku-podpartym-na-laweczce',
            muscles: ['Najszerszy grzbietu (plecy)', 'Czworoboczny', 'Biceps']
          }
        ]
      },
      {
        id: 'a-4',
        number: 4,
        title: 'Hip thrust hantlem lub sztangą',
        setsReps: '3 × 8',
        setsCount: 3,
        category: 'Nogi i Pośladki',
        variants: [
          {
            id: 'a-4-hantel',
            name: 'Hip thrust z hantlem',
            shortName: 'Z hantlem',
            videoUrl: 'https://static.fabrykasily.pl/atlas-kobiet/video-unoszenie-bioder-z-hantla-w-oparciu-o-laweczke.mp4',
            guideUrl: 'https://www.fabrykasily.pl/atlas-cwiczen/cwiczenia-dla-kobiet/nogi/unoszenie-bioder-z-hantla-w-oparciu-o-laweczke',
            muscles: ['Pośladki', 'Tył ud']
          },
          {
            id: 'a-4-sztanga',
            name: 'Hip thrust ze sztangą',
            shortName: 'Ze sztangą',
            videoUrl: 'https://static.fabrykasily.pl/atlas-kobiet/video-unoszenie-bioder-ze-sztanga-w-oparciu-o-laweczke.mp4',
            guideUrl: 'https://www.fabrykasily.pl/cwiczenia/dla-kobiet/na-nogi/unoszenie-bioder-ze-sztanga-w-oparciu-o-laweczke-plaska',
            muscles: ['Pośladki', 'Tył ud']
          }
        ]
      },
      {
        id: 'a-5',
        number: 5,
        title: 'Wznosy bokiem ze sztangielkami',
        setsReps: '3 × 10',
        setsCount: 3,
        category: 'Barki',
        variants: [
          {
            id: 'a-5-wznosy',
            name: 'Odwodzenie ramion w bok',
            shortName: 'Wznosy bokiem',
            videoUrl: 'https://static.fabrykasily.pl/atlas/odwodzenie_ramion_w_bok_ze_sztangielkami.mp4',
            guideUrl: 'https://www.fabrykasily.pl/cwiczenia/na-barki/odwodzenie-ramion-w-bok-ze-sztangielkami',
            muscles: ['Barki (boczny akton)']
          }
        ]
      },
      {
        id: 'a-6',
        number: 6,
        title: 'Przyciąganie kolan do klatki na stojaku lub Spięcia brzucha na maszynie',
        setsReps: '3 × 10',
        setsCount: 3,
        category: 'Brzuch',
        variants: [
          {
            id: 'a-6-stojak',
            name: 'Przyciąganie kolan do klatki na stojaku',
            shortName: 'Na stojaku',
            videoUrl: 'https://static.fabrykasily.pl/atlas-kobiet/k_przyciaganie_kolan_do_klatki_na_stojaku.mp4',
            guideUrl: 'https://www.fabrykasily.pl/atlas-cwiczen/cwiczenia-dla-kobiet/brzuch/przyciaganie-kolan-do-klatki-na-stojaku',
            muscles: ['Brzuch (dolna część)', 'Zginacze bioder']
          },
          {
            id: 'a-6-maszyna',
            name: 'Spięcia brzucha na maszynie (AB Crunch)',
            shortName: 'Na maszynie',
            videoUrl: 'https://static.fabrykasily.pl/atlas-kobiet/video-zginanie-tulowia-na-maszynie-siedzac-spiecia-brzucha-na-maszynie.mp4',
            guideUrl: 'https://www.fabrykasily.pl/cwiczenia/dla-kobiet/na-brzuch/zginanie-tulowia-na-maszynie-siedzac-spiecia-brzucha-na-maszynie',
            muscles: ['Brzuch (prosty)']
          }
        ]
      },
      {
        id: 'a-7',
        number: 7,
        title: 'Wspięcia na palcach siedząc na maszynie lub stojąc z hantlami',
        setsReps: '3 × 12',
        setsCount: 3,
        category: 'Łydki',
        variants: [
          {
            id: 'a-7-siedzac',
            name: 'Wspięcia na palcach siedząc na maszynie',
            shortName: 'Siedząc (maszyna)',
            videoUrl: 'https://static.fabrykasily.pl/atlas-kobiet/video-wspiecia-na-palce-na-maszynie-siedzac.mp4',
            guideUrl: 'https://www.fabrykasily.pl/cwiczenia/dla-kobiet/na-lydki/wspiecia-na-palcach-siedzac-na-maszynie',
            muscles: ['Łydki (płaszczkowaty)']
          },
          {
            id: 'a-7-stojac',
            name: 'Wspięcia na palcach stojąc z hantlami',
            shortName: 'Stojąc (hantle)',
            videoUrl: 'https://static.fabrykasily.pl/atlas-kobiet/video-wspiecia-na-palce-z-hantla.mp4',
            guideUrl: 'https://www.fabrykasily.pl/cwiczenia/dla-kobiet/na-lydki/wspiecia-na-palcach-stojac-z-hantlami',
            muscles: ['Łydki (brzuchaty)']
          }
        ]
      },
      {
        id: 'a-8',
        number: 8,
        title: 'Face pull (przyciąganie liny wyciągu do twarzy)',
        setsReps: '3 × 12',
        setsCount: 3,
        category: 'Barki i Plecy',
        variants: [
          {
            id: 'a-8-facepull',
            name: 'Face pull z wyciągu',
            shortName: 'Face pull',
            videoUrl: 'https://static.fabrykasily.pl/atlas-kobiet/video-przyciaganie-liny-z-wyciagu-do-twarzy-face-pull.mp4',
            guideUrl: 'https://www.fabrykasily.pl/atlas-cwiczen/cwiczenia-dla-kobiet/barki/przyciaganie-liny-z-wyciagu-do-twarzy-face-pull',
            muscles: ['Tył barków', 'Góra pleców', 'Rotatory']
          }
        ]
      }
    ]
  },
  {
    id: 'trening-b',
    code: 'B',
    title: 'Trening B',
    exercises: [
      {
        id: 'b-1',
        number: 1,
        title: 'Martwy ciąg rumuński z hantlami',
        setsReps: '4 × 8',
        setsCount: 4,
        category: 'Nogi i Pośladki',
        variants: [
          {
            id: 'b-1-rdl',
            name: 'Martwy ciąg na prostych nogach z hantlami',
            shortName: 'Martwy ciąg (RDL)',
            videoUrl: 'https://static.fabrykasily.pl/atlas/martwy_ciag_na_prostych_nogach_z_hantlami.mp4',
            guideUrl: 'https://www.fabrykasily.pl/cwiczenia/dwuglowe-uda/martwy-ciag-na-prostych-nogach',
            muscles: ['Tył ud (dwugłowe)', 'Pośladki', 'Prostowniki grzbietu']
          }
        ]
      },
      {
        id: 'b-2',
        number: 2,
        title: 'Wyciskanie hantli nad głowę stojąc',
        setsReps: '4 × 8',
        setsCount: 4,
        category: 'Barki',
        variants: [
          {
            id: 'b-2-ohp',
            name: 'Wyciskanie hantli nad głowę stojąc',
            shortName: 'Wyciskanie nad głowę',
            videoUrl: 'https://static.fabrykasily.pl/atlas/wyciskanie_hantli_nad_glowe_stojac.mp4',
            guideUrl: 'https://www.fabrykasily.pl/cwiczenia/na-barki/wyciskanie-hantli-nad-glowe-stojac-standing',
            muscles: ['Barki (przedni i boczny akton)', 'Triceps']
          }
        ]
      },
      {
        id: 'b-3',
        number: 3,
        title: 'Ściąganie drążka wyciągu górnego do klatki',
        setsReps: '4 × 8',
        setsCount: 4,
        category: 'Plecy',
        variants: [
          {
            id: 'b-3-drazek',
            name: 'Ściąganie drążka wyciągu górnego',
            shortName: 'Ściąganie wyciągu',
            videoUrl: 'https://static.fabrykasily.pl/atlas-kobiet/video-sciaganie-drazka-wyciagu-gornego-do-klatki-nachwytem-szeroko.mp4',
            guideUrl: 'https://www.fabrykasily.pl/atlas-cwiczen/cwiczenia-dla-kobiet/plecy/sciaganie-drazka-wyciagu-gornego-do-klatki-nachwytem-szeroko',
            muscles: ['Najszerszy grzbietu (plecy)', 'Biceps']
          }
        ]
      },
      {
        id: 'b-4',
        number: 4,
        title: 'Zakroki z hantlami lub bez',
        setsReps: '3 × 10',
        setsCount: 3,
        category: 'Nogi i Pośladki',
        variants: [
          {
            id: 'b-4-hantle',
            name: 'Zakroki w tył z hantlami',
            shortName: 'Z hantlami',
            videoUrl: 'https://static.fabrykasily.pl/atlas-kobiet/video-zakroki-z-hantlami.mp4',
            guideUrl: 'https://www.fabrykasily.pl/atlas-cwiczen/cwiczenia-dla-kobiet/nogi/zakroki-z-hantlami',
            muscles: ['Czworogłowe ud', 'Pośladki']
          },
          {
            id: 'b-4-bez',
            name: 'Zakroki bez obciążenia',
            shortName: 'Bez obciążenia',
            videoUrl: 'https://static.fabrykasily.pl/atlas-kobiet/video-zakroki.mp4',
            guideUrl: 'https://www.fabrykasily.pl/atlas-cwiczen/cwiczenia-dla-kobiet/nogi/zakroki-z-hantlami',
            muscles: ['Czworogłowe ud', 'Pośladki']
          }
        ]
      },
      {
        id: 'b-5',
        number: 5,
        title: 'Odwodzenie nogi na maszynie',
        setsReps: '3 × 12',
        setsCount: 3,
        category: 'Nogi i Pośladki',
        variants: [
          {
            id: 'b-5-odwodzenie',
            name: 'Odwodzenie nóg na maszynie',
            shortName: 'Odwodzenie na maszynie',
            videoUrl: 'https://static.fabrykasily.pl/atlas-kobiet/video-odwodzenie-nog-na-maszynie.mp4',
            guideUrl: 'https://www.fabrykasily.pl/cwiczenia/dla-kobiet/na-nogi/odwodzenie-nog-na-maszynie',
            muscles: ['Pośladki (średni i mały)']
          }
        ]
      },
      {
        id: 'b-6',
        number: 6,
        title: 'Plank (Deska)',
        setsReps: '3 × 30s',
        setsCount: 3,
        category: 'Brzuch',
        variants: [
          {
            id: 'b-6-plank',
            name: 'Plank na przedramionach',
            shortName: 'Plank (Deska)',
            videoUrl: 'https://static.fabrykasily.pl/atlas-kobiet/video-deska.mp4',
            guideUrl: 'https://www.fabrykasily.pl/atlas-cwiczen/cwiczenia-dla-kobiet/brzuch/deska',
            muscles: ['Brzuch (głęboki core)']
          }
        ]
      },
      {
        id: 'b-7',
        number: 7,
        title: 'Wspięcia na palcach siedząc na maszynie lub stojąc z hantlami',
        setsReps: '3 × 12',
        setsCount: 3,
        category: 'Łydki',
        variants: [
          {
            id: 'b-7-siedzac',
            name: 'Wspięcia na palcach siedząc na maszynie',
            shortName: 'Siedząc (maszyna)',
            videoUrl: 'https://static.fabrykasily.pl/atlas-kobiet/video-wspiecia-na-palce-na-maszynie-siedzac.mp4',
            guideUrl: 'https://www.fabrykasily.pl/cwiczenia/dla-kobiet/na-lydki/wspiecia-na-palcach-siedzac-na-maszynie',
            muscles: ['Łydki (płaszczkowaty)']
          },
          {
            id: 'b-7-stojac',
            name: 'Wspięcia na palcach stojąc z hantlami',
            shortName: 'Stojąc (hantle)',
            videoUrl: 'https://static.fabrykasily.pl/atlas-kobiet/video-wspiecia-na-palce-z-hantla.mp4',
            guideUrl: 'https://www.fabrykasily.pl/cwiczenia/dla-kobiet/na-lydki/wspiecia-na-palcach-stojac-z-hantlami',
            muscles: ['Łydki (brzuchaty)']
          }
        ]
      },
      {
        id: 'b-8',
        number: 8,
        title: 'Trap Y-Raise',
        setsReps: '3 × 12',
        setsCount: 3,
        category: 'Plecy i Barki',
        variants: [
          {
            id: 'b-8-yraise',
            name: 'Trap Y-Raise (wznosy w kształcie Y)',
            shortName: 'Trap Y-Raise',
            videoUrl: 'https://static.fabrykasily.pl/atlas/trap_y_raise.mp4',
            guideUrl: 'https://www.fabrykasily.pl/atlas-cwiczen/plecy/trap-y-raise',
            muscles: ['Góra pleców (dolny czworoboczny)', 'Tył barków']
          }
        ]
      }
    ]
  }
];

export function getNotepadWorkoutSummary(): string {
  let output = 'PLAN TRENINGOWY FBW (A + B)\n\n';

  for (const routine of WORKOUT_ROUTINES) {
    output += '==================================\n';
    output += `> ${routine.title.toUpperCase()}\n`;
    output += '==================================\n\n';

    for (const ex of routine.exercises) {
      output += `${ex.number}. ${ex.title} (${ex.setsReps})\n`;
      const allMuscles = Array.from(new Set(ex.variants.flatMap((v) => v.muscles))).join(', ');
      output += `   * Mięśnie: ${allMuscles}\n`;
      if (ex.variants.length > 1) {
        output += `   * Warianty: ${ex.variants.map((v) => v.name).join(' / ')}\n`;
      }
      output += '\n';
    }
  }

  output += '----------------------------------\n';
  output += 'Wygenerowano z aplikacji Plan FBW\n';
  return output.trim();
}
