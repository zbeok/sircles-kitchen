import JuneBug from "/sophie/junebug/junebug.js";

var popups = {
  about: `sophies junebug (adapted from the <a href="https://adhdanalogbrain.blogspot.com/p/introduction-to-analog-brain-sometimes.html?m=1#0-1">analog brain tool</a>) is designed to ask you questions and lead you to a helpful answer (especially to sophie). <br /><br />
follow the prompts until you get to where you want to be.<br/><br/>
  `,
  report: `if your issue didn't pop up or the solution isn't good, let sophie know! <br /><br />
discord@zbeok <br/><br/>
  `,
};

var script = {
  0.1: {
    q: "What do you want to do?",
    a: {
      "idk, help!": "0.2",
      "Get out of bed": "get out of bed",
      "I was about to go play 3 hours of tetris and need intervention": "0.4",
      "I was about to Vent Online and need intervention": "1.13",
      "I need to make a difficult decision": "0.3",
      "I am procrastinating and want to stop": "1.12",
      "I’m having emotions and need to deal with them": "1.1",
      "I am in pain": "5.1",
      "I want to sleep": "6.2",
      "I just had a nightmare": "6.4",
    },
  },
  0.2: {
    q: "Take general stock of how you are feeling. How are you?",
    a: {
      "emotionally hole": "1.1",
      Tired: "6.1",
      Hungry: "",
      Antsy: "3.1",
      Bored: "2.1",
    },
  },
  0.3: {
    q: "tfw adhd + decisionmaking. auuuuugh",
    a: {
      "have you listed the pros and cons?": "",
      "imagine the worst case scenario, the best case scenario, then the most likely scenario.":
        "",
      "have friend hold hand :pensive:": "",
    },
  },
  0.4: {
    q: "sophie's habit of stress solitaire strikes again!",
    a: {
      "Are you procrastinating something?": "1.12",
      "Or are you bored?": "2.1",
      "Or, are you anxious?": "1.2",
    },
  },
  // mental health

  1.1: {
    q: "dealing with emotions",
    a: {
      "Panic / anxiety": "1.2",
      Lonely: "1.13",
      "Depressive episode option!": "1.14",
      "Self-critical": "1.3",
      Useless: "4.1",
      Angry: "1.4",
      Bored: "2.1",
      "Dissociated/Not sure": "1.6",
    },
  },
  1.2: {
    q: "Dealing with a panic attack / anxiety",
    a: {
      "Listen to music": "",
      "Shower/bathe": "",
      "Drink a large glass of water": "",
      Eat: "",
      "turn slow tigers into fast tigers with one fucked up trick: clench all the muscles in your body for like ten seconds": "",
      "suck on an ice cube": "",
      "Physical exercise": "3.2",
      "Grounding exercises": "1.6",
      "Distract me": "2.1",
      "Clean a thing": "4.2",
    },
  },
  1.3: {
    q: "Dealing with shame / self-criticism",
    a: {
      "techniques to feel better emotionally about the self": "1.11",
      "Stop procrastinating something ": "1.12",
      "Reach out to a trusted person": "",
    },
  },
  1.4: {
    q: "Dealing with anger",
    p: `Step back from the current situation and check in with yourself and your body. Are you feeling anxious? In danger? In fight-or-flight?
    `,
    a: {
      "Drink a glass of water": "",
      "4-7-8 breathing exercise (10x)": "",
      "Physical exercise": "3.2",
      "Grounding exercises": "1.6",
    },
  },
  1.5: {
    q: "Overstimulation fixes",
    a: {
      "Noise - listen to music / earplugs / white noise / quiet room": "",
      "Texture - are you wearing something uncomfortable?": "",
      "Taste - cough drop": "",
      "Brush your hair": "",
      Shower: "",
      Eat: "",
      Cardio: "3.3",
      Yoga: "",
      "Grounding exercises": "1.6",
      "Panic / anxiety": "1.2",
      Sleep: "6.2",
    },
  },
  1.6: {
    q: "Grounding techniques",
    p: ``,
    a: {
      Generic: "1.7",
      "Physical ones": "1.10",
      "Ego ones": "1.11",
    },
  },
  1.7: {
    q: "Generic grounding techniques",
    p: ``,
    a: {
      "Describe your environment out loud in detail, using all your senses": "",
      "List all the items in a category (i.e., names of every tree)": "",
      "Describe an everyday activity in great detail": "",
      "Read something out loud": "",
      "Think of a word and spell it backwards": "",
      "Count to 10 out loud": "",
      "5-4-3-2-1 exercise": "5-4-3-2-1",
      "Airplane technique": "airplane panic exercise",
    },
  },
  "1.10": {
    q: "physical grounding techniques",
    a: {
      "Splash cool water on your hands and face": "",
      "Grab something as tightly as you can, then release. Repeat.": "",
      "Touch objects around you and notice the sensory details": "",
      "Dip your heels into the floor": "",
      "Jump up and down": "",
      "Notice your body, what each muscle is doing": "",
      Stretch: "",
      "Walk slowly, noticing each footstep": "",
      "Eat something and describe its flavors": "",
      "Focus on your breathing - breathe in a count of 4 and out a count of 8":
        "",
    },
  },
  1.11: {
    q: "ego grounding techniques",
    a: {
      "go look at your own art and start kissing the mirror": "",
      "Make a list of your favorite things": "",
      "just start listing fruits tbqh": "",
      "Think of a time when you did well": "",
      "List 18 things you’re grateful for": "",
      "Say kind statements": "",
      "Think of your favorite things, foods, people, animals": "",
      "Picture people you care about": "",
      "Remember the words to an inspiring song, quote, or poem": "",
      "Remember a safe place": "",
      "Say a coping statement": "",
      "Plan out a safe treat for yourself": "",
      "Think of things you are looking forward to in the next week": "",
    },
  },
  1.12: {
    q: "I am procrastinating and want to stop",
    a: {
      "Split the task into smaller tasks until each task seems less overwhelming":
        "",
      "Find a way to start (even by making small progress)": "",
      "Make it more interesting": "",
      "Stop and try to figure out if there is a mental block (eg you don't understand the task or you have a bad association with it or you're stuck on something specific)":
        "",
    },
  },
  1.13: {
    q: "lonely all by yourself, handsome? ;)",
    a: {
      "gooooo literally find someone random to text. copy paste this: 'hey whats up long time no talk lol'":
        "",
      "meditate on the loneliness. go open up that meditation app": "",
      "ego soothe": "1.11",
    },
  },
  1.14: {
    q: "Depressive episode?",
    a: {
      "SOPHIE. SOPHIE SOPHIE SOPHIE do NOT eat shit just because you're sad":
        "",
      "ground thyself!": "1.6",
      "exercise unfortunately": "3.1",
      "ego soothe": "1.11",
    },
  },
  // Recreational Activities

  2.1: {
    q: "I’m bored and I want to do something",
    a: {
      "Get my body moving": "3.1",
      Sleep: "6.2",
      "Do something useful": "4.1",
      "Have an adventure / go outside": "2.2",
      "Read something": "",
      "Watch something": "",
      "Be creative - draw, paint, write, build!": "",
      "Learn something - wikipedia, language learning, watch a documentary": "",
      "Play a game - cards, board games, video games, phone games": "",
    },
  },
  2.2: {
    q: "Have an adventure",
    a: {
      Hiking: "",
      Birdwatching: "",
      Biking: "",
      "State park / nature area": "",
      Museum: "",
      "Botanical garden": "",
      Orchard: "",
      "Science museum": "",
      Bookstore: "",
      "Craft store": "",
      "New restaurant": "",
      Zoo: "",
      Aquarium: "",
    },
  },

  // physical activity
  3.1: {
    q: "What kind of exercise do you want to do?",
    a: {
      "Weight exercises": "3.2",
      "yoga on youtube-- go google that shit rn": "",
      Cardio: "3.3",
    },
  },
  3.2: {
    // TODO write an actual routine.
    q: "Body weight exercises",
    a: {
      "Wall push-up": "",
      "Chair Tricep dips": "",
      Squats: "",
      Lunges: "",
      "Calf raises": "",
      "Sit ups": "",
    },
  },
  3.3: {
    // TODO write an actual routine.
    q: "Cardio exercises",
    a: {
      "Brisk walk": "",
      Run: "",
      Elliptical: "",
      Treadmill: "",
      Bike: "",
      "Jumping jacks": "",
      Burpees: "",
      "Jump rope": "",
      Dance: "",
    },
  },
  // self-care
  4.1: {
    q: "Useful things to do",
    p: "if you are SOPHIE visit your JUNEBUG. past SOPHIE is making you.",
    a: {
      "Clean something": "4.2",
      "Do work-- what work do you have?": "",
      "Check on your bank account / finances": "",
      "Cook a meal": "",
      "Call a friend or relative to check on them": "",
      "Sort the mail": "",
    },
  },
  4.2: {
    q: "Cleaning! Cleaning cleaning!",
    p: `Pick a room and start with the below:
    Organize a cupboard, shelf, closet, or other discrete space
    Vacuum all visible rugs or carpets
    Sweep or vacuum the floors
    Pick up clutter and put it away    
    Take out the garbage / recycling
    Walk around with a trash bag and throw out all rubbish`,
    a: {
      Kitchen: "4.3",
      Bathroom: "4.4",
      Bedroom: "4.5",
    },
  },
  4.3: {
    q: "Cleaning the Kitchen",
    a: {
      "Put away the clean dishes": "",
      "Wash the dirty dishes": "",
      "Wipe down the kitchen counters, stovetop": "",
      "Sweep the kitchen floor": "",
      "Wipe down the fridge shelves": "",
      "Throw out old food": "",
      "Empty the trash": "",
      "Organize fridge and pantry": "",
    },
  },
  4.4: {
    q: "Cleaning the Bathroom",
    a: {
      "Detoxify the toilet with toilet brush + toilet cleaner": "",
      "Empty the trash": "",
      "Wash the bathroom mirror, counters, floor": "",
      "Take down the shower curtain and run it through the wash": "",
      "Scrub the mildew off the tub/shower stall": "",
      "Put dirty laundry / towels in hamper": "",
      "Organize counter / cabinet": "",
      "Sweep/vacuum the floor": "",
    },
  },
  4.5: {
    q: "Cleaning the Bedroom",
    a: {
      "Change the sheets on the bed": "",
      "Put the dirty sheets in the wash": "",
      "Put the dirty laundry in the hamper": "",
      "Empty the trash": "",
      "Fold clean laundry": "",
      "Put clean laundry away": "",
      "Sweep / vacuum the floor": "",
      "Wipe clean the tops of furniture": "",
      "Organize nightstand / dresser": "",
    },
  },
  // physical health
  5.1: {
    q: "What kind of pain are you having?",
    a: {
      Menstrual: "5.2",
      Joint: "5.3",
      "Sore from exercise": "5.4",
      Head: "5.5",
      Stomach: "5.6",
    },
  },
  5.2: {
    q: "How to deal with menstrual pain",
    a: {
      "Apply a heating pad": "",
      "pain reliever": "",
      "Drink water": "",
      "Take a hot bath": "",
      "Eat chocolate / something salty": "",
      Exercise: "3.1",
      Distraction: "2.1",
    },
  },
  5.3: {
    q: "How to deal with joint/injury pain",
    a: {
      "Apply ice or heat (20 minutes on, 20 minutes off, repeat)": "",
      Massage: "",
      "Foam roller": "",
      "Warm bath": "",
      "salonpas/lidocaine": "",
      Yoga: "",
    },
  },
  5.4: {
    q: "How to deal with delayed-onset muscle soreness",
    a: {
      "Take an NSAID pain reliever (with water, no alcohol!!)": "",
      "Drink water": "",
      "Take a hot bath": "",
      Stretch: "",
      Yoga: "",
      "Light cardio": "3.3",
    },
  },
  5.5: {
    q: "google how to fix headaches. what kind do you have?",
    a: {
      "Sinuses (when I press on my face it hurts worse)": "",
      "Tension (neck hurt, or rubber band feeling)": "",
      "Migraine (light/sound/smell sensitivity, nausea, brain fog, emotions haywire)":
        "",
      "General- pain relievers, water, sleep, exercise, reduce stimuli": "",
    },
  },
  5.6: {
    q: "Stomach pain or nausea",
    a: {
      "Drink a glass of water": "",
      "Toast/crackers/banana eaten in small bites": "",
      "Ginger ale or ginger tea": "",
      "If nauseous, lay on your left side (if comfortable). This puts your stomach below your esophagus.":
        "",
    },
  },
  // sleep
  6.1: {
    q: "When you’ve had bad sleep",
    a: {
      "Drink water": "",
      "Warm bath": "",
      "4-7-8 breathing (3-5 minutes)": "",
      Nap: "6.2",
      "Prevent overstimulation": "1.5",
      "Prevent headaches": "5.5",
      "Grounding exercises": "1.6",
      "Fixing sleep in general": "6.3",
    },
  },
  6.2: {
    q: "Dealing with insomnia",
    p: "Remember that even if you can’t sleep, just laying down with your eyes closed will give your mind and body some rest",
    a: {
      "SOPHIE specific: work on your writing wips! either you'll feel useful or you'll get sleepy ^^":
        "",
      "SOPHIE specific: watch a masaru video! suggest the pearlfish one.": "",
      "Turn off any bright lights": "",
      "Use dark mode and blue light filter on your devices": "",
      "Don’t watch exciting or mentally intense videos before bed": "",
      "Have a bedtime snack": "",
      "Take melatonin or benadryl before bedtime": "",
      "Take a hot shower. Your body will get more sleepy as it cools down.": "",
      "Listen to chill music, audio books or podcasts.": "",
      "If nighttime noises bother you, try earplugs.": "",
      "Make sure your morning alarm is on the loudest setting.": "",
      "Body scan (meditation technique) or other meditation": "",
    },
  },
  6.3: {
    q: "Tips to improve sleep hygiene",
    a: {
      "Talk to a sleep doctor": "",
      "Set an alarm to start your nighttime routine at the same time every night (so the only task you have left is to close your eyes).":
        "",
      "Try to get enough physical activity during the day.": "",
      "Don't drink caffeine too late.": "",
      "Don't take your ADHD meds/stimulants too late.": "",
      "Install a blue light filter for your phone / computer": "",
    },
  },
  6.4: {
    q: "dealing with a nightmare aftermath",
    a: {
      "write down the nightmare": "",
      "panic/anxiety help": "1.2",
      exercise: "3.1",
      "do something useful": "4.1",
    },
  },
  error: {
    q: "An error occured!",
    p: `if this tool has a bug, contact phi.`,
    a: {
      "back to the top": "0.1",
    },
  },
  "#": {
    q: "template",
    p: ``,
    a: {
      template: "#",
    },
  },
};

var sequences = {
  "5-4-3-2-1": [
    "List 5 things you can see",
    "List 4 things you can touch or feel",
    "List 3 things you can hear",
    "List 2 things you can smell",
    "List 1 thing you can taste",
  ],
  "airplane panic exercise": [
    "Imagine an airplane. What color is the outside?",
    "The inside?",
    "And the seats? Are they fluffy or normal? And what color?",
    "Now 3 dishes to serve. An appetizer, a main dish, and a dessert",
    "Who do you want to take on the plane with you?",
    "Are there any decorations on the plane?",
    "What would the flight attendants look like?",
    "Where is the plane going?",
  ],
  "get out of bed": [
    "first step is to close your eyes and breathe 5 deep breaths",
    "next is to visualize what you are going to do after you get out of bed",
    "put down your phone.",
    "blanky up.",
    "one foot onto the cold hard ground",
    "then the next",
    "now get up.",
  ],
};
// var tmp = {};
// for (var c in script) {
//   tmp[c] = {}
//   for (var path in script[c]["a"]) {
//     var key = script[c]["a"][path];
//     if (!key) {
//       tmp[c][path] = "";
//     } else tmp[c][key] = path;
//   }
// }

window.onload = function () {
  var junebug = new JuneBug(script,popups,sequences);
};
